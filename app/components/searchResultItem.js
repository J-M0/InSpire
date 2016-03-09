import React from 'react';

export default class SearchResultItem extends React.Component {
	constructor(props) {
		super(props);
	}

	handleChevronClick(clickEvent) {
		clickEvent.preventDefault();

		if(clickEvent.button === 0) {

		}
	}

	render() {
		return (
			<div>
				<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
				CS 377 - Operating Systems <span className="glyphicon glyphicon-chevron-down pull-right"></span>
				<br />
				<br />
				MORE INFO ABOUT ANOTHER CLASS OR SOMETHING.
				<a className="btn" data-toggle="modal" href="Modal" style={{textAlign: 'right'}}>...More info</a>
			</div>
		);
	}
}
