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

app.post('/search', validate({ body: SearchOptionsSchema }), function(req, res) {
	var body = req.body;

	var userid = req.params.userid;
	var fromUser = getUserIdFromToken(req.get('Authorization'));

	// if(userid === fromUser) {
		var results = [ '12345678', '92819522', '19103958', '18271821', '85938173', '09876543', '08874563'];
		var courses = results.map((course) => readDocument('courses', course));
		for(var i = 0; i < results.length; i++) {
			courses[i].instructor = readDocument('professor', courses[i].instructor);
		}

		res.send(courses);
	// } else {
	// 	res.send(401).end();
	// }
});

app.post('/addclass', function(req, res) {

});

app.post('/dropclass', function(req, res) {

});

app.get('/courses/:courseid', function(req, res) {

});

// add me to error handling
app.get('/students/undefined/enrolled', function(req, res) {

});

// GET request for student's enrolled courses
app.get('/students/:studentid/enrolled', function(req, res) {
	var courses = [];
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
