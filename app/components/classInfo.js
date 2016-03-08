import React from "react";
// import ReactDOM from "react-dom";


class ClassInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.data;
	}

	getDays() {
		for(var i = 0; i < this.state.days.length; i++) {

		}
	}

	render() {
		var data = this.state;
		return (
			<div>
				<div className="panel panel-default" id="modal-list-items">
					<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-ok-circle" style="color:#354066;"></span> Class Information</div>
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
									<td>{data.credits}</td>
									<td>83</td>
									<td>70</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-ok-circle" style="color:#354066;"></span> More Information</div>
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
									<td>Tu/Thu {data.start.toLocaleTimeString()} - {data.end.toLocaleTimeString()}</td>
									<td>{data.location}</td>
									<td>Tim Richards</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-ok-circle" style="color:#354066;"></span> Class Description</div>
					<div className="panel-body">{data.description}</div>
				</div>
			</div>
		)
	}
}
