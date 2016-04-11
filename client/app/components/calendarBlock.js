import React from 'react';
import {getStudentInfo, getEnrolledCourses, getAvailableCourses, dropClass, enrollInClass} from '../server';
import {hhMMToString, meridiemToString} from '../util';
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
  render() {
    var course = this.props.enrolledcourse;
    return(
      <button type="button" className="btn btn-block btn-primary cal-btn" data-toggle="modal" data-target={"#"+this.props.target}>
        <span>{hhMMToString(course.start) + " - " + meridiemToString(course.end)}</span>
        <span>{course.courseNumber}</span>
        <br/>
        <span>{course.location}</span>
      </button>
    );
  }
}

/**
  * CalendarBlock Component
  * represents a time slot on the calendar
  */
class CalendarBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    getAvailableCourses(this.state.day, this.state.start, this.state.end, (available) => {
      this.setState({available});
    });
  }

  render() {
    var content = this.state.text;
    var type = "thumbnail " + this.state.type;
    var modal;

    if(this.state.available !== undefined) {
      var data = this.state.available;
      modal =
        <div>
          {this.state.available.map((course, i) => {
            return(<Modal key={"modal"+i} type="ClassInformation" data={course} id={this.state.id+i} addClass={this.props.addClass}/>)
          })}
          <Modal data={data} type="AvailableCourses" id={this.state.id} />
        </div>
    }

    // if no content, display regular CalendarBlock times
    if (content === undefined) {
      var start = this.state.start;
      var end   = this.state.end;
      this.props.enrolled.map((enrolled) => {
        if (this.state.available !== undefined)
          this.state.available.map((available) => {
            if (enrolled.courseNumber === available.courseNumber) {
              content = <CourseButton enrolledcourse={enrolled} target={this.state.id}/>;
              modal = <Modal type="ClassInformation" data={enrolled} id={this.state.id} noButton={true} removeClass={this.props.removeClass}/>;
            }
          })
      })
      content = (content === undefined) ? hhMMToString(start) + " - " + meridiemToString(end) : content;
    }

    return (
      <div className={type}>
        {modal}
        {content}
        <div style={{height: "80%", width: "100%"}} data-toggle="modal" data-target={"#"+this.state.id}/>
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

    getStudentInfo(this.props.params.id, (userInfo) => {
      this.setState({userInfo});
    });

    this.refresh();
  }

  refresh() {
    if (this.props.params.id !== undefined) {
      getEnrolledCourses(this.props.params.id, (enrolled) => {
        this.setState({enrolled});
      });
    }
  }

  removeClass(course) {
    dropClass(this.props.params.id, course, () => {
      this.refresh();
    });
  }

  addClass(course) { 
    enrollInClass(this.props.params.id, course, () => {
      this.refresh();
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
                    if (this.state.enrolled !== undefined && i%2 === 0) {
                      return(
                        <CalendarBlock userId={this.props.params.id} key={"MWF" + i/2} id={"MWF" + i/2} type="time-55" 
                          start={default55Times[i]} end={default55Times[i+1]} day={d} enrolled={this.state.enrolled} 
                          removeClass={(c) => this.removeClass(c)} addClass={(c) => this.addClass(c) }/>
                      );
                    }
                  })}

                  {default75Times.map((time, i) => {
                    if (i > 6) {
                      if (this.state.enrolled !== undefined && i%2 === 0) {
                        return(
                          <CalendarBlock userId={this.props.params.id} key={"MWF-Long" + i/2} id={"MWF-Long" + i/2} type="time-75" 
                            start={default75Times[i]} end={default75Times[i+1]} day={d} enrolled={this.state.enrolled} 
                            removeClass={(c) => this.removeClass(c)} addClass={(c) => this.addClass(c)} />
                        );
                      }
                    }
                  })}
                </div>
              );
              break;
            case 1: case 3:
              return (
                <div key={"col" + i} className="col-md-3" id={d}>
                  <CalendarBlock type="day" text={d} />
                  {default75Times.map((time, i) => {
                    if (this.state.enrolled !== undefined && i%2 === 0) {
                      return(
                        <CalendarBlock userId={this.props.params.id} key={"TTh" + i/2} id={"TTh" + i/2} type="time-75" 
                          start={default75Times[i]} end={default75Times[i+1]} day={d}  enrolled={this.state.enrolled} 
                          removeClass={(c) => this.removeClass(c)} addClass={(c) => this.addClass(c)} />
                      );
                    }
                  })}
                </div>
              );
              break;
            default:
              break;
          }
        })}
      </div>
    );
  }
}
