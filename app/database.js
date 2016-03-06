//import React from 'react';
//import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "InSPIRE, Inc.";

// Put your mock objects here, as in Workshop 4
var initialData = {
    // "Document" for students -- James Morris
    "students": {
        "12345678": {
            "studentId": "12345678",
            "firstName": "Jason",
            "lastName": "Jackson",
            "gradYear": 2017,
            "major": "Gender Studies",
            "birthDate": "1992-03-14",
            "gender": "M",
            "mailStreetAddress": "58 Eastman Lane",
            "mailCity": "Amherst",
            "mailState": "MA",
            "mailZip": "01003",
            "permStreetAddress": "2642 Marigold Lane",
            "permCity": "Doral",
            "permState": "FL",
            "permZip": "33178",
            "phoneNumber": "305-463-5054",
            "advisor": 1,
            "email": "jjackson@umass.edu",
            "emergencyContact": {
                "firstName": "Carol",
                "lastName": "Huston",
                "phoneNumber": "205-436-0467",
                "streetAddress": "1157 Broad Street",
                "city": "Bessemer",
                "state": "AL",
                "zip": "35224"
            },
            "courses": [
              "12345678", "92819522", "19103958"
            ],
            "cart": [
              "18271821", "85938173", "09876543"
            ]
        },
        "27133668": {
            "studentId": "27133668",
            "firstName": "Christine",
            "lastName": "Thielen",
            "gradYear": 2018,
            "major": "Computer Science",
            "birthDate": "1994-12-14",
            "gender": "F",
            "mailStreetAddress": "160 Clark Hill Rd",
            "mailCity": "Amherst",
            "mailState": "MA",
            "mailZip": "01003",
            "permStreetAddress": "4987 Terry Lane",
            "permCity": "Orlando",
            "permState": "FL",
            "permZip": "32805",
            "phoneNumber": "321-230-6522",
            "advisor": 2,
            "email": "cthielen@umass.edu",
            "emergencyContact": {
                "firstName": "Thomas",
                "lastName": "Thielen",
                "phoneNumber": "207-681-0579",
                "streetAddress": "1522 Fantages Way",
                "city": "South Portland",
                "state": "ME",
                "zip": "04106"
            },
            "courses": [
              "18271821", "85938173", "09876543"
            ],
            "cart": [
              "12345678", "92819522", "19103958"
            ]
        },
        "07894436": {
            "studentId": "07894436",
            "firstName": "James",
            "lastName": "Ensor",
            "gradYear": 2016,
            "major": "Chemistry",
            "birthDate": "1993-05-25",
            "gender": "M",
            "mailStreetAddress": "230 Sunset Ave",
            "mailCity": "Amherst",
            "mailState": "MA",
            "mailZip": "01003",
            "permStreetAddress": "3109 Grove Street",
            "permCity": "Melville",
            "permState": "NY",
            "permZip": "11747",
            "phoneNumber": "631-773-2379",
            "advisor": 3,
            "email": "jensor@umass.edu",
            "emergencyContact": {
                "firstName": "Paulette",
                "lastName": "Cantara",
                "phoneNumber": "713-719-5202",
                "streetAddress": "630 Brooke Street",
                "city": "Sugar Land",
                "state": "TX",
                "zip": "77478"
            },
            "courses": [
              "12345678", "19103958", "85938173"
            ],
            "cart": [
              "92819522", "18271821", "09876543"
            ]
        }
    },
    // "Document" storing professors
    "professors": {
        "12345678": {
            "professorId": "12345678",
            "firstName": "Verty",
            "lastName": "Verts",
            "Office": "Cafeteria",
            "Rating": "C+"
        },
        "83719683": {
            "professorId": "83719683",
            "firstName": "Jason",
            "lastName": "Derulo",
            "Office": "LGRT",
            "Rating": "B+"
        },
        "23810589": {
            "professorId": "23810589",
            "firstName": "Tim",
            "lastName": "Richards",
            "Office": "CS something",
            "Rating": "A+"
        }
    },
    // "Document" storing courses
    "courses": {
        "12345678": {
            "courseId": "COMPSCI 220",
            "courseName": "Programming Methodology",
            "description": "Fun",
            "location": "in the sky",
            "credits": "all of them",
            "final exam slot": "01/22/2017",
            "grade": "A+",
            "completed": "yes",
            "category": "art",
            "start": new Date(0,0,0,8,0),
            "end": new Date(0,0,0,8,55)
        },
        "92819522": {
            "courseId": "COMPSCI 230",
            "courseName": "Computer Systems Principles",
            "description": "Ahhh",
            "location": "ground",
            "credits": "all of them",
            "final exam slot": "02/22/2017",
            "grade": "A",
            "completed": "yes",
            "category": "literature",
            "start": new Date(0,0,0,9,5),
            "end": new Date(0,0,0,9,55)
        },
        "19103958": {
            "courseId": "COMPSCI 240",
            "courseName": "Reasoning About Uncertainty",
            "description": "Work",
            "location": "in the sky",
            "credits": "3",
            "final exam slot": "03/22/2017",
            "grade": "A-",
            "completed": "yes",
            "category": "cs",
            "start" : new Date(0,0,0,11,15),
            "end" : new Date(0,0,0,12,5)
        },
        "18271821": {
            "courseId": "COMPSCI 250",
            "courseName": "Introduction to Computation",
            "description": "Much work",
            "location": "in the sky",
            "credits": "4",
            "final exam slot": "04/22/2017",
            "grade": "B",
            "completed": "yes",
            "category": "history",
            "start" : new Date(0,0,0,2,30),
            "end" : new Date(0,0,0,3,45)
        },
        "85938173": {
            "courseId": "COMPSCI 320",
            "courseName": "Software Engineering",
            "description": "Much HW",
            "location": "in the sky",
            "credits": "1",
            "final exam slot": "05/22/2017",
            "grade": "B-",
            "completed": "yes",
            "category": "music",
            "start" : new Date(0,0,0,3,0),
            "end" : new Date(0,0,0,6,0)
        },
        "09876543": {
            "courseId": "COMPSCI 326",
            "courseName": "Web Programming",
            "description": "Difficult",
            "location": "in the sky",
            "credits": "2",
            "final exam slot": "06/22/2017",
            "grade": "C+",
            "completed": "yes",
            "category": "gym",
            "start" : new Date(0,0,0,5,30),
            "end" : new Date(0,0,0,6,45)
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
  return JSONClone(data[collection][id]);
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

/**
 * Removing this until we actually add a reset button
 */
/**
 * Reset database button.
 */
/*
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
*/
