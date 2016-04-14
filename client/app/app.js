import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendarBlock';
/*import SideNav from './components/navbar';*/
import ShoppingCart from './components/shoppingCart';
import UserInfo from './components/userInfo';
import SearchPanel from './components/searchPanel';
import ErrorBanner from './components/errorbanner';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class App extends React.Component {
  var reloadListeners = [];
  subscribe(component) {
    console.log(component);
  }

  pageReload() {
  }

  render() {
    // Default user, to be removed
    var userId = {id: this.props.params.id};

    if (userId.id === undefined) {
      userId = {id:'12345678'};
    }

    return (
      <div className="row" id="top_container">

        {/*this.props.SideNav*/}

        <div className="col-md-12">
          <ErrorBanner />
        </div>

        <div className="col-md-3" id="left-side">
          <UserInfo params={userId} subscribe={this.subscribe} reload={this.pageReload}/>
          <ul id="menu-tabs" className="nav nav-pills search-tabs" data-tabs="tab-content">
            <li className="active"><a data-toggle="tab" href="#search">Search</a></li>
            <li><a data-toggle="tab" href="#cart">Cart</a></li>
          </ul>
          <div className="tab-content">
            <div id="search" className="tab-pane fade in active">
              <SearchPanel view={'search'} subscribe={this.subscribe} reload={this.pageReload}/>
            </div>

            <div id="cart" className="tab-pane fade in">
              <ShoppingCart params={userId} subscribe={this.subscribe} reload={this.pageReload}/>
            </div>
          </div>
        </div>

        <div className="col-md-9" id="calendar">
          <Calendar params={userId} subscribe={this.subscribe} reload={this.pageReload}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute/>
      <Route path="/user/:id"/>
    </Route>
  </Router>
),document.getElementById('wrapperContainer'));
