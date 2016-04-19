// Node express variables
var url           = require('url');
var express       = require('express');
var validate      = require('express-jsonschema').validate;
var bodyParser    = require('body-parser');
var searchSchema  = require('./schemas/searchOptions.json');

// Mock db-variables, we should be able to delete these soon
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
// Delete the above

// MongoDB variables
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var databaseUrl = 'mongodb://localhost:27017/InspireInc';

var app = express();

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
  app.post('/search', validate({ body: searchSchema }), function(req, res) {

    /*
    "keyword",
    */

    var body = req.body;
    var courses = [];
    var query = {};

    for (var k in body) {
      switch(k) {
        case 'keyword':
          break;
        case 'seatsAvail':
          if (body[k]) {
            query['$where'] = 'this.enrolled.length < this.capacity';
          }
          break;
        case 'opFilter':
          query['courseNumber']=body[k]['courseNumber'];
          break;
        default:
          if (body[k].length !== 0) {
            query[k] = body[k];
          }
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

  // POST route for enrolling a student in a class
  app.post('/addclass', function(req, res) {
    var urlObj = url.parse(req.url, true);

    if(urlObj.query.student === undefined || urlObj.query.course === undefined) {
      res.send(400).end();
    }

    var fromUser = new ObjectID(getUserIdFromToken(req.get('Authorization')));
    var studentId = new ObjectID(urlObj.query.student);
    var courseId = new ObjectID(urlObj.query.course);

    if(fromUser.equals(studentId)) {
        db.collection('students').findOne({ _id: studentId }, { enrolledCourses: 1 }, function(err, results) {
            // console.log(results);
            var query = {
                $or: results.enrolledCourses.map((id) => { return { _id: id } })
            }
            db.collection('courses').find(query).toArray(function(err, courses) {
                if(err) {
                    return sendDatabaseError(res, err);
                }

                db.collection('courses').findOne({ _id: courseId }, function(err, enrollingCourse) {
                    if(err) {
                        return sendDatabaseError(res, err);
                    }

                    var canEnroll = true;

                    for(var i in courses) {
                        if(coursesConflict(courses[i], enrollingCourse)) {
                            canEnroll = false;
                            break;
                        }
                    }

                    if(canEnroll) {
                        db.collection('courses').updateOne({ _id: courseId }, {
                            $addToSet: {
                                enrolled: studentId
                            }
                        }, function(err, result) {
                            if(err) {
                                return sendDatabaseError(res, err);
                            }

                            // console.log(result);

                            db.collection('students').updateOne({ _id: studentId }, {
                                $addToSet: {
                                    enrolledCourses: courseId
                                }
                            }, function(err) {
                                if(err) {
                                    return sendDatabaseError(res, err);
                                }

                                res.send();
                            });
                        });
                    } else {
                        res.status(400).send("Could not enroll in class. There is a time conflict.")
                    }
                });
            });
        });
    } else {
      res.status(401).end();
    }
  });

  function coursesConflict(course1, course2) {
      var days = [];

      for(var i in course1.days) {
          for(var j in course2.days) {
              if(course1.days[i] === course2.days[j]) {
                  days.push(course1.days[i]);
              }
          }
      }

      if(days.length === 0) {
          return false;
      } else {
          return (course1.start <= course2.start && course2.end <= course1.end)
      }
  }

  // POST route for dropping a student from a class
  app.post('/dropclass', function(req, res) {
    var urlObj = url.parse(req.url, true);

    if(urlObj.query.student === undefined || urlObj.query.course === undefined) {
      res.send(400).end();
    }

    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var studentId = urlObj.query.student;
    var courseId = new ObjectID(urlObj.query.course);

    if(fromUser === studentId) {
      db.collection('courses').updateOne({ _id: courseId }, { $pull: { enrolled: courseId } },
        function(err) {
          if(err) {
            return sendDatabaseError(res, err);
          }

          db.collection('students').updateOne({ _id: new ObjectID(studentId) }, { $pull: { enrolledCourses: courseId } },
            function(err) {
              if(err) {
                return sendDatabaseError(res, err);
              }

              res.send();

            }
          );
        }
      );
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
          cursor.forEach( function(doc) {                 // From the Node.js MongoDB driver API
            courses.push(doc);                            // forEach takes 2 functions as parameters
          }, function () {                                // First function is applied every iteration
            res.send(courses);                            // Second function is applied at the end
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
    var id = new ObjectID(req.params.studentid);
    var fromUser = getUserIdFromToken(req.get('Authorization'));

    if (id == fromUser) {
      db.collection('students').findOne({_id : id}, function (err, student) {
        if (err) {
          sendDatabaseError(res, err);
        }
        else {
          res.send(student);
        }
      });
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
