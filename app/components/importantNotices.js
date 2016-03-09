import React from 'react';
import {getStudentInfo, getEnrolledCourses, queryCourses} from '../server';


export default class SideNav extends React.Component {
    render() {
      return (
	<div id="sidebar-container">
			<div id="rotate-container">
				<div id="trapezoid">
					<span className="glyphicon glyphicon-chevron-up" id="glyph-scaling"></span>
				</div>
			</div>
		</div>
		<div className="row" id="top_container">
			<div className="col-md-3" id="side-navbar">
				<div className="panel panel-default" id="todo">
					<div className="panel-heading">Important Notices</div>
					<div className="panel-body">
						<a href="#fafsa">2016-2017 FAFSA</a><br />
						<a href="#grad">Graduation Paperwork</a><br />
						<a href="#etc" data-toggle="modal" data-target="#todoModal">See More...</a><br />
						<div id="todoModal" className="modal fade" role="dialog">
							<div className="modal-dialog modal-lg">
								<div className="modal-content">
									<div className="modal-header">
										<button type="button" className="close" data-dismiss="modal">&times;</button>
										<h4 className="modal-title" style="color:#354066;">Todo list & More</h4>
									</div>
									<div className="modal-body">
										<div className="panel panel-default" id="todo-list-items">
											<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-ok-circle" style="color:#354066;"></span> Todo Items</div>
											<div className="panel-body">
												<table className="table">
													<thead>
														<tr>
															<th>Todo Item</th>
															<th>Due Date</th>
															<th>Status</th>
															<th>Institution</th>
															<th>Administrative Function</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>2016-2017 FAFSA</td>
															<td>03/01/2015</td>
															<td>Received</td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid</td>
														</tr>
														<tr>
															<td>Graduation Paperwork</td>
															<td>03/01/2015</td>
															<td>Received</td>
															<td>U. of Massachusetts Amherst</td>
															<td>Graduate Program</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-remove-circle" style="color:#354066;"></span> Holds</div>
											<p style="margin-left:20px;">There are currently no holds on your account.</p>
											<br />
											<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-gift" style="color:#354066;"></span> Financial Aid</div>
											<div className="panel-body">
												<p>Select the year of aid you wish to view.</p>
												<table className="table">
													<thead>
														<tr>
															<th>Aid Year</th>
															<th>Institution</th>
															<th>Aid Year Description</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td><a href="#">2016</a></td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid Year 2015-2016</td>
														</tr>
														<tr>
															<td><a href="#">2015</a></td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid Year 2014-2015</td>
														</tr>
														<tr>
															<td><a href="#">2014</a></td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid Year 2013-2014</td>
														</tr>
														<tr>
															<td><a href="#">2013</a></td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid Year 2012-2013</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button className="btn btn-default pull-left" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<div className="panel panel-default" id="search-radios">
					<div className="panel-heading" style="color:#354066;">Class Search Filters</div>
					<div className="checkbox">
						<label><input type="checkbox" value=""/>Seats Available</label>
					</div>
					<div className="form-group">
						<label for="keyword">Keyword:</label>
						<input type="text" className="class-num pull-right" id="keyword"/>
					</div>
					<div className="form-group">
						<label for="class-num">Class Number:</label>
						<select className="form control" id="course-num-ops">
							<option>=</option>
							<option>>=</option>
						<input type="text" className="class-num pull-right" id="keyword"/>
					</div>
					<div className="form-group">
						<label for="subject">Subject:</label>
						<select className="form-control" id="subject">
							<option>Computer Science</option>
						</select>
					</div>
					<div className="form-group">
						<label for="gen-ed-cat">Gen Ed Category:</label>
						<select className="form-control" id="gen-ed-cat">
							<option>AL Literature</option>
						</select>
					</div>
					<div className="form-group">
						<label for="session">Session</label>
						<select className="form-control" id="session">
							<option>*University</option>
						</select>
					</div>
					<div className="form-group">
						<label for="instr-mode">Mode of Instruction</label>
						<select className="form-control" id="instr-mode">
							<option>Classroom</option>
						</select>
					</div>
					<div className="center-block">
						<button id="singlebutton" name="singlebutton" className="btn btn-primary center-block" style="background-color:#354066;">
							Search <span className="glyphicon glyphicon-search" style="margin-left:5px;margin-bottom:5px;"></span>
						</button>
					</div>
				</div>
			</div>
			<div className="col-md-9" id="calendar">
				<div className="row">
					<div className="col-md-3" id="monday">
						<div className="thumbnail"><span className="day">Monday</span></div>
						<div className="thumbnail"><span className="time-55">8:00 - 8:50</span></div>
						<div className="thumbnail"><span className="time-55">9:05 - 9:55</span></div>
						<div className="thumbnail"><span className="time-55">10:10 - 11:00</span></div>
						<div className="thumbnail"><span className="time-55">11:15 - 12:05</span></div>
						<div className="thumbnail"><span className="time-55">12:20 - 1:10</span></div>
						<div className="thumbnail"><span className="time-55">1:25 - 2:15</span></div>
						<div className="thumbnail"><span className="time-75">2:30 - 3:45</span></div>
						<div className="thumbnail"><span className="time-75">4:00 - 5:15</span></div>
						<div className="thumbnail"><span className="time-75">5:30 - 6:45</span></div>
					</div>
					<div className="col-md-3" id="tuesday">
						<div className="thumbnail"><span className="day">Tuesday</span></div>
						<div className="thumbnail"><span className="time-75">8:30 - 9:45</span></div>
						<div className="thumbnail"><span className="time-75">10:00 - 11:15</span></div>
						<div className="thumbnail"><span className="time-75">11:30 - 12:45</span></div>
						<div className="thumbnail"><span className="time-75">1:00 - 2:15</span></div>
						<div className="thumbnail"><span className="time-75">2:30 - 3:45</span></div>
						<div className="thumbnail"><span className="time-75">4:00 - 5:15</span></div>
						<div className="thumbnail"><span className="time-75">5:30 - 6:45</span></div>
					</div>
					<div className="col-md-3" id="wednesday">
						<div className="thumbnail"><span className="day">Wednesday</span></div>
						<div className="thumbnail"><span className="time-55">8:00 - 8:50</span></div>
						<div className="thumbnail"><span className="time-55">9:05 - 9:55</span></div>
						<div className="thumbnail"><span className="time-55">10:10 - 11:00</span></div>
						<div className="thumbnail"><span className="time-55">11:15 - 12:05</span></div>
						<div className="thumbnail"><span className="time-55">12:20 - 1:10</span></div>
						<div className="thumbnail"><span className="time-55">1:25 - 2:15</span></div>
						<div className="thumbnail"><span className="time-75">2:30 - 3:45</span></div>
						<div className="thumbnail"><span className="time-75">4:00 - 5:15</span></div>
						<div className="thumbnail"><span className="time-75">5:30 - 6:45</span></div>
					</div>
					<div className="col-md-3" id="thursday">
						<div className="thumbnail"><span className="day">Thursday</span></div>
						<div className="thumbnail"><span className="time-75">8:30 - 9:45</span></div>
						<div className="thumbnail"><span className="time-75">10:00 - 11:15</span></div>
						<div className="thumbnail"><span className="time-75">11:30 - 12:45</span></div>
						<div className="thumbnail"><span className="time-75">1:00 - 2:15</span></div>
						<div className="thumbnail"><span className="time-75">2:30 - 3:45</span></div>
						<div className="thumbnail"><span className="time-75">4:00 - 5:15</span></div>
						<div className="thumbnail"><span className="time-75">5:30 - 6:45</span></div>
					</div>
					<div className="col-md-3" id="friday">
						<div className="thumbnail"><span className="day">Friday</span></div>
						<div className="thumbnail"><span className="time-55">8:00 - 8:50</span></div>
						<div className="thumbnail"><span className="time-55">9:05 - 9:55</span></div>
						<div className="thumbnail"><span className="time-55">10:10 - 11:00</span></div>
						<div className="thumbnail"><span className="time-55">11:15 - 12:05</span></div>
						<div className="thumbnail"><span className="time-55">12:20 - 1:10</span></div>
						<div className="thumbnail"><span className="time-55">1:25 - 2:15</span></div>
						<div className="thumbnail"><span className="time-75">2:30 - 3:45</span></div>
						<div className="thumbnail"><span className="time-75">4:00 - 5:15</span></div>
						<div className="thumbnail"><span className="time-75">5:30 - 6:45</span></div>
					</div>
				</div>
			</div>
		</div>
     )
   }
}
