import React from "react";

export default class ClassInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	getDays() {
		return this.state.data.days.join(" / ");
	}

	clickFn(e, obj) {
		if (this.props.onClick !== undefined)
			this.props.onClick(e, obj);
	}

	render() {
		var data = this.state.data;
		var start = new Date(data.start).toLocaleTimeString()
		var end = new Date(data.end).toLocaleTimeString()

		if (data.instructor.firstName !== undefined)
			var name = data.instructor.firstName.concat(" ", data.instructor.lastName);

		var classEdit1 = "modal fade";
		var classEdit2 = "modal-content";

		if (this.props.custom === true) {
			classEdit1 = "modal dimBg";
			classEdit2 = "modal-content myFade";
		}

		return (
			<div id={this.props.id} className={classEdit1} role="dialog" onClick={(e, obj) => this.clickFn(e, obj)}>
        <div className="modal-dialog">
          <div className={classEdit2}>
            <div className="modal-header">
              <h4 className="modal-title" style={{color:'#354066'}}>Class Information</h4>
            </div>
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
											<td>{data.courseId}</td>
											<td>{data.section}</td>
											<td>{data.credits}</td>
											<td>{data.enrolled}</td>
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
            </div>
            <div className="modal-footer">
              <button type="button" className="button-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
