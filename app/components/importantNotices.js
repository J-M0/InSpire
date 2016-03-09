import React from 'react';
import {getStudentInfo, getEnrolledCourses, queryCourses} from '../server';


export default class SideNav extends React.Component {
    render() {
      return (
	<div id="sidebar-container">
			<div id="rotate-container">
				<div id="trapezoid">
					<span class="glyphicon glyphicon-chevron-up" id="glyph-scaling"></span>
				</div> <!-- End of trapezoid -->
			</div> <!-- End of rotate-container -->
		</div> <!-- End of sidebar-container -->
		<div class="row" id="top_container">
			<div class="col-md-3" id="side-navbar">
				<div class="panel panel-default" id="todo">
					<div class="panel-heading">Important Notices</div>
					<div class="panel-body">
						<a href="#fafsa">2016-2017 FAFSA</a><br>
						<a href="#grad">Graduation Paperwork</a><br>
						<a href="#etc" data-toggle="modal" data-target="#todoModal">See More...</a><br>
						<!-- todo modal stuff goes here -->
						<div id="todoModal" class="modal fade" role="dialog">
							<div class="modal-dialog modal-lg">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal">&times;</button>
										<h4 class="modal-title" style="color:#354066;">Todo list & More</h4>
									</div>
									<div class="modal-body">
										<div class="panel panel-default" id="todo-list-items">
											<div class="panel-heading" style="color:#354066;"><span class="glyphicon glyphicon-ok-circle" style="color:#354066;"></span> Todo Items</div>
											<div class="panel-body">
												<table class="table">
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
											<div class="panel-heading" style="color:#354066;"><span class="glyphicon glyphicon-remove-circle" style="color:#354066;"></span> Holds</div>
											<p style="margin-left:20px;">There are currently no holds on your account.</p>
											<br>
											<div class="panel-heading" style="color:#354066;"><span class="glyphicon glyphicon-gift" style="color:#354066;"></span> Financial Aid</div>
											<div class="panel-body">
												<p>Select the year of aid you wish to view.</p>
												<table class="table">
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
									<div class="modal-footer">
										<button class="btn btn-default pull-left" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>
						<!-- todo modal stuff ends here -->
					</div> <!-- End of todo panel body -->
				</div> <!-- End of todo panel -->
				<div class="panel panel-default" id="search-radios">
					<div class="panel-heading" style="color:#354066;">Class Search Filters</div>
					<div class="checkbox">
						<label><input type="checkbox" value="">Seats Available</label>
					</div>
					<div class="form-group">
						<label for="keyword">Keyword:</label>
						<input type="text" class="class-num pull-right" id="keyword">
					</div>
					<div class="form-group">
						<label for="class-num">Class Number:</label>
						<select class="form control" id="course-num-ops">
							<option>=</option>
							<option>>=</option>
						<input type="text" class="class-num pull-right" id="keyword">
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
				</div> <!-- End of search panel -->
			</div> <!-- End col-md-3 side-navbar -->
			<div class="col-md-9" id="calendar">
				<div class="row">
					<div class="col-md-3" id="monday">
						<div class="thumbnail"><span class="day">Monday</span></div>
						<div class="thumbnail"><span class="time-55">8:00 - 8:50</span></div>
						<div class="thumbnail"><span class="time-55">9:05 - 9:55</span></div>
						<div class="thumbnail"><span class="time-55">10:10 - 11:00</span></div>
						<div class="thumbnail"><span class="time-55">11:15 - 12:05</span></div>
						<div class="thumbnail"><span class="time-55">12:20 - 1:10</span></div>
						<div class="thumbnail"><span class="time-55">1:25 - 2:15</span></div>
						<div class="thumbnail"><span class="time-75">2:30 - 3:45</span></div>
						<div class="thumbnail"><span class="time-75">4:00 - 5:15</span></div>
						<div class="thumbnail"><span class="time-75">5:30 - 6:45</span></div>
					</div> <!-- End of monday -->
					<div class="col-md-3" id="tuesday">
						<div class="thumbnail"><span class="day">Tuesday</span></div>
						<div class="thumbnail"><span class="time-75">8:30 - 9:45</span></div>
						<div class="thumbnail"><span class="time-75">10:00 - 11:15</span></div>
						<div class="thumbnail"><span class="time-75">11:30 - 12:45</span></div>
						<div class="thumbnail"><span class="time-75">1:00 - 2:15</span></div>
						<div class="thumbnail"><span class="time-75">2:30 - 3:45</span></div>
						<div class="thumbnail"><span class="time-75">4:00 - 5:15</span></div>
						<div class="thumbnail"><span class="time-75">5:30 - 6:45</span></div>
					</div> <!-- End of tuesday -->
					<div class="col-md-3" id="wednesday">
						<div class="thumbnail"><span class="day">Wednesday</span></div>
						<div class="thumbnail"><span class="time-55">8:00 - 8:50</span></div>
						<div class="thumbnail"><span class="time-55">9:05 - 9:55</span></div>
						<div class="thumbnail"><span class="time-55">10:10 - 11:00</span></div>
						<div class="thumbnail"><span class="time-55">11:15 - 12:05</span></div>
						<div class="thumbnail"><span class="time-55">12:20 - 1:10</span></div>
						<div class="thumbnail"><span class="time-55">1:25 - 2:15</span></div>
						<div class="thumbnail"><span class="time-75">2:30 - 3:45</span></div>
						<div class="thumbnail"><span class="time-75">4:00 - 5:15</span></div>
						<div class="thumbnail"><span class="time-75">5:30 - 6:45</span></div>
					</div> <!-- End of wednesday -->
					<div class="col-md-3" id="thursday">
						<div class="thumbnail"><span class="day">Thursday</span></div>
						<div class="thumbnail"><span class="time-75">8:30 - 9:45</span></div>
						<div class="thumbnail"><span class="time-75">10:00 - 11:15</span></div>
						<div class="thumbnail"><span class="time-75">11:30 - 12:45</span></div>
						<div class="thumbnail"><span class="time-75">1:00 - 2:15</span></div>
						<div class="thumbnail"><span class="time-75">2:30 - 3:45</span></div>
						<div class="thumbnail"><span class="time-75">4:00 - 5:15</span></div>
						<div class="thumbnail"><span class="time-75">5:30 - 6:45</span></div>
					</div> <!-- End of thursday -->
					<div class="col-md-3" id="friday">
						<div class="thumbnail"><span class="day">Friday</span></div>
						<div class="thumbnail"><span class="time-55">8:00 - 8:50</span></div>
						<div class="thumbnail"><span class="time-55">9:05 - 9:55</span></div>
						<div class="thumbnail"><span class="time-55">10:10 - 11:00</span></div>
						<div class="thumbnail"><span class="time-55">11:15 - 12:05</span></div>
						<div class="thumbnail"><span class="time-55">12:20 - 1:10</span></div>
						<div class="thumbnail"><span class="time-55">1:25 - 2:15</span></div>
						<div class="thumbnail"><span class="time-75">2:30 - 3:45</span></div>
						<div class="thumbnail"><span class="time-75">4:00 - 5:15</span></div>
						<div class="thumbnail"><span class="time-75">5:30 - 6:45</span></div>
					</div> <!-- End of friday -->
				</div> <!-- End of col-md-9 row -->
			</div> <!-- End of col-md-9 -->
		</div>
     )
   }
}
