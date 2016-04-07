import React from 'react';

// Modify with your startup's name!
var startupName = "InSPIRE, Inc.";

// Put your mock objects here, as in Workshop 4
var initialData = {
    "students": {
        "12345678": {
            "_id": "12345678",
            "firstName": "Jason",
            "lastName": "Jackson",
            "gradYear": 2017,
            "major": "Sociology",
            "birthDate": new Date(1992, 2, 14),
            "gender": "M",
            "advisor": 1,
            "email": "jjackson@umass.edu",
            "academicInstitution": "U. of Massachusetts Amherst",
            "enrolledCourses": [
              "12345678", "92819522", "19103958"
            ],
            "cart": [
              "18271821", "85938173", "09876543"
            ],
            "completedCourses": [["92819522", "A+"], ["12345678", "B-"]]
        },
        "27133668": {
            "_id": "27133668",
            "firstName": "Christine",
            "lastName": "Thielen",
            "gradYear": 2018,
            "major": "Computer Science",
            "birthDate": new Date(1994, 11, 14),
            "gender": "F",
            "advisor": 2,
            "email": "cthielen@umass.edu",
            "academicInstitution": "Amherst College",
            "enrolledCourses": [
              "18271821", "85938173", "09876543"
            ],
            "cart": [
              "12345678", "92819522", "19103958"
            ],
            "completedCourses": []
        },
        "07894436": {
            "_id": "07894436",
            "firstName": "James",
            "lastName": "Ensor",
            "gradYear": 2016,
            "major": "Chemistry",
            "birthDate": new Date(1993, 4, 25),
            "gender": "M",
            "advisor": 3,
            "email": "jensor@umass.edu",
            "academicInstitution": "Hampshire College",
            "enrolledCourses": [
              "12345678", "19103958", "85938173"
            ],
            "cart": [
              "92819522", "18271821", "09876543"
            ],
            "completedCourses": []
        }
    },
    // "Document" storing professors
    "professor": {
        "12345678": {
            "_id": "12345678",
            "firstName": "Verty",
            "lastName": "Verts",
            "office": "LGRT 300",
            "teaches": ["12345678", "18271821"]
        },
        "83719683": {
            "_id": "83719683",
            "firstName": "Jason",
            "lastName": "Derulo",
            "office": "LGRT 100",
            "teaches": ["92819522", "19103958"]
        },
        "23810589": {
            "_id": "23810589",
            "firstName": "Tim",
            "lastName": "Richards",
            "office": "CS 240",
            "teaches": ["85938173", "09876543"]
        }
    },
    // "Document" storing courses
    "courses": {
        "12345678": {
            "_id": "12345678",
            "courseNumber": "COMPSCI 220",
            "courseName": "Programming Methodology",
            "section": 1,
            "description": "Development of individual skills necessary for designing, implementing, testing and modifying larger programs, including: use of integrated design environments, design strategies and patterns, testing, working with large code bases and libraries, code refactoring, and use of debuggers and tools for version control. There will be significant programming and a mid-term and final examination.",
            "location": "Morrill Sci Ctr (1)  Room N375",
            "credits": 4,
            "capacity": 120,
            "enrolled": [],
            "instructor": "12345678",
            "final": [new Date(2017, 0, 22,8,0,0,0),new Date(2017,0,22,10,0,0,0), "School of Management rm 136"],
            "category": "art",
            "start": new Date(0,0,0,8,0),
            "end": new Date(0,0,0,8,55),
            "days": ["Monday","Wednesday","Friday"]
        },
        "92819522": {
            "_id": "92819522",
            "courseNumber": "COMPSCI 230",
            "courseName": "Computer Systems Principles",
            "section": 1,
            "description": "Large-scale software systems like Google - deployed over a world-wide network of hundreds of thousands of computers - have become a part of our lives. These are systems success stories - they are reliable, available (\"up\" nearly all the time), handle an unbelievable amount of load from users around the world, yet provide virtually instantaneous results. On the other hand, many computer systems don't perform nearly as well as Google - hence the now-cliché \"the system is down.\" In this class, we study the scientific principles behind the construction of high-performance, scalable systems. The course begins with a discussion of C language, and moves up the stack from there to the features of modern architectures, assembly languages, and operating system services such as I/O and synchronization.",
            "location": "School of Management rm 137",
            "credits": 4,
            "capacity": 90,
            "enrolled": [],
            "instructor": "83719683",
            "final": [new Date(2017, 1, 22,8,30,0,0),new Date(2017,1,22,10,30,0,0), "School of Management rm 136"],
            "category": "literature",
            "start": new Date(0,0,0,8,30),
            "end": new Date(0,0,0,9,45),
            "days": ["Tuesday", "Thursday"]
        },
        "19103958": {
            "_id": "19103958",
            "courseNumber": "COMPSCI 240",
            "courseName": "Reasoning About Uncertainty",
            "section": 2,
            "description": "Development of mathematical reasoning skills for problems that involve uncertainty. Each concept will be illustrated by real-world examples and demonstrated though in-class and homework exercises, some of which will involve Java programming. Counting and probability -- basic counting problems, probability definitions, mean, variance, binomial distribution, Markov and Chebyshev bounds. Probabilistic reasoning -- conditional probability and odds, Bayes' Law, Naive Bayes classifiers, Monte Carlo simulation. Markov chains, Markov decision processes, classical game theory, introduction to information theory.",
            "location": "Thompson Hall room 106",
            "credits": 3,
            "capacity": 120,
            "enrolled": [],
            "instructor": "83719683",
            "final": [new Date(2017, 2, 22,11,15,0,0),new Date(2017,2,22,13,15,0,0),"Thompson Hall room 105"],
            "category": "cs",
            "start" : new Date(0,0,0,11,15),
            "end" : new Date(0,0,0,12,5),
            "days": ["Monday","Wednesday","Friday"]
        },
        "18271821": {
            "_id": "18271821",
            "courseNumber": "COMPSCI 250",
            "courseName": "Introduction to Computation",
            "section": 2,
            "description": "Lecture, discussion. Basic concepts of discrete mathematics useful to computer science: set theory, strings and formal languages, propositional and predicate calculus, relations and functions, basic number theory. Induction and recursion: interplay of inductive definition, inductive proof, and recursive algorithms. Graphs, trees, and search. Finite-state machines, regular languages, nondeterministic finite automata, Kleene's Theorem. Problem sets, 2-3 midterm exams, timed final.",
            "location": "Thompson Hall room 106",
            "credits": 4,
            "capacity": 90,
            "enrolled": [],
            "instructor": "12345678",
            "final": [new Date(2017,3,22,14,30,0,0),new Date(2017,3,22,16,30,0,0), "Thompson Hall room 106"],
            "category": "history",
            "start" : new Date(0,0,0,14,30),
            "end" : new Date(0,0,0,15,45),
            "days": ["Monday","Wednesday","Friday"]
        },
        "85938173": {
            "_id": "85938173",
            "courseNumber": "COMPSCI 320",
            "courseName": "Software Engineering",
            "section": 3,
            "description": "In this course, students learn and gain practical experience with software engineering principles and techniques. The practical experience centers on a semester-long team project in which a software development project is carried through all the stages of the software life cycle. Topics in this course include requirements analysis, specification, design, abstraction, programming style, testing, maintenance, communication, teamwork, and software project management. Particular emphasis is placed on communication and negotiation skills and on designing and developing maintainable software. Use of computer required. Several written assignments, in-class presentations, exams, and a term project. This course satisfies the IE Requirement.",
            "location": "Lederle Grad Res Ctr rm A301",
            "credits": 3,
            "capacity": 100,
            "enrolled": [],
            "instructor": "23810589",
            "final": [new Date(2017, 4, 22, 15, 0, 0), new Date(2017, 4, 22 ,17, 0, 0), "Lederle Grad Res Ctr rm A301"],
            "category": "music",
            "start" : new Date(0,0,0,15,0),
            "end" : new Date(0,0,0,18,0),
            "days": ["Tuesday", "Thursday"]
        },
        "09876543": {
            "_id": "09876543",
            "courseNumber": "COMPSCI 326",
            "courseName": "Web Programming",
            "section": 3,
            "description": "The World Wide Web was proposed originally as a collection of static documents inter-connected by hyperlinks. Today, the web has grown into a rich platform, built on a variety of protocols, standards, and programming languages, that aims to replace many of the services traditionally provided by a desktop operating system. Topics will include: producing dynamic content using a server-based language, content serving databases and XML documents, session state management, multi-tier web-based architectures, web security, and core technologies including HTTP, HTML5, CSS, JavaScript, and SQL will be emphasized. This course will also study concepts and technologies including AJAX, social networking, mashups, JavaScript libraries (e.g., jQuery), and web security. This course is hands-on and project-based; students will construct a substantial dynamic web application based on the concepts, technologies, and techniques presented during lecture. This course satisfies the IE Requirement.",
            "location": "Hasbrouck Lab Add room 126",
            "credits": 3,
            "capacity": 90,
            "enrolled": [],
            "instructor": "23810589",
            "final": [new Date(2017, 5, 22,17,30,0,0),new Date(2017,5,22,19,30,0, 0),"Hasbrouck Lab Add room 126"],
            "category": "gym",
            "start" : new Date(0,0,0,17,30),
            "end" : new Date(0,0,0,18,45),
            "days": ["Tuesday", "Thursday"]
        },
        "08874563": {
          "_id": "08874563",
          "courseNumber": "COMPSCI 373",
          "courseName": "Intro to Computer Graphics",
          "description": "This course introduces the fundamental concepts of 2D and 3D computer graphics. It covers the basic methods for modeling, rendering, and imaging. Topics include: image processing, digital photography, 2D/3D modeling, 3D graphics pipeline, OpenGL, shading, texture mapping, ray tracing, 3D printing. Throughout the class, we will teach students to learn modern graphics techniques, to model the visual world algorithmically, and to implement algorithms using Java. Students who have taken COMPSCI 473 are not eligible to take this course. Prerequisites: COMPSCI 187 (or ECE 242) and COMPSCI 190DM (or MATH 235 or COMPSCI 240 or equivalent courses from other departments).",
          "location": "Computer Science Bldg rm 142",
          "credits": 3,
          "capacity": 110,
          "enrolled": [],
          "instructor": "23810589",
          "final": [new Date(2017, 5, 22,11,15,0,0),new Date(2017,5,22,13,15,0,0),"Computer Science Bldg rm 141"],
          "category": "gym",
          "start" : new Date(0,0,0,11,15),
          "end" : new Date(0,0,0,12,5),
          "days": ["Monday", "Wednesday", "Thursday"]
        }
    }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
	var retVal = (data[collection][id] !== undefined) ? JSONClone(data[collection][id]) : null;
  return retVal;
}

export function readDocuments(collection) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}


 /* Reset database button.
 */
 export class ResetDatabase extends React.Component {
   render() {
     return (
       <button className="btn btn-default" type="button" onClick={() => {
         var xhr = new XMLHttpRequest();
         xhr.open('POST', '/resetdb');
         xhr.addEventListener('load', function() {
           window.alert("Database reset! Refreshing the page now...");
           document.location.reload(false);
         });
         xhr.send();
       }}>Reset Mock DB</button>
     );
   }
 }
