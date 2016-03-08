import {readDocument, readDocuments/*, writeDocument*/} from './database.js';

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

export function getCourseInfo(courseId, cb) {
    var course = readDocument('courses', courseId);
    course.instructor = readDocument('professors', course.instructor);

    emulateServerReturn(course, cb);
}

// gets available courses
export function queryCourses(day, start, end, cb) {
	var available = [];
	var courses = readDocuments('courses');

	// Recast the variables since they were lost somehow
	var blockStart = new Date(start);
  // Note to Kevin from Kevin: Do I still need this? Consider later.
	//var recastEnd = new Date(end);

	for (var i in courses) {
		//console.log(courses[i].days);
		var courseStart = new Date(courses[i].start);
		var courseEnd 	= new Date(courses[i].end);
		courses[i].days.map((d)=> {
			if(day === d) {
				if(courseStart <= blockStart && courseEnd >= blockStart) {
					available.push(courses[i]);
				}
			}
		});
	}

	emulateServerReturn(available, cb);
}
