import React from 'react';

export default class SearchResultItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = props.data;
	}

	handleChevronClick(clickEvent) {
		clickEvent.preventDefault();

		if(clickEvent.button === 0) {

		}
	}

	render() {
		var data = this.state;
		return (
			<li className="list-group-item">
				<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
				{data.courseId} - {data.courseName}<a href="#"><span className="glyphicon glyphicon-chevron-left pull-right"></span></a>
			</li>
		);
	}
}

// <br />
// <br />
// MORE INFO ABOUT ANOTHER CLASS OR SOMETHING.
// <a className="btn" data-toggle="modal" href="#Modal" style={{textAlign: 'right'}}>...More info</a>
