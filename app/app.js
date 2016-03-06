import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendarBlock';

// use this to remove leading 0's
// replace(/^0+/, '')

ReactDOM.render(
	<Calendar />, document.getElementById('calendar')
);

/*
ReactDOM.render(
	<div>
			<CalendarBlock type="day" text="Tuesday" />
			{blocks75}
	</div>, document.getElementById('tuesday')
);
*/
