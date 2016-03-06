import React from 'react';
import ReactDOM from 'react-dom';
import CalendarBlock from './components/calendarBlock';

class UghWorld extends React.Component {
	render () {
		return (
			<p>ugh, world</p>
		);
	}
}

ReactDOM.render(
	<CalendarBlock />, document.getElementById('monday')
);
