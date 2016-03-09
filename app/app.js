import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendarBlock';
import SideNav from './components/Navbar';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class App extends React.Component {
	render() {
		return (
			<div>
				{this.props.Calendar}
				{/*this.props.SideNav*/}
			</div>
		);
	}
}

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			{<IndexRoute components={{Calendar}}/>}
			<Route path="/profile/:id" components={{Calendar, SideNav}} />
		</Route>
	</Router>
),document.getElementById('calendar'));
