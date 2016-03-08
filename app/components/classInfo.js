import React from "react";
import ReactDOM from "react-dom";


export default class ClassInfo extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = props.data;
	// }
	//
	// getDays() {
	// 	return this.state.days.join(" / ");
	// }

	render() {
		// var data = this.state;
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
								<td>Computer Science 377</td>
								<td>01</td>
								<td>4</td>
								<td>83</td>
								<td>70</td>
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
								<td>Operating Systems</td>
								<td>Tu/Thu 1:00pm - 2:15pm</td>
								<td>Integrated Learning Center S211</td>
								<td>Tim Richards</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="panel-heading" style={{color: '#354066'}}><span className="glyphicon glyphicon-ok-circle" style={{color: '#354066'}}></span> Class Description</div>
				<div className="panel-body">
					The design and operation of modern computer operating systems. Review of capabilities of typical computer hardware. Topics include command language interpreter (the shell), processes, concurrency, inter-process communication, linking and loading, memory management, transactions, file systems, distributed systems, security, and protection. Programming projects in Java and C.
				</div>
			</div>
		)
	}
}

// <td>{data.courseId}</td>
// <td>{data.section}</td>
// <td>{data.credits}</td>
// <td>{data.enrolled}</td>
// <td>{data.capacity}</td>

// <td>{data.courseName}</td>
// <td>{this.getDays()} {data.start.toLocaleTimeString()} - {data.end.toLocaleTimeString()}</td>
// <td>{data.location}</td>
// <td>{data.instructor.firstName.concat(" ", data.instructor.lastName)}</td>

// <div className="panel-body">{data.description}</div>



ReactDOM.render(
	<ClassInfo />,
	document.getElementById('class-info-modal')
);
