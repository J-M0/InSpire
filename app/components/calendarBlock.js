import React from 'react';
//import ReactDOM from 'react-dom';
import {getStudentInfo, getEnrolledCourses, queryCourses} from '../server';

// STEPHEN TODO:
// fix search_for_class.html to also have shopping cart

var days = [
	{"day" : "Monday"},
	{"day" : "Tuesday"},
	{"day" : "Wednesday"},
	{"day" : "Thursday"},
	{"day" : "Friday"}
];

var default55Times = [
	new Date(0,0,0, 8, 0), new Date(0,0,0, 8,50),
	new Date(0,0,0, 9, 5), new Date(0,0,0, 9,55),
	new Date(0,0,0,10,10), new Date(0,0,0,11, 0),
	new Date(0,0,0,11,15), new Date(0,0,0,12, 5),
	new Date(0,0,0,12,20), new Date(0,0,0,13,10),
	new Date(0,0,0,13,25), new Date(0,0,0,14,15)
];

var default75Times = [
	new Date(0,0,0, 8,30), new Date(0,0,0, 9,45),
	new Date(0,0,0,10, 0), new Date(0,0,0,11,15),
	new Date(0,0,0,11,30), new Date(0,0,0,12,45),
	new Date(0,0,0,13, 0), new Date(0,0,0,14,15),
	new Date(0,0,0,14,30), new Date(0,0,0,15,45),
	new Date(0,0,0,16, 0), new Date(0,0,0,17,15),
	new Date(0,0,0,17,30), new Date(0,0,0,18,45)
];

class CourseButton extends React.Component {
	render() {
		var course = this.props.enrolledcourse;
		var start = new Date(course.start).toLocaleTimeString();
		var end = new Date(course.end).toLocaleTimeString();
		var startTime = start.substring(0, start.indexOf(":")+3).replace(/^0+/, '');
		var endTime = end.substring(0, end.indexOf(":")+3).replace(/^0+/, '');

		var rightstyle = {
			textAlign:'right'
		};

		var leftstyle = {
			textAlign:'left'
		}

		return(
			<button type="button" className="btn btn-block btn-primary cal-btn">
				<span style={leftstyle}>{startTime + " - " + endTime}</span> | <span style={rightstyle}>{course.location}</span>
				<br />
				{course.courseId}
			</button>
		);
	}
}

class TestModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

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

class CalendarBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
		getEnrolledCourses(this.state.userId, (enrolled) => {
			this.setState({enrolled});
		});
	}

	refresh() {
		if (this.state.flag !== undefined)
			this.state.flag(this.state);
		getStudentInfo(this.state.userId, (userInfo) => {
			this.setState({userInfo});
		});
	}

	handleClick(e) {
		e.preventDefault();
		// TODO: Create modal for viewing possible classes of
		var bang = !this.state.testShow;
		this.setState({ testShow: bang});
		this.refresh();
	}

	render() {
		if (this.state.testShow !== undefined)
			var modal = (this.state.testShow) ? <TestModal available={this.state.available}/> : undefined;
		var content = this.state.text;

		if (content === undefined) {
			var startTime = this.state.start.toLocaleTimeString();
			var endTime 	= this.state.end.toLocaleTimeString();

			if(this.state.enrolled !== undefined) {
				this.state.enrolled.map((enrolled) => {
					// The available course list is a superset of enrolled course list
					if (this.state.available !== undefined)
						this.state.available.map((available) => {
							if (enrolled.courseId === available.courseId)
								content = <CourseButton enrolledcourse={enrolled} />;
						})
				})
			}
			content = (content === undefined)
								? startTime.substring(0, startTime.indexOf(":")+3).replace(/^0+/, '') + " - " + endTime.substring(0, endTime.indexOf(":")+3).replace(/^0+/, '')
								: content;
		}

		var type = "thumbnail " + this.state.type + " cal-btn-container";
		return (
			<div className={type}>
				<span onClick={(e) => this.handleClick(e)}>
					{modal}
					{content}
				</span>
			</div>
		);
	}

	componentDidMount() {
		queryCourses(this.state.day, this.state.start, this.state.end, (available) => {
			this.setState({available});
		});
		this.setState({testShow : false});
	}
}

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

	courseFlag(obj) {
		//console.log(obj);
	}

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
											return(<CalendarBlock flag={(a)=>this.courseFlag(a)} userId={this.state.userInfo.studentId} key={"MWF" + i/2} type="time-55"
															start={default55Times[i]} end={default55Times[i+1]} day={obj.day}/>);
										}
									})}

									{default75Times.map((time, i) => {
										if (i > 6) {
											if (this.state.userInfo !== undefined && i%2 === 0) {
												return(<CalendarBlock flag={(a)=>this.courseFlag(a)} userId={this.state.userInfo.studentId} key={"MWF-Long" + i/2} type="time-75"
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
