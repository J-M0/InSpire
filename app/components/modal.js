import React from 'react';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	getDays() {
		return this.state.data.days.join(" / ");
	}

	render() {
		var modalType = this.state.modalType;
		var data = this.state.data;

		var start = new Date(data.start).toLocaleTimeString()
		var end = new Date(data.end).toLocaleTimeString()

		if (data.instructor.firstName !== undefined)
		var name = data.instructor.firstName.concat(" ", data.instructor.lastName);

		var modalContent;
		switch (modalType){
			case "Class Information":
			modalContent =
			<div className="modal-body">
				<div className="panel-body" style={{color:'#354066'}}>
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
								<td>{data.courseNumber}</td>
								<td>{data.section}</td>
								<td>{data.credits}</td>
								<td>{data.enrolled.length}</td>
								<td>{data.capacity}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="panel-body" style={{color:'#354066'}}>
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
				<div className="panel-body" style={{color:'#354066'}}>{data.description}</div>

				<div className="modal-footer">
					<button type="button" className="btn btn-primary">Add Class</button>
					<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>;
			break;
			case "Unofficial Transcript":
			modalContent = "";
			break;
			case "Final Exam Schedule":
			modalContent = "";
			break;
			case "Time Selection":
			modalContent = "";
			break;
			case "Available Courses":
			modalContent = "";
			break;
			default:
			console.log(modalType);
			break;
		}

		return (
			<div className="modal fade" role="dialog" id={modalType}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title">{modalType}</h4>
						</div>;
						{modalContent}
					</div>
				</div>
			</div>
		)
	}
}
