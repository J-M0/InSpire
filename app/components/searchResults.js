import React from "react";

export default class SearchResults extends React.Component {
	render() {
		return (
			<div>
				<div class="panel-heading" style="color:354066;"><span class="glyphicon glyphicon-chevron-left" style="color:#354066;"></span> Search Results</div>
				<ul class="list group">
					<li class="list-group-item">
						<span class="glyphicon glyphicon-asterisk" style="color:green;"></span>
						CS 326 - Web Programming <span class="glyphicon glyphicon-chevron-down pull-right"></span>
						<br>
						<br>
						THIS IS A COOL CLASS. TRUST ME.
						<a class="btn" data-toggle="modal" href="#CS326Modal" style="text-align:right;">...More info</a>
					</li>
					<li class="list-group-item">
						<span class="glyphicon glyphicon-play class-full-btn" style="color:blue;"></span>
						CS 320 - Software Engineering <span class="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
					<li class="list-group-item">
						<span class="glyphicon glyphicon-stop" style="color:yellow;"></span>
						CS 373 - Intro. to Computer Graphics <span class="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
					<li class="list-group-item">
						<span class="glyphicon glyphicon-asterisk" style="color:green;"></span>
						CS 383 - Artificial Intelligence <span class="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
					<li class="list-group-item">
						<span class="glyphicon glyphicon-asterisk" style="color:green;"></span>
						CS 377 - Operating Systems <span class="glyphicon glyphicon-chevron-down pull-right"></span>
						<br>
						<br>
						MORE INFO ABOUT ANOTHER CLASS OR SOMETHING.
						<a class="btn" data-toggle="modal" href="#CS377Modal" style="text-align:right;">...More info</a>
					</li>
					<li class="list-group-item">
						<span class="glyphicon glyphicon-asterisk" style="color:green;"></span>
						CS 311 - Algorithms <span class="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
					<li class="list-group-item">
						<span class="glyphicon glyphicon-asterisk" style="color:green;"></span>
						CS 365 - Digital Forensics <span class="glyphicon glyphicon-chevron-right pull-right"></span>
					</li>
				</ul>
			</div>
		)
	}
}
