import React from 'react';
//import ReactDOM from 'react-dom';
import {getStudentInfo, getEnrolledCourses, queryCourses} from '../server';

// list of days used for rendering the calendar
var days = [
	{"day" : "Monday"},
	{"day" : "Tuesday"},
	{"day" : "Wednesday"},
	{"day" : "Thursday"},
	{"day" : "Friday"}
];

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
		var start = new Date(course.start).toLocaleTimeString();
		var end = new Date(course.end).toLocaleTimeString();
		var startTime = start.substring(0, start.indexOf(":")+3).replace(/^0+/, '');
		var endTime = end.substring(0, end.indexOf(":")+3).replace(/^0+/, '');

		// react inline styling for the button text
		var rightstyle = {
			textAlign:'center',
			display: 'block',
			float: 'right',
			paddingRight: '15%'
		};

		var leftstyle = {
			textAlign:'center',
			display: 'block',
			float: 'left',
			paddingLeft: '15%'
		}


		// display it
		return(
			<button type="button" className="btn btn-block btn-primary cal-btn">
				<span style={leftstyle}>{startTime + " - " + endTime}</span>  <span style={rightstyle}>{course.location}</span>
				<br />
				<span style={leftstyle}>{course.courseId}</span>
			</button>
		);
	}
}

/**
	* TODO: rename
	* TestModal Component
	* modal appears when clicking an empty CalendarBlock, displays list of available
	* courses, courses link to the CourseInfo modal
	*/
class TestModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	// display it
	render() {
		var body;
		if (this.state.available.length !== 0) {
			body = <div> {this.state.available.map( (courses, i) => {
					return(
						<button key={"btn"+i} type="button" className="course-modal-btn">{courses.courseId} - {courses.courseName}</button>
					);} ) } </div>;
		} else {
			body="There are no courses available for this time slot.";
		}

		return(
			<div id="testModal" className="modal big-red-box" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Available Courses</h4>
						</div>
						<div className="modal-body">
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

	// define refresh behavior, refreshes student info
	refresh() {
		if (this.state.flag !== undefined)
			this.state.flag(this.state);
		getStudentInfo(this.state.userId, (userInfo) => {
			this.setState({userInfo});
		});
	}

	// TODO: rename testShow variable
	// define click behavior, displays TestModal when clicked
	handleClick(e) {
		e.preventDefault();
		var bang = !this.state.testShow;
		this.setState({ testShow: bang});
		this.refresh();
	}

	// display it
	render() {
		var content = this.state.text;
		// if no modal needed, display regular CalendarBlock times
		if (content === undefined) {
			var startTime = this.state.start.toLocaleTimeString();
			var endTime 	= this.state.end.toLocaleTimeString();
			// if we are enrolled in a course at this time we need a button!
			if(this.state.enrolled !== undefined) {
				this.state.enrolled.map((enrolled) => {
					// The available course list is a superset of enrolled course list
					if (this.state.available !== undefined)
						this.state.available.map((available) => {
							if (enrolled.courseId === available.courseId)
								// pass the relevant course info to the button if we find it and then create it
								content = <CourseButton enrolledcourse={enrolled}/>;
						})
				})
			}

			// get the modal content if necessary
			if (this.state.testShow !== undefined)
				var modal = (this.state.testShow) ? <TestModal available={this.state.available}/> : undefined;

			// ternary operator, displays content if we have it where content is possibly a CourseButton, if not displays time
			content = (content === undefined)
								? startTime.substring(0, startTime.indexOf(":")+3).replace(/^0+/, '') + " - " + endTime.substring(0, endTime.indexOf(":")+3).replace(/^0+/, '')
								: content;
		}

		var type = "thumbnail " + this.state.type;
		return (
			<div className={type} onClick={(e) => this.handleClick(e)}>
					{modal}
					{content}
			</div>
		);
	}

	// called once
	componentDidMount() {
		queryCourses(this.state.day, this.state.start, this.state.end, (available) => {
			this.setState({available});
		});
		this.setState({testShow : false});
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
				{days.map((obj, i) => {
					switch(i) {
						case 0: case 2: case 4:
							return (
								<div key={"col" + i} className="col-md-3" id={obj.day} style={{height: '100%'}}>
									<CalendarBlock type="day" text={obj.day} />
									{default55Times.map((time, i) => {
										if (this.state.userInfo !== undefined && i%2 === 0) {
											{/* (a)=>this.courseFlag(a) says to send as an argument the function courseFlag with one argument
												* In calendarBlocks, we have this.state.flag(this) which compiles to Calendar.courseFlag(CalendarBlock)
												*/}
											return(<CalendarBlock userId={this.state.userInfo.studentId} key={"MWF" + i/2} type="time-55"
															start={default55Times[i]} end={default55Times[i+1]} day={obj.day}/>);
										}
									})}

									{default75Times.map((time, i) => {
										if (i > 6) {
											if (this.state.userInfo !== undefined && i%2 === 0) {
												return(<CalendarBlock userId={this.state.userInfo.studentId} key={"MWF-Long" + i/2} type="time-75"
																start={default75Times[i]} end={default75Times[i+1]} day={obj.day}/>);
											}
										}
									})}
								</div>
							);
						case 1: case 3:
						return (
							<div key={"col" + i} className="col-md-3" id={obj.day}>
								<CalendarBlock type="day" text={obj.day} />
								{default75Times.map((time, i) => {
									if (this.state.userInfo !== undefined && i%2 === 0) {
										return(<CalendarBlock flag={(a)=>this.courseFlag(a)} userId={this.state.userInfo.studentId} key={"TTh" + i/2} type="time-75"
														start={default75Times[i]} end={default75Times[i+1]} day={obj.day}/>);
									}
								})}
							</div>
						);
					}
				})}
			</div>
		);
	}

	componentDidMount() {
		this.refresh();
	}
}
