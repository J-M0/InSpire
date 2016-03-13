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

		if(this.state.moreInfo)
		{
			body = (
				<div>
					<a href="#" onClick={(e) => this.handleChevronClick(e)}><span className="glyphicon glyphicon-chevron-down pull-right"></span></a>
					<br />
					<br />
					{data.description}
					<a className="btn" data-toggle="modal" href="#Modal" style={{textAlign: 'right'}}>...More info</a>
				</div>
			);
		} else {
			body = (
				<a href="#" onClick={(e) => this.handleChevronClick(e)}><span className="glyphicon glyphicon-chevron-right pull-right"></span></a>
			);
		}

		return (
			<li className="list-group-item">
				<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
				{data.courseId} - {data.courseName} {body}
			</li>
		);
	}
}
