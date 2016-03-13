import React from 'react';

export default class SearchResultItem extends React.Component {
	constructor(props) {
		super(props);

		var newState = props.data;
		newState.moreInfo = false;
		this.state = newState;
	}

	handleChevronClick(clickEvent) {
		clickEvent.preventDefault();

		if(clickEvent.button === 0) {
			this.setState({moreInfo: !this.state.moreInfo});
		}
	}

	render() {
		var data = this.state;
		var body;
		var chevron;

		if(this.state.moreInfo)
		{
			chevron = <span className="glyphicon glyphicon-chevron-down pull-right"></span>;
			body = (
				<div>
					<br />
					{data.description}
					<br />
					<a className="btn" data-toggle="modal" href="#Modal" style={{textAlign: 'right'}}>...More info</a>
				</div>
			);
		} else {
			chevron = <span className="glyphicon glyphicon-chevron-left pull-right"></span>;
		}

		return (
			<li className="list-group-item">
				<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
				{data.courseId} - {data.courseName} <a href="#" onClick={(e) => this.handleChevronClick(e)}>{chevron}</a>
				{body}
			</li>
		);
	}
}
