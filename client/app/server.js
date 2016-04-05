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

/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);

  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    //var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  /*xhr.addEventListener('error', function() {
    FacebookError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    FacebookError('Could not ' + verb + " " + resource + ": Request timed out.");
  }); */

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function getStudentInfo(id, cb) {
  sendXHR('GET', '/students/'+id, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText))
  });
}

export function getEnrolledCourses(id, cb) {
  sendXHR('GET', 'students/'+id+'/enrolled', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText))
  });
}

export function enrollInClass(studentId, courseId, cb) {
    var student = readDocument('students', studentId);
    var course = readDocument('courses', courseId);

    student.enrolledCourses.push(courseId);
    course.enrolled.push(studentId);

    writeDocument('students', student);
    writeDocument('courses', course);

    var retVal = {
        "student": student,
        "course": course
    };
    emulateServerReturn(retVal, cb);

}

export function dropClass(studentId, courseId, cb) {
    var student = readDocument('students', studentId);
    var course = readDocument('courses', courseId);

    var studentIndex = student.enrolledCourses.indexOf(courseId);
    var courseIndex = course.enrolled.indexOf(studentId);

    if (studentIndex !== -1 && courseIndex !== -1) {
        student.enrolledCourses.splice(courseIndex, 1);
        courseIndex.enrolled.splice(studentIndex, 1);
    }

    writeDocument('students', student);
    writeDocument('courses', course);

    var retVal = {
        "student": student,
        "course": course
    };

    emulateServerReturn(retVal, cb);

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
export function getAvailableCourses(day, start, end, cb) {
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
