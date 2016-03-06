import React from 'react';
import ReactDOM from 'react-dom';
import CalendarBlock from './components/calendarBlock';

// use this to remove leading 0's
// replace(/^0+/, '')
var i = 2;
var def55Times = [new Date(0,0,0,8,0), new Date(0,0,0,8,50),
									new Date(0,0,0,9,5), new Date(0,0,0,9,55),
									new Date(0,0,0,10,10), new Date(0,0,0,11,0),
									new Date(0,0,0,11,15), new Date(0,0,0,12,5),
									new Date(0,0,0,12,20), new Date(0,0,0,1,10),
									new Date(0,0,0,1,25), new Date(0,0,0,2,15)];

ReactDOM.render(
	<div>
			<CalendarBlock type="day" text="Monday" />
			<CalendarBlock type="time-55" text={def55Times[i].toTimeString().substring(0, 5).replace(/^0+/, '') + " - " + def55Times[i+1].toTimeString().substring(0, 5).replace(/^0+/, '')} />
	</div>, document.getElementById('monday')
);
