import React from "react";
import ReactDOM from "react-dom";

export default class SearchResults extends React.Component {
	render() {
		return (
			<div>
				<div className="panel-heading" style={{color: '#354066'}}><span className="glyphicon glyphicon-chevron-left" style={{color: '#354066'}}></span> Search Results</div>
				<ul className="list group">
					<li className="list-group-item">
						<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
						CS 326 - Web Programming <span className="glyphicon glyphicon-chevron-down pull-right"></span>
						<br />
						<br />
						THIS IS A COOL CLASS. TRUST ME.
						<a className="btn" data-toggle="modal" href="#CS326Modal" style={{textAlign: 'right'}}>...More info</a>
					</li>
					<li className="list-group-item">
						<span className="glyphicon glyphicon-play class-full-btn" style={{color: 'blue'}}></span>
						CS 320 - Software Engineering <span className="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
					<li className="list-group-item">
						<span className="glyphicon glyphicon-stop" style={{color: 'yellow'}}></span>
						CS 373 - Intro. to Computer Graphics <span className="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
					<li className="list-group-item">
						<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
						CS 383 - Artificial Intelligence <span className="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
					<li className="list-group-item">
						<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
						CS 377 - Operating Systems <span className="glyphicon glyphicon-chevron-down pull-right"></span>
						<br />
						<br />
						MORE INFO ABOUT ANOTHER CLASS OR SOMETHING.
						<a className="btn" data-toggle="modal" href="#CS377Modal" style={{textAlign: 'right'}}>...More info</a>
					</li>
					<li className="list-group-item">
						<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
						CS 311 - Algorithms <span className="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
					<li className="list-group-item">
						<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
						CS 365 - Digital Forensics <span className="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
				</ul>
			</div>
		)
	}
}

ReactDOM.render(
	<SearchResults />,
	document.getElementById('search-results')
);
