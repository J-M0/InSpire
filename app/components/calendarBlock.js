import React from 'react';

export default class CalendarBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	render() {
		return (
			<div className="thumbnail">
				<span className={this.state.type}>{this.state.text}</span>
			</div> // End of top div
		);
	}
}
