import React from 'react';
import {getStudentInfo, getCourses} from '../server';

var blocks55 = [], blocks75 = [];

var days = [
	{"day" : "Monday"},
	{"day" : "Tuesday"},
	{"day" : "Wednesday"},
	{"day" : "Thursday"},
	{"day" : "Friday"}
];


var def55Times = [
	new Date(0,0,0, 8, 0), new Date(0,0,0, 8,50),
	new Date(0,0,0, 9, 5), new Date(0,0,0, 9,55),
	new Date(0,0,0,10,10), new Date(0,0,0,11, 0),
	new Date(0,0,0,11,15), new Date(0,0,0,12, 5),
	new Date(0,0,0,12,20), new Date(0,0,0, 1,10),
	new Date(0,0,0, 1,25), new Date(0,0,0, 2,15)
];

var def75Times = [
	new Date(0,0,0, 8,30), new Date(0,0,0, 9,45),
	new Date(0,0,0,10, 0), new Date(0,0,0,11,15),
	new Date(0,0,0,11,30), new Date(0,0,0,12,45),
	new Date(0,0,0, 1, 0), new Date(0,0,0, 2,15),
	new Date(0,0,0, 2,30), new Date(0,0,0, 3,45),
	new Date(0,0,0, 4, 0), new Date(0,0,0, 5,15),
	new Date(0,0,0, 5,30), new Date(0,0,0, 6,45)
];

class CalendarBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	handleClick(e) {
		e.preventDefault();
		console.log("kappa");
	}

	render() {
		return (
			<div className="thumbnail"><span className={this.state.type} onClick={(e) => this.handleClick(e)}>{this.state.text}</span></div>
		);
	}
}

/*
class CourseButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	render () {
		return (
			<button type="button" className="btn btn-primary btn-block">
				<p>2:30 - 3:45PM</p>
				<p>AFROAM 133 - 01</p>
				<p>Lecture</p>
				<p>ILC S131</p>
			</button>
		);
	}
}
*/

for (var i=0; i < def55Times.length; i+= 2) {
	blocks55.push(
		<CalendarBlock key={"MWF" + i} type="time-55" text={def55Times[i].toTimeString().substring(0, 5).replace(/^0+/, '') + " - " + def55Times[i+1].toTimeString().substring(0, 5).replace(/^0+/, '')} />);
}

for (i=0; i < def75Times.length; i+= 2) {
	blocks75.push(<CalendarBlock key={"TTh" + i} type="time-75" text={def75Times[i].toTimeString().substring(0, 5).replace(/^0+/, '') + " - " + def75Times[i+1].toTimeString().substring(0, 5).replace(/^0+/, '')} />);
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

	render() {
		return (
			<div className="row">
				{getCourses(this.props.params.id, (it) => {
					if (it !== undefined)
						it.map((v) => {
							console.log(v)
						})
				})}

				{days.map((obj, i) => {
					switch(i) {
						case 0: case 2: case 4:
							return (
								<div key={"col" + i} className="col-md-3" id={obj.day}>
									<CalendarBlock type="day" text={obj.day} />
									{blocks55.concat(blocks75[4]).concat(blocks75[5]).concat(blocks75[6])}
								</div>
							);
						case 1: case 3:
						return (
							<div key={"col" + i} className="col-md-3" id={obj.day}>
								<CalendarBlock type="day" text={obj.day} />
								{blocks75}
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
