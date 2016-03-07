import React from 'react';
import {getStudentInfo, queryCourses} from '../server';

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

class CalendarBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	handleClick(e) {
		e.preventDefault();
		queryCourses(this.state.start, this.state.end, (available) => {
			this.setState({available});
		});
		// Note to Stephen: The above should grab all the courses that 
		// fit in a time slot when you click it. That said, however, 
		// it isn't perfect. Can you add days of the week to the courses
		// in our database? 
		// TODO: Create modal for viewing possible classes of something
		if (this.state.available !== undefined && this.state.available[0].start !== undefined) {
			var tmp = new Date(this.state.available[0].start);
			console.log(tmp.toLocaleTimeString());
		}
		console.log(this.state);
	}

	render() {
		if (this.state.text === undefined) {
			var startTime = this.state.start.toLocaleTimeString();
			var endTime 	= this.state.end.toLocaleTimeString();
		}

		return (
			<div className="thumbnail">
				<span className={this.state.type} onClick={(e) => this.handleClick(e)}>
					{
						(this.state.text !== undefined) 
						? this.state.text 
						: startTime.substring(0, startTime.indexOf(":")+3).replace(/^0+/, '') + " - " + endTime.substring(0, endTime.indexOf(":")+3).replace(/^0+/, '')
					}
				</span>
			</div>
		);
	}
}

export default class Calendar extends React.Component {
	constructor(props) {
		var i;
		super(props);
		this.state = props;
	}

	refresh() {
		getStudentInfo(this.props.params.id, (userInfo) => {
			this.setState({userInfo});
		});
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
											return(<CalendarBlock userId={this.state.userInfo.studentId} key={"MWF" + i/2} type="time-55" 
															start={default55Times[i]} end={default55Times[i+1]} />);
										}
									})}

									{default75Times.map((time, i) => {
										if (i > 8) {
											if (this.state.userInfo !== undefined && i%2 === 0) {
												return(<CalendarBlock userId={this.state.userInfo.studentId} key={"TTh" + i/2} type="time-75" 
																start={default75Times[i]} end={default75Times[i+1]} />);
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
										return(<CalendarBlock userId={this.state.userInfo.studentId} key={"TTh" + i/2} type="time-75" 
														start={default75Times[i]} end={default75Times[i+1]} />);
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
