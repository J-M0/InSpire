import React from 'react';
import ReactDOM from 'react-dom';
import {getStudentInfo, getEnrolledCourses, queryCourses} from '../server';

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
		return(
			<button type="button" className="btn btn-primary btn-block">
				<p>2:30 - 3:45PM</p>
				<p>AFROAM 133 - 01AB</p>
				<p>Discussion</p>
				<p>MALCOLMX Center</p>
			</button>
		);
	}
}

class CourseModal extends React.Component {

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
		// TODO: Refresh Enrolled Courses?
		if (this.state.flag !== undefined)
		this.state.flag(this.state);

		console.log(this);
	}

	handleClick(e) {
		e.preventDefault();
		// TODO: Create modal for viewing possible classes of

		this.refresh();
	}

	render() {
		var content = this.state.text;

		if (content === undefined) {
			var startTime = this.state.start.toLocaleTimeString();
			var endTime 	= this.state.end.toLocaleTimeString();

			// TODO: can you check if everything works??????
			if(this.state.enrolled !== undefined) {
				this.state.enrolled.map((enrolled) => {
					// The available course list is a superset of enrolled course list
					if (this.state.available !== undefined)
						this.state.available.map((available) => {
							if (enrolled.courseId === available.courseId)
								content = <CourseButton />;
						})
				})
			}
			content = (content === undefined)
								? startTime.substring(0, startTime.indexOf(":")+3).replace(/^0+/, '') + " - " + endTime.substring(0, endTime.indexOf(":")+3).replace(/^0+/, '')
								: content;
		}

		return (
			<div className="thumbnail">
				<span className={this.state.type} onClick={(e) => this.handleClick(e)}>
					{content}
				</span>
			</div>
		);
	}

	componentDidMount() {
		queryCourses(this.state.day, this.state.start, this.state.end, (available) => {
			this.setState({available});
		});
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
			<div className="row">
				{days.map((obj, i) => {
					switch(i) {
						case 0: case 2: case 4:
							return (
								<div key={"col" + i} className="col-md-3" id={obj.day}>
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
