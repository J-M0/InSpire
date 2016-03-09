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
				CS 326 - Web Programming <a href="#"><span className="glyphicon glyphicon-chevron-down pull-right"></span></a>
				<br />
				<br />
				THIS IS A COOL CLASS. TRUST ME.
				<a className="btn" data-toggle="modal" href="#CS326Modal" style={{textAlign: 'right'}}>...More info</a>
			</div>
		);
	}
}
