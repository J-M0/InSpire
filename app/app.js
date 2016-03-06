import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendarBlock';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

class ProfilePage extends React.Component {
	render() {
		return (
			<p>This is the profile page for a user with ID {this.props.params.id}</p>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
}

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			{/* show the feed at /*/}
			<IndexRoute component={Calendar} />
			<Route path="/profile/:id" component={ProfilePage} />
		</Route>
	</Router>
),document.getElementById('calendar'));
