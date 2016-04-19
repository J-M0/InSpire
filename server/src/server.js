var express = require('express');
var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');
var url = require('url');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var SearchOptionsSchema = require('./schemas/searchOptions.json');
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('mongo-express/config.default.js');
var app = express();

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var databaseUrl = 'mongodb://localhost:27017/InspireInc';

MongoClient.connect(databaseUrl, function(err, db) {
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use('/mongo_express', mongo_express(mongo_express_config));
  app.use(express.static('../client/build'));

  function sendDatabaseError(res, err) {
    res.status(500).send("A database error occurred: " + err);
  }

  // Reset database.
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    database.resetDatabase();
    res.send();
  });

  // Search for classes
  app.post('/search', validate({ body: SearchOptionsSchema }), function(req, res) {

    /*
    "seatsAvail",
    "keyword",
    "opFilter",
    "subject",
    "genEdCategory",
    "session",
    "instructionMode"
    */

    var body = req.body;
    var courses = [];
    var query = {};

    for (var k in body) {
      if (k === 'keyword' || k === 'seatsAvail') {
        continue;
      } else if (k === 'opFilter') {
        query['courseNumber']=body[k]['courseNumber'];
      } else if (body[k].length !== 0) {
        console.log("body[" + k + "] = " + body[k].length);
        query[k] = body[k];
      }
    }

    console.log(query);

    var cursor = db.collection('courses').find(query);
    cursor.forEach( function (doc) {
      courses.push(doc);
    }, function () {
      res.send(courses.sort(function(a, b) {
        return a.courseNumber > b.courseNumber;
      }));
    });

  });

  app.post('/addclass', function(req, res) {
    var urlObj = url.parse(req.url, true);

    if(urlObj.query.student === undefined || urlObj.query.course === undefined) {
      res.send(400).end();
    }

    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var studentId = urlObj.query.student;
    var courseId = urlObj.query.course;

    if(fromUser === parseInt(studentId)) {
      var student = readDocument('students', studentId);
      var course = readDocument('courses', courseId);

      var studentIndex = student.enrolledCourses.indexOf(courseId);
      var courseIndex = course.enrolled.indexOf(studentId);

      if(studentIndex === -1 && courseIndex === -1) {
        student.enrolledCourses.push(courseId);
        course.enrolled.push(studentId);
      } else {
        // Something is wrong.
        // The studnets and courses documents are out of sync.
        res.status(500).end();
      }

      writeDocument('students', student);
      writeDocument('courses', course);

      res.send();
    } else {
      res.status(401).end();
    }
  });

  app.post('/dropclass', function(req, res) {
    var urlObj = url.parse(req.url, true);

    if(urlObj.query.student === undefined || urlObj.query.course === undefined) {
      res.send(400).end();
    }

    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var studentId = urlObj.query.student;
    var courseId = urlObj.query.course;

    if(fromUser === parseInt(studentId)) {
      var student = readDocument('students', studentId);
      var course = readDocument('courses', courseId);

      var courseIndex = student.enrolledCourses.indexOf(courseId);
      var studentIndex = course.enrolled.indexOf(studentId);

      if(studentIndex !== -1 && courseIndex !== -1) {
        student.enrolledCourses.splice(courseIndex, 1);
        course.enrolled.splice(studentIndex, 1);
      } else {
        // Something is wrong.
        // The studnets and courses documents are out of sync.
        res.send(500);
      }

      writeDocument('students', student);
      writeDocument('courses', course);

      res.send();
    } else {
      res.send(401).end();
    }
  });

  // MADE CHANGES HERE
  // POST request for removing a class from the shopping cart
  app.post('/dropfromcart', function(req, res) {

    var student = readDocument('students', req.body.userId);
    var course = req.body.courseId;

    var fromUser = getUserIdFromToken(req.get('Authorization'));

    if (fromUser == req.body.userId) {
      var courseIndex = student.cart.indexOf(course);
      if (courseIndex !== -1 && student.cart.length !== 0) {
        student.cart.splice(courseIndex, 1);
      } else {
        res.status(500).end();
      }

      writeDocument('students', student);

      for (var i = 0, cart=[]; i < student.cart.length; i++) {
        cart.push(readDocument('courses', student.cart[i]));
      }

      res.send(cart);

    } else {
      res.status(401).end();
    }
  });

  // GET request for course information
  app.get('/courses/:courseid', function(req, res) {
    var course = readDocument('courses', req.params.courseid);
    course.instructor = readDocument('professor', course.instructor);

    res.send(course);
  });

  // GET request for available courses
  // May become more difficult when we extend functionality
  app.get('/courses/available/:day/:start', function(req, res) {
    var available = [];
    var courses = database.getCollection('courses');

    var blockStart = new Date(req.params.start);
    for (var i in courses) {
      var courseStart = new Date(courses[i].start);
      var courseEnd   = new Date(courses[i].end);
      courses[i].days.map((d) => {
        if (req.params.day === d) {
          if (courseStart <= blockStart && courseEnd >= blockStart) {
            available.push(courses[i]);
          }
        }
      });
    }
    res.send(available);
  });

  // GET request for student's enrolled courses
  app.get('/students/:studentid/enrolled', function(req, res) {
    var id = new ObjectID(req.params.studentid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    if (id == fromUser) {
      db.collection('students').findOne({_id : id}, function (err, student) {
        if (err) {
          sendDatabaseError(res, err);
        } else {
          var courses = [];
					// A cursor is analogous to a pointer from C/C++. You need to iterate over the cursor object
					// which is a lot like a LinkedList from Java.
          var cursor = db.collection('courses').find({_id: {$in : student.enrolledCourses}});
          cursor.forEach( function(doc) { 								// From the Node.js MongoDB driver API
            courses.push(doc);														// forEach takes 2 functions as parameters
          }, function () {																// First function is applied every iteration
            res.send(courses);														// Second function is applied at the end
          });
        }
      });
    } else {
      res.status(400).end();
    }
  });

  // GET request for student shopping cart
  app.get('/students/:studentid/cart', function(req, res) {
    var id = req.params.studentid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    if (id == fromUser) {
      //var student = readDocument('students', id);

      //for (var i = 0, cart=[]; i < student.cart.length; i++) {
        //cart.push(readDocument('courses', student.cart[i]));
      //}
      //res.send(cart);
    } else {
      res.status(400).end();
    }
  });

  // GET request for student information
  app.get('/students/:studentid', function(req, res) {
    var id = req.params.studentid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    if (id == fromUser) {
      //var student = readDocument('students', id);
      //res.send(student);
    } else {
      res.status(400).end();
    }
  });

  // MADE CHANGES HERE FIX THIS EVENTUALLY
  //GET request for professor Information
  app.get('/professor/:professorid', function(req, res) {
    var id = req.params.professorid;
    //var professor = readDocument('professor', id);
    //res.send(professor);
  });

  /*
  * Get the user ID from a token. Returns -1 (and invalid ID) if it fails
  */
  function getUserIdFromToken(authorizationLine) {
    try {
      // Cut off "Bearer " from the header value.
      var token = authorizationLine.slice(7);
      // Convert the base64 string to a UTF-8 string.
      var regularString = new Buffer(token, 'base64').toString('utf8');
      // Convert the UTF-8 string into a JavaScript object.
      var tokenObj = JSON.parse(regularString);
      var id = tokenObj['id'];
      // Check that id is a number.
      if (typeof id === 'string') {
        return id;
      } else {
        // Not a number. Return -1, an invalid ID.
        return -1;
      }
    } catch (e) {
      // Return an invalid ID.
      return -1;
    }
  }

  /**
  * Translate JSON Schema Validation failures into error 400s.
  * THIS MUST ALWAYS COME BEFORE app.listen() AND AFTER OUR ROUTES!
  */
  app.use(function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
      // Set a bad request http response status
      res.status(400).end();
    } else {
      // It's some other sort of error; pass it to next error middleware handler
      next(err);
    }
  });

  app.listen(3000, function() {
    console.log('InSpire server listening on port 3000!');
  });
});
/******************************************* Nothing goes below here **************************************************/
