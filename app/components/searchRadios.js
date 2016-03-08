import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchRadios {
	render() {
		return (
			<div>
				<div class="panel-heading" style="color:#354066;">Class Search Filters</div>
				<div class="checkbox">
					<label><input type="checkbox" value="">Seats Available</label>
				</div>
				<div class="form-group">
					<label for="keyword">Keyword:</label>
					<input type="text" class="class-num pull-right keyword">
				</div>
				<div class="form-group">
					<label for="class-num">Class Number:</label>
					<select class="form control" id="course-num-ops">
						<option>=</option>
						<option>&gt;=</option>
						<input type="text" class="class-num pull-right keyword">
					</select>
				</div>
				<div class="form-group">
					<label for="subject">Subject:</label>
					<select class="form-control" id="subject">
						<option>Computer Science</option>
					</select>
				</div>
				<div class="form-group">
					<label for="gen-ed-cat">Gen Ed Category:</label>
					<select class="form-control" id="gen-ed-cat">
						<option>AL Literature</option>
					</select>
				</div>
				<div class="form-group">
					<label for="session">Session</label>
					<select class="form-control" id="session">
						<option>*University</option>
					</select>
				</div>
				<div class="form-group">
					<label for="instr-mode">Mode of Instruction</label>
					<select class="form-control" id="instr-mode">
						<option>Classroom</option>
					</select>
				</div>
				<div class="center-block">
					<button id="singlebutton" name="singlebutton" class="btn btn-primary center-block" style="background-color:#354066;">
						Search <span class="glyphicon glyphicon-search" style="margin-left:5px;margin-bottom:5px;"></span>
					</button>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<SearchRadios />,
	document.getElementById('search-radios')
);
