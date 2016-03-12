import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendarBlock';
import SideNav from './components/Navbar';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

/**
	* Waiting on course information modal as well as search before i can implement shopping cart
	* Stephen P
	*/

class App extends React.Component {
  render() {
  	// Default user, to be removed
  	if (this.props.Calendar.props.params.id === undefined)
    	this.props.Calendar.props.params.id=12345678;
  	return (
    	<div id="application_wrapper">
      	<div id="todoModal" className="modal fade" role="dialog">
        	<div className="modal-dialog modal-lg">
          	<div className="modal-content">
            	<div className="modal-header">
              	<button type="button" className="close" data-dismiss="modal">&times;</button>
              	<h4 className="modal-title" style={{color:'#354066'}}>Todo list & More</h4>
            	</div>
            	<div className="modal-body">
              	<div className="panel panel-default" id="todo-list-items">
                	<div className="panel-heading" style={{color:'#354066'}}>
                  	<span className="glyphicon glyphicon-ok-circle" style={{color:'#354066'}}></span> Todo Items
                	</div>
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
                	<div className="panel-heading" style={{color:'#354066'}}>
                  	<span className="glyphicon glyphicon-remove-circle" style={{color:'#354066'}}></span> Holds
                	</div>
                	<p style={{marginLeft:'20px'}}>There are currently no holds on your account.</p>
                	<br/>
                	<div className="panel-heading" style={{color:'#354066'}}>
                  	<span className="glyphicon glyphicon-gift" style={{color:'#354066'}}></span> Financial Aid
                	</div>
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
              	<button className="btn btn-default" data-dismiss="modal">Close</button>
            	</div>
          	</div>
        	</div>
      	</div>

      	<div className="modal fade" tabIndex="-1" role="dialog" id="classNameInfoModal">
        	<div className="modal-dialog">
          	<div className="modal-content">
            	<div className="modal-header">
              	<button type="button" className="close" data-dismiss="modal" aria-label="Close">
                	<span aria-hidden="true">&times;</span>
              	</button>
              	<h4 className="modal-title">More Info</h4>
            	</div>
            	<div className="modal-body">
              	<div className="panel panel-default" id="modal-list-items">
                	<div className="panel-heading" style={{color:'#354066'}}>
                  	<span className="glyphicon glyphicon-ok-circle" style={{color:'#354066'}}></span> className Information
                	</div>
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
                        	<td>!!className Number!!</td>
                        	<td>!!className section!!</td>
                        	<td>!!className units!!</td>
                        	<td>!!className enrolled!!</td>
                        	<td>!!className cap!!</td>
                      	</tr>
                    	</tbody>
                  	</table>
                	</div>

                	<div className="panel-heading" style={{color:'#354066'}}>
                  	<span className="glyphicon glyphicon-ok-circle" style={{color:'#354066'}}></span> More Information
                	</div>
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
                        	<td>!!className title!!</td>
                        	<td>!!className time!</td>
                        	<td>!!className location!!</td>
                        	<td>!!className instructor!!</td>
                      	</tr>
                    	</tbody>
                  	</table>
                	</div>

                	<div className="panel-heading" style={{color:'#354066'}}>
                  	<span className="glyphicon glyphicon-ok-circle" style={{color:'#354066'}}></span> className Description
                	</div>
                	<div className="panel-body">
                  	!!className Description!
                	</div>
              	</div>
            	</div>
            	<div className="modal-footer">
              	<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              	<button type="button" className="btn btn-primary">Add className</button>
            	</div>
          	</div>
        	</div>
      	</div>

        {this.props.SideNav}

      	<div className="row" id="top_container">
        	<div className="col-md-3" id="side-navbar">
          	<div className="panel panel-default" id="todo">
            	<div className="panel-heading">
              	Important Notices
            	</div>
            	<div className="panel-body">
              	<a href="#fafsa">2016-2017 FAFSA</a><br/>
              	<a href="#grad">Graduation Paperwork</a><br/>
              	<a href="#etc" data-toggle="modal" data-target="#todoModal">See More...</a><br/>
            	</div>
          	</div>

          	<ul id="menu-tabs" className="nav nav-pills search-tabs" data-tabs="tab-content">
            	<li className="active"><a data-toggle="tab" href="#search">Search</a></li>
            	<li><a data-toggle="tab" href="#results">Results</a></li>
            	<li><a data-toggle="tab" href="#cart">Cart</a></li>
          	</ul>

          	<div className="tab-content">
            	<div id="search" className="tab-pane fade in active">
              	<div className="panel panel-default" id="search-radios">
                	<div className="panel-heading" style={{color:'#354066'}}>
                  	className Search Filters
                	</div>
                	<div className="checkbox">
                  	<label><input type="checkbox" value=""/>Seats Available</label>
                	</div>
                	<div className="form-group">
                  	<label htmlFor="keyword">Keyword:</label>
                  	<input type="text" className="className-num pull-right keyword"/>
                	</div>
                	<div className="form-group">
                  	<label htmlFor="className-num">Course Number:</label>
                  	<select className="form control" id="course-num-ops">
                    	<option>=</option>
                    	<option>&gt;=</option>
                  	</select>
								  	<input type="text" className="className-num pull-right keyword"/>
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
                    	<option>History</option>
											<option>Biology</option>
                  	</select>
                	</div>
                	<div className="form-group">
                  	<label htmlFor="session">Session</label>
                  	<select className="form-control" id="session">
                    	<option>1</option>
											<option>2</option>
                  	</select>
                	</div>
                	<div className="form-group">
                  	<label htmlFor="instr-mode">Mode of Instruction</label>
                  	<select className="form-control" id="instr-mode">
                    	<option>Instructor</option>
											<option>Online</option>
                  	</select>
                	</div>
                	<div className="center-block">
                  	<button id="singlebutton" name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor:'#354066'}}>
                    	Search <span className="glyphicon glyphicon-search" style={{marginLeft:'5px', marginBottom:'5px'}}></span>
                  	</button>
                	</div>
              	</div>
            	</div>
            	<div id="results" className="tab-pane fade in">
              	<div className="panel panel-default" id="search-results">
                	<div className="panel-heading" style={{color:'#354066'}}>
                  	Search Results
                	</div>
                	<ul className="list group">
                  	<li className="list-group-item">
                    	<span className="glyphicon glyphicon-!!glyphicon!!" style={{color:'green'}}></span>
                    	!!className name!! <span className="glyphicon glyphicon-chevron-down pull-right"></span>
                    	<br/>
                    	!!className description!!
                    	<a className="btn" data-toggle="modal" href="#classNameInfoModal" style={{textAlign:'right'}}>...More info</a>
                  	</li>
                	</ul>
              	</div>
            	</div>
            	<div id="cart" className="tab-pane fade in">
              	<div id="shopping-cart" className="panel panel-default">
                	<div className="panel-heading" style={{color:'#354066'}}>
                  	Shopping Cart
                	</div>
                	<ul className="list group">
                  	<li className="list-group-item">
                    	<span className="glyphicon glyphicon-asterisk" style={{color:'green'}}></span>
                    	CS 326 - Web Programming
                  	</li>
                  	<li className="list-group-item">
                    	<span className="glyphicon glyphicon-play className-full-btn" style={{color:'blue'}}></span>
                    	CS 320 - Software Engineering
                  	</li>
                  	<li className="list-group-item">
                    	<span className="glyphicon glyphicon-stop" style={{color:'yellow'}}></span>
                    	CS 373 - Intro. to Computer Graphics
                  	</li>
                  	<li className="list-group-item">
                    	<span className="glyphicon glyphicon-asterisk" style={{color:'green'}}></span>
                    	CS 383 - Artificial Intelligence
                  	</li>
                	</ul>
                	<div className="center-block">
                  	<button name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor:'#354066', align:'center', marginTop:'5px'}}>
                    	Enroll
                  	</button>
                	</div>
              	</div>
            	</div>
          	</div>
        	</div>

        	<div className="col-md-9" id="calendar">
          	{this.props.Calendar}
        	</div>
      	</div>
			</div>
  	);
	}
}

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			{/* EXAMPLE: {{Calendar, SideNav, SearchPanel, etc., etc., etc.,}} */}
			<IndexRoute components={{Calendar}}/>
			<Route path="/profile/:id" components={{Calendar, SideNav}} />
		</Route>
	</Router>
),document.getElementById('wrapperContainer'));
