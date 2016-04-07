import React from 'react';
import {getCourseInfo, getProfessorInfo} from '../server';
// import {timeToString} from '../util';


export default class Modal extends React.Component {
  render() {
    var modalType = this.props.type;
    var modalId = this.props.id;
    var data = this.props.data;

    var modalContent;
    var modalTitle;
    switch (modalType) {
      case "ClassInformation":
        modalContent = <ClassInfo data={data} noButton={this.props.noButton}/>;
        modalTitle = "Class Information";
        break;
      case "UnofficialTranscript":
        modalContent = <UoTranscript data={data} />;
        modalTitle = "Unofficial Transcript";
        break;
      case "FinalExamSchedule":
        modalContent = <FinalExamModal data={data} />;
        modalTitle = "Final Exam Schedule";
        break;
      case "TimeSelection":
        modalContent = "Time Selection";
        modalTitle = "Time Selection";
        break;
      case "AvailableCourses":
        modalContent = <AvailableModal data={data} id={modalId}/>;
        modalTitle = "Available Courses";
        break;
      default:
        break;
    }

    return (
      <div className="modal fade" role="dialog" id={modalId}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{modalTitle}</h4>
            </div>
            {modalContent}
          </div>
        </div>
      </div>
    )
  }
}

class FinalExamModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    var data = this.props.data;
    var modalContent = "";
    if (data !== undefined) {
      if (data.enrolledCourses.length !== 0) {
        modalContent =
        data.enrolledCourses.map((tuples, i) => {
          return(
            <tr key={"tr"+i}>
              <td>DATE</td>
              <td>TIME</td>
              <td>{tuples}</td>
              <td>LOCATION</td>
            </tr>
          );
        }
      )
    }
  }

  return(
    <div>
      <div className="modal-body">
        <div className="panel-body" style={{color:'#354066'}}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Course</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {modalContent}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
    );
  }
}

class ClassInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    //temp var for prof name
    var profId = this.state.instructor;
    var profName;
    getProfessorInfo(profId, (prof) => {
      profName = prof.firstName + " " + prof.lastName;
      this.setState({ professor: profName});
    });
  }

  getDays() {
    return this.state.days.join(" / ");
  }

  render() {
    var addButton;
    var data = this.state;
    var prof = this.state.professor;
    var start = new Date(data.start).toLocaleTimeString();
    var end = new Date(data.end).toLocaleTimeString();

    if(!this.props.noButton) {
      addButton = <button type="button" className="btn btn-primary">Add Class</button>;
    }

    return (
      <div>
        <div className="modal-body">
          <div className="panel-body" style={{color:'#354066'}}>
            <table className="table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Section</th>
                  <th>Units</th>
                  <th>Enrolled</th>
                  <th>Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.courseNumber}</td>
                  <td>{data.section}</td>
                  <td>{data.credits}</td>
                  <td>{data.enrolled.length}</td>
                  <td>{data.capacity}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="panel-body" style={{color:'#354066'}}>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.courseName}</td>
                  <td>{this.getDays()} <br/> {start} - {end}</td>
                  <td>{data.location}</td>
                  <td>{prof}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="panel-body" style={{color:'#354066'}}>{data.description}</div>
        </div>
        <div className="modal-footer">
          {addButton}
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    );
  }
}

class UoTranscript extends React.Component {
  constructor(props) {
    // Typical constructor stuff
    super(props);
    this.state = props;

    var transcript = [];    // temp variable

    // Since we know that props is not undefined (if you aren't sure,
    // refer to userInfo.js), we can do the below!

    // Iterate over the completed courses, if there are none (i.e.
    // completedCourses.length === 0, this does nothing.
    this.state.data.completedCourses.map((tuples) => {
      var courseAndGrade = [];    // Another temp variable
      // Server-Database query for each completedCourse
      getCourseInfo(tuples[0], (klass) => {
        // Push to the tuple
        courseAndGrade.push(klass.courseNumber + " " + klass.courseName);
        courseAndGrade.push(tuples[1]);
        // Push tuple to transcript array
        transcript.push(courseAndGrade);
        // Set this asynchronously, which is perfectly fine
        this.setState({transcript: transcript});
      });
    });
  }

  render() {
    var modalContent;
    if (this.state.transcript !== undefined) {
      modalContent = this.state.transcript.map((tuples, i) => {
        return (
          <tr key={"tr"+i}>
            <td>{tuples[0]}</td>
            <td>{tuples[1]}</td>
          </tr>
        );
      });
    }

    return(
      <div>
        <div className="modal-body">
          <div className="panel-body" style={{color:'#354066'}}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {modalContent}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    );
  }
}

class AvailableModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }
  render() {
    var body;
    var data;

    data = this.state.data;
    if (data.length > 0) {
      body =
        <div data-toggle="modal" data-target={"#"+this.props.id}>
          {data.map((course, i) => {
            return(
              <button key={"btn"+i} type="button" className="course-modal-btn" data-toggle="modal" data-target={"#"+this.state.id+i}>
                {course.courseNumber} - {course.courseName}
              </button>
            );
          })}
        </div>
    } else {
      body = <div><span>There are no available courses to take at this time.</span></div>;
    }


    return(
      <div>
        <div className="modal-body" style={{textAlign: "center"}}>
          <div className="panel-body" style={{color:'#354066'}}>
            {body}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="button-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    );
  }
}
