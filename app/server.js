import {readDocument, writeDocument, addDocument} from './database.js';

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

export function getCourses(user, cb) {
  var student = readDocument('students', user);

	if (student !== null) {
		for (var i = 0, courses=[]; i < student.courses.length; i++) {
			courses.push(readDocument('courses', student.courses[i]));
		}
	}

  emulateServerReturn(courses, cb);
}
