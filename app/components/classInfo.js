import React from "react";

export default class ClassInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.data;
	}

	getDays() {
		return this.state.days.join(" / ");
	}

	render() {
		var data = this.state;
		var start = new Date(data.start).toLocaleTimeString()
		var end = new Date(data.end).toLocaleTimeString()
		var name = data.instructor.firstName.concat(" ", data.instructor.lastName);

		return (
			<div className="panel panel-default" id="modal-list-items">
				<div className="panel-heading" style={{color: '#354066'}}><span className="glyphicon glyphicon-ok-circle" style={{color: '#354066'}}></span> Class Information</div>
				<div className="panel-body">
					<table className="table">
						<thead>
							<tr>
								<th>Number</th>
								<th>Section</th>
								<th>Units</th>
								<th>Enrolled</th>
								<th>Cap</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{data.courseId}</td>
								<td>{data.section}</td>
								<td>{data.credits}</td>
								<td>{data.enrolled}</td>
								<td>{data.capacity}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="panel-heading" style={{color: '#354066'}}><span className="glyphicon glyphicon-ok-circle" style={{color: '#354066'}}></span> More Information</div>
				<div className="panel-body">
					<table className="table">
						<thead>
							<tr>
								<th>Title</th>
								<th>Time</th>
								<th>Room</th>
								<th>Instructor</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{data.courseName}</td>
								<td>{this.getDays()} <br/> {start} - {end}</td>
								<td>{data.location}</td>
								<td>{name}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="panel-heading" style={{color: '#354066'}}><span className="glyphicon glyphicon-ok-circle" style={{color: '#354066'}}></span> Class Description</div>
				<div className="panel-body">{data.description}</div>
			</div>
		)
	}
}
