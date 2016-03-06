import React from 'react';

export default class CalendarBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	render() {
		return (
			<div className="thumbnail">
				<span className="day">Monday</span>
			</div> // End of top div
		);
	}
}
