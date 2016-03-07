import {readDocument, readDocuments, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function getStudentInfo(id, cb) {
  var student = readDocument('students', id);
  emulateServerReturn(student, cb);
}

export function getEnrolledCourses(user, cb) {
  var student = readDocument('students', user);

	if (student !== null) {
		for (var i = 0, courses=[]; i < student.courses.length; i++) {
			courses.push(readDocument('courses', student.courses[i]));
		}
	}

  emulateServerReturn(courses, cb);
}

export function queryCourses(start, end, cb) {
	var available = [];
	var courses = readDocuments('courses');
	var recastStart = new Date(start);
	var recastEnd = new Date(end);

	for (var i in courses) {
		var tmp = new Date(courses[i].start);
		if(tmp < recastStart) {
			console.log("start =" + recastStart.toLocaleTimeString());
			console.log(tmp.toLocaleTimeString());
		}
		//console.log(courses[i].start.toTimeString().substring(0, 5).replace(/^0+/, ''));
	}
	//emulateServerReturn(, cb);
}
