import React from 'react';

export default class SearchRadios extends React.Component {
	render() {
		return (
			<div className="panel panel-default" id="search-radios">
				<div className="panel-heading" style={{color: '#354066'}}>Class Search Filters</div>
				<div className="checkbox">
					<label><input type="checkbox" value="" />Seats Available</label>
				</div>
				<div className="form-group">
					<label htmlFor="keyword">Keyword:</label>
					<input type="text" className="class-num pull-right keyword" />
				</div>
				<div className="form-group">
					<label htmlFor="class-num">Class Number:</label>
					<select className="form control" id="course-num-ops">
						<option>{"="}</option>
						<option>&gt;=</option>
					</select>
					<input type="text" className="class-num pull-right keyword" />
				</div>
				<div className="form-group">
					<label htmlFor="subject">Subject:</label>
					<select className="form-control" id="subject">
						<option>Computer Science</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="gen-ed-cat">Gen Ed Category:</label>
					<select className="form-control" id="gen-ed-cat">
						<option>AL Literature</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="session">Session</label>
					<select className="form-control" id="session">
						<option>*University</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="instr-mode">Mode of Instruction</label>
					<select className="form-control" id="instr-mode">
						<option>Classroom</option>
					</select>
				</div>
				<div className="center-block">
					<button id="singlebutton" name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor: '#354066'}}>
						Search <span className="glyphicon glyphicon-search" style={{marginLeft: '5px', marginBottom: '5px'}}></span>
					</button>
				</div>
			</div>
		)
	}
}
