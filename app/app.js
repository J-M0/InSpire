import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendarBlock';
import SideNav from './components/navbar';
import ShoppingCart from './components/shoppingCart';
import ClassInfo from './components/classInfo';
import ImportantNotices from './components/importantNotices';
import SearchPanel from './components/searchPanel';
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
      <div className="row" id="top_container">

        //{this.props.SideNav}

        <div className="col-md-3" id="left-side">
          {this.props.ImportantNotices}
          <ul id="menu-tabs" className="nav nav-pills search-tabs" data-tabs="tab-content">
            <li className="active"><a data-toggle="tab" href="#search">Search</a></li>
            <li><a data-toggle="tab" href="#cart">Cart</a></li>
          </ul>
          <div className="tab-content">
            <div id="search" className="tab-pane fade in active">
              {this.props.SearchPanelWrapper}
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
    );
  }
}

class SearchPanelWrapper extends React.Component {
  render() {
    return <SearchPanel view={'search'} />
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* EXAMPLE: {{Calendar, SideNav, SearchPanel, etc., etc., etc.,}} */}
      <IndexRoute components={{Calendar, SideNav, ShoppingCart, ImportantNotices, ClassInfo, SearchPanelWrapper}}/>
      {/*DO NOT UNCOMMENT THE BELOW UNLESS YOUR NAME IS KEVIN CHAN */}
      {/*<Route path="/profile/:id" components={{Calendar, SideNav}} />*/}
    </Route>
  </Router>
),document.getElementById('wrapperContainer'));
