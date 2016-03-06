import React from 'react';
import {readDocuments} from '../database.js';

/*
var days = {
	"Monday"    : 1,
	"Tuesday"   : 2,
	"Wednesday" : 3,
	"Thursday"  : 4,
	"Friday"    : 5
} */

var courses = readDocuments('courses');
{console.log(courses);}
var blocks55 = []; var blocks75 = [];

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

	render() {
		return (
			<div className="thumbnail"><span className={this.state.type}>{this.state.text}</span></div>
		);
	}
}



for (var i=0; i < def55Times.length; i+= 2) {
	blocks55.push(<CalendarBlock key={i} type="time-55" text={def55Times[i].toTimeString().substring(0, 5).replace(/^0+/, '') + " - " + def55Times[i+1].toTimeString().substring(0, 5).replace(/^0+/, '')} />);
}

for (i=0; i < def75Times.length; i+= 2) {
	blocks75.push(<CalendarBlock key={i} type="time-75" text={def75Times[i].toTimeString().substring(0, 5).replace(/^0+/, '') + " - " + def75Times[i+1].toTimeString().substring(0, 5).replace(/^0+/, '')} />);
}

export default class Calendar extends React.Component {

	render() {
		return (
			<div className="row">
				<div className="col-md-3" id="Monday">
					<CalendarBlock type="day" text="Monday" />
					{blocks55}
					{blocks75[4]}
					{blocks75[5]}
					{blocks75[6]}
				</div>
				<div className="col-md-3" id="Tuesday">
					<CalendarBlock type="day" text="Tuesday" />
					{blocks75}
				</div>
				<div className="col-md-3" id="Wednesday">
					<CalendarBlock type="day" text="Wednesday" />
					{blocks55}
					{blocks75[4]}
					{blocks75[5]}
					{blocks75[6]}
				</div>
				<div className="col-md-3" id="Thursday">
					<CalendarBlock type="day" text="Thursday" />
					{blocks75}
				</div>
				<div className="col-md-3" id="Friday">
					<CalendarBlock type="day" text="Friday" />
					{blocks55}
					{blocks75[4]}
					{blocks75[5]}
					{blocks75[6]}
				</div>
			</div>
		);
	}
}
