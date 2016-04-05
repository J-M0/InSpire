import React from 'react';
import {getCourseInfo} from '../server';
// import {timeToString} from '../util';


export default class Modal extends React.Component {
	render() {
		var modalType = this.props.type;
		var modalId = this.props.id;
		var data = this.props.data;

		var modalContent;
		var modalTitle;
		switch (modalType) {
			case "ClassInformation":
			modalContent = <ClassInfo data={data} />;
			modalTitle = "Class Information";
			break;
			case "UnofficialTranscript":
			modalContent = <UoTranscript data={data} />;
			modalTitle = "Unofficial Transcript";
			break;
			case "FinalExamSchedule":
			modalContent = <FinalExamModal data={data} />;
			modalTitle = "Final Exam Schedule";
			break;
			case "TimeSelection":
			modalContent = "Time Selection";
			modalTitle = "Time Selection";
			break;
			case "AvailableCourses":
			modalContent = "Available Courses";
			modalTitle = "Available Courses";
			break;
			default:
			break;
		}

		return (
			<div className="modal fade" role="dialog" id={modalId}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title">{modalTitle}</h4>
						</div>
						<div className="modal-body">
							{modalContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class FinalExamModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	render() {
		var data = this.props.data;
		var modalContent = "";
		if (data !== undefined) {
			if (data.enrolledCourses.length !== 0) {
				modalContent =
				data.enrolledCourses.map((tuples, i) => {
					return(
						<tr key={"tr"+i}>
							<td>DATE</td>
							<td>TIME</td>
							<td>{tuples}</td>
							<td>LOCATION</td>
						</tr>
					);
				}
			)
		}
	}

	return(
		<div className="modal-body">
			<div className="panel-body" style={{color:'#354066'}}>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Date</th>
							<th>Time</th>
							<th>Course</th>
							<th>Location</th>
						</tr>
					</thead>
					<tbody>
						{modalContent}
					</tbody>
				</table>
			</div>

			<div className="modal-footer">
				<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	);
	}
}

class ClassInfo extends React.Component {
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

		if (data.instructor.firstName !== undefined) {
			var name = data.instructor.firstName.concat(" ", data.instructor.lastName);
		}
		return (
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
			</div>
		);
	}
}

class UoTranscript extends React.Component {

	render() {
		var data = this.props.data;
		var modalContent = "";
		if (data !== undefined) {
			if (data.completedCourses.length !== 0) {
				modalContent =
				data.completedCourses.map((tuples, i) => {
					return(
						<tr key={"tr"+i}>
							<td>{tuples[0]}</td>
							<td>{tuples[1]}</td>
						</tr>
					);
				}
			)
		}
	}

	return(
		<div className="modal-body">
			<div className="panel-body" style={{color:'#354066'}}>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Course</th>
							<th>Grade</th>
						</tr>
					</thead>
					<tbody>
						{modalContent}
					</tbody>
				</table>
			</div>

			<div className="modal-footer">
				<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	);
}
}
