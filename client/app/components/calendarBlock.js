import React from 'react';
import ClassInfo from './classInfo';
import {getStudentInfo, getEnrolledCourses, getAvailableCourses} from '../server';
import timeToString from '../util';
import Modal from './modal';

// list of days used for rendering the calendar
var days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];

// 55 minute times for calendar
var default55Times = [
  new Date(0,0,0, 8, 0), new Date(0,0,0, 8,50),
  new Date(0,0,0, 9, 5), new Date(0,0,0, 9,55),
  new Date(0,0,0,10,10), new Date(0,0,0,11, 0),
  new Date(0,0,0,11,15), new Date(0,0,0,12, 5),
  new Date(0,0,0,12,20), new Date(0,0,0,13,10),
  new Date(0,0,0,13,25), new Date(0,0,0,14,15)
];

// 75 minute times for calendar
var default75Times = [
  new Date(0,0,0, 8,30), new Date(0,0,0, 9,45),
  new Date(0,0,0,10, 0), new Date(0,0,0,11,15),
  new Date(0,0,0,11,30), new Date(0,0,0,12,45),
  new Date(0,0,0,13, 0), new Date(0,0,0,14,15),
  new Date(0,0,0,14,30), new Date(0,0,0,15,45),
  new Date(0,0,0,16, 0), new Date(0,0,0,17,15),
  new Date(0,0,0,17,30), new Date(0,0,0,18,45)
];

/**
  * CourseButton Component
  * a CourseButton represents an enrolled course on the calendar
  * gets the course from the parent CalendarBlock, formats the info, and displays
  */
class CourseButton extends React.Component {
  handleClick(e) {
    e.preventDefault();
  }

  render() {
    var course = this.props.enrolledcourse;
    return(
      <button type="button" className="btn btn-block btn-primary cal-btn" onClick={(e) => this.handleClick(e)} data-toggle="modal" data-target={"#"+this.props.target}>
        <span>{timeToString(course.start) + " - " + timeToString(course.end)}</span>
        <span>{course.courseNumber}</span>
        <br/>
        <span>{course.location}</span>
      </button>
    );
  }
}

/**
  * AvailableModal Component
  * modal appears when clicking an empty CalendarBlock, displays list of available
  * courses, courses link to the CourseInfo modal
  */
class AvailableModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  // display it
  render() {
    var body;
    if (this.state.available.length !== 0) {
      body =
        <div>
          {this.state.available.map((courses, i) => { return(
            <button key={"btn"+i} type="button" className="course-modal-btn" onClick={(e, obj) => this.props.onClick(e, obj)}>
              {courses.courseNumber} - {courses.courseName}
            </button>
          );})}
        </div>;
    } else {
      body = <span style={{fontWeight: "bold"}}>There are no courses available for this time slot.</span>;
    }

    return(
      <div id="testModal" className="modal dimBg" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content myFade">
            <div className="modal-header">
              <h4 className="modal-title">Available Courses</h4>
            </div>
            <div className="modal-body" style={{textAlign: "center"}}>
              {body}
            </div>
            <div className="modal-footer">
              <button type="button" className="button-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
  * CalendarBlock Component
  * represents a time slot on the calendar
  */
class CalendarBlock extends React.Component {
  // gets the enrolled courses using the server and sets to enrolled
  constructor(props) {
    super(props);
    this.state = props;
    getEnrolledCourses(this.state.userId, (enrolled) => {
      this.setState({enrolled});
    });
  }

  componentDidMount() {
    getAvailableCourses(this.state.day, this.state.start, this.state.end, (available) => {
      this.setState({available});
    });
    this.setState({showModal : false});
    this.setState({courseInfoToggle: false});
  }

  // define refresh behavior, refreshes student info
  refresh() {
    if (this.state.flag !== undefined)
      this.state.flag(this.state);
    getStudentInfo(this.state.userId, (userInfo) => {
      this.setState({userInfo});
    });
  }

  // define click behavior, displays AvailableModal when clicked
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    var bang = !this.state.showModal;
    this.setState({ showModal: bang});
    this.refresh();
  }

  switchModals(e, i) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.courseInfoToggle === false) {
      this.setState({courseInfoToggle:i});
    } else {
      this.setState({courseInfoToggle:false});
    }
  }

  // display it
  render() {
    var content = this.state.text;
    var modal;

    // if no content, display regular CalendarBlock times
    if (content === undefined) {
      var start = this.state.start;
      var end   = this.state.end;
      // if we are enrolled in a course at this time we need a button!
      if(this.state.enrolled !== undefined) {
        this.state.enrolled.map((enrolled, i) => {
          // The available course list is a superset of enrolled course list
          if (this.state.available !== undefined)
            this.state.available.map((available, j) => {
              if (enrolled.courseNumber === available.courseNumber) {
                // pass the relevant course info to the button if we find it and then create it
                content = <CourseButton enrolledcourse={enrolled} target={this.props.day+i+j}/>;
								modal = <Modal type="ClassInformation" data={enrolled} id={this.props.day+i+j} />;
              }
            })
        })
      }

      // get the modal content if necessary
      if (this.state.showModal !== undefined) {
        if (modal === undefined) {
          modal = (this.state.showModal) ? <AvailableModal available={this.state.available} onClick={(e, obj)=>this.switchModals(e, obj)}/> : undefined;
        }
        if (this.state.courseInfoToggle !== false) {
          modal = <ClassInfo data={this.state.available[this.state.courseInfoToggle.slice(-1)]} onClick={(e, obj) => this.switchModals(e, obj)} custom={true}/>;
        }
      }

      // ternary operator, displays content if we have it where content is possibly a CourseButton, if not displays time
      content = (content === undefined) ? timeToString(start) + " - " + timeToString(end) : content;
    }

    var type = "thumbnail " + this.state.type;
    return (
      <div className={type} onClick={(e) => this.handleClick(e)}>
          {modal}
          {content}
      </div>
    );
  }
}

/**
  * Calendar Component
  * displays the calendar by making appropriate CalendarBlocks
  */
export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    getStudentInfo(this.props.params.id, (userInfo) => {
      this.setState({userInfo});
    });
  }

  // dont feel like explaining all this right now, so bascially it just does a calculation
  // to figure out which of those two arrays of times to use and which days to render using
  // modulo.
  render() {
    return (
      <div className="row" style={{height: '100%'}}>
        {days.map((d, i) => {
          switch(i) {
            case 0: case 2: case 4:
              return (
                <div key={"col" + i} className="col-md-3" id={d} style={{height: '100%'}}>
                  <CalendarBlock type="day" text={d} />
                  {default55Times.map((time, i) => {
                    if (this.state.userInfo !== undefined && i%2 === 0) {
                      return(<CalendarBlock userId={this.props.params.id} key={"MWF" + i/2} type="time-55" start={default55Times[i]} end={default55Times[i+1]} day={d}/>);
                    }
                  })}

                  {default75Times.map((time, i) => {
                    if (i > 6) {
                      if (this.state.userInfo !== undefined && i%2 === 0) {
                        return(<CalendarBlock userId={this.props.params.id} key={"MWF-Long" + i/2} type="time-75" start={default75Times[i]} end={default75Times[i+1]} day={d}/>);
                      }
                    }
                  })}
                </div>
              );
            case 1: case 3:
            return (
              <div key={"col" + i} className="col-md-3" id={d}>
                <CalendarBlock type="day" text={d} />
                {default75Times.map((time, i) => {
                  if (this.state.userInfo !== undefined && i%2 === 0) {
                    return(<CalendarBlock userId={this.props.params.id} key={"TTh" + i/2} type="time-75" start={default75Times[i]} end={default75Times[i+1]} day={d}/>);
                  }
                })}
              </div>
            );
          }
        })}
      </div>
    );
  }
}
