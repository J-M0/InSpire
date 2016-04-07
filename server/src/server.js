// Implement your server in this file.
// We should be able to run your server with node src/server.js
var express = require('express');
var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var SearchOptionsSchema = require('./schemas/searchOptions.json');

var app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static('../client/build'));

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  database.resetDatabase();
  res.send();
});

// Search for classes
app.post('/search', validate({ body: SearchOptionsSchema }), function(req, res) {
  var body = req.body;

  var courses = database.getCollection('courses');
  var results = Object.keys(courses).map((key) => {
    return courses[key];
  });

  var classNum = parseInt(body.classNum);

  if(classNum === classNum) {
    results = results.filter(matchesClassNum(classNum, body.classNumOps));
  }

  if(body.seatsAvail) {
    results = results.filter((course) => {
      return course.enrolled.length < course.capacity;
    });
  }

  if(body.keyword.length > 0) {
    var keyword = body.keyword.trim();
    if(keyword.length !== 0) {
      var re = new RegExp(keyword, 'i');
      results = results.filter((course) => {
        return (re.test(course.courseName) || re.test(course.description));
      });
    }
  }

  var isSpace = /\s/;
  if(!isSpace.test(body.genEdCat)) {
    results = results.filter(matchString(body.genEdCat, 'genEdCategory'));
  }

  if(!isSpace.test(body.session)) {
    results = results.filter(matchString(body.session, 'session'));
  }

  if(!isSpace.test(body.subject)) {
    results = results.filter(matchString(body.subject, 'subject'));
  }

  if(!isSpace.test(body.instructionMode)) {
    results = results.filter(matchString(body.instructionMode, 'instructionMode'));
  }

  results.sort((a, b) => {
    if(a.courseNumber > b.courseNumber) {
      return 1;
    } else if (a.courseNumber < b.courseNumber) {
      return -1;
    } else {
      return 0;
    }
  });
  res.send(results);
});

function matchesClassNum(classNum, op) {
  if(op === '=') {
    return function(course) {
      var num = parseInt(course.courseNumber.split(' ')[1]);
      return classNum === num;
    }
  } else if(op === '>=') {
    return function(course) {
      var num = parseInt(course.courseNumber.split(' ')[1]);
      return classNum <= num;
    }
  } else {
    throw Error('Unknown operation: ' + op);
  }
}

function matchString(string, field) {
  return function(course) {
    return string === course[field];
  }
}

app.post('/addclass', function(req, res) {

});

app.post('/dropclass', function(req, res) {

});

app.get('/courses/:courseid', function(req, res) {
  var course = readDocument('courses', req.params.courseid);
  course.instructor = readDocument('professor', course.instructor);

  res.send(course);
});

// add me to error handling
// This should not happen anymore
app.get('/students/undefined/enrolled', function(req, res) {

});

// GET request for student's enrolled courses
app.get('/students/:studentid/enrolled', function(req, res) {
  var id = req.params.studentid;
  // authentication will go here
  var student = readDocument('students', id);
  for (var i = 0, courses=[]; i < student.enrolledCourses.length; i++) {
    courses.push(readDocument('courses', student.enrolledCourses[i]));
  }
  res.send(courses);
});

// GET request for student information
app.get('/students/:studentid', function(req, res){
  var id = req.params.studentid;
  // authentication will go here
  var student = readDocument('students', id);
  res.send(student);
});

//GET request for professor Information
app.get('/professor/:professorid', function(req, res) {
  var id = req.params.professorid;
  var professor = readDocument('professor', id);
  res.send(professor);
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
    if (typeof id === 'number') {
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

// GET request for student's enrolled courses as objects
app.get('/students/:studentid/enrolledCourses', function(req, res) {
  var id = req.params.studentid;
  // authentication will go here
  var student = readDocument('students', id);

  var courses = [];

  for (var i in student.enrolledCourses){
    var course = readDocument('courses', student.enrolledCourses[i]);

    if (courses.length == 0) courses.push(course);
    else {
      for (var j in courses){
        if (course.final[0] < courses[j].final[0]){
          courses.splice(j, 0, course);
          break;
        } else if (j == courses.length-1) courses.push(course);
      }
    }
  }
  res.send(courses);
});

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
