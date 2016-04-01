import {readDocument, readDocuments , writeDocument} from './database.js';

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
		for (var i = 0, courses=[]; i < student.enrolledCourses.length; i++) {
			courses.push(readDocument('courses', student.enrolledCourses[i]));
		}
	}
  emulateServerReturn(courses, cb);
}

export function enrollInClass(studentId, courseId, cb) {
    var student = readDocument('students', studentId);
    var course = readDocument('courses', courseId);

    student.enrolledCourses.push(courseId);
    course.enrolled.push(studentId);

    writeDocument('students', student);
    writeDocument('courses', course);

    emulateServerReturn(undefined, cb);

}

export function dropClass(studentId, classId, cb) {

}

// MY CHANGES HERE
// gets the students shopping cart
export function getShoppingCart(user, cb) {
  var student = readDocument('students', user);
  if (student !== null) {
    for (var i = 0, cart=[]; i < student.cart.length; i++) {
      cart.push(readDocument('courses', student.cart[i]));
    }
  }
  emulateServerReturn(cart, cb);
}

export function getCourseInfo(courseId, cb) {
    var course = readDocument('courses', courseId);
    course.instructor = readDocument('professors', course.instructor);

    emulateServerReturn(course, cb);
}

export function getSearchResults(searchOptions, cb) {
    var results = [ '12345678', '92819522', '19103958', '18271821', '85938173', '09876543', '08874563'];
    var courses = results.map((course) => readDocument('courses', course));
    for(var i = 0; i < results.length; i++) {
        courses[i].instructor = readDocument('professor', courses[i].instructor);
    }

    emulateServerReturn(courses, cb);
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
