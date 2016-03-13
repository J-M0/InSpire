import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendarBlock';
import SideNav from './components/navbar';
import ShoppingCart from './components/shoppingCart';
import ClassInfo from './components/classInfo';
import ImportantNotices from './components/importantNotices';
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
    if (this.props.ShoppingCart.props.params.id === undefined)
      this.props.ShoppingCart.props.params.id=12345678;
    return (
      <div id="application_wrapper">

        {this.props.SideNav}

        <div className="row" id="top_container">
          <div className="col-md-3" id="side-navbar">
            {this.props.ImportantNotices}

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
                      <option>"="</option>
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
                {this.props.ShoppingCart}
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
      <IndexRoute components={{Calendar, SideNav, ShoppingCart, ImportantNotices, ClassInfo}}/>
      {/*DO NOT UNCOMMENT THE BELOW UNLESS YOUR NAME IS KEVIN CHAN */}
      {/*<Route path="/profile/:id" components={{Calendar, SideNav}} />*/}
    </Route>
  </Router>
),document.getElementById('wrapperContainer'));
