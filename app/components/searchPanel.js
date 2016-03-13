import React from 'react';
import ReactDOM from 'react-dom';
import SearchRadios from './searchRadios';
import SearchResultList from './searchResultList';
import Modal from './modal';
import ClassInfo from './classInfo';
import SearchResultItem from './searchResultItem';
import {getSearchResults} from '../server';

export default class SearchPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.props.view;
	}

	setView(newView) {
		this.setState({view: newView});
	}

	searchClasses(searchOptions) {
		var callbackFunction = (returnedResults) => {
			this.setState({results: returnedResults});
			this.setView('results');
		};
		this.setView('loading');
		getSearchResults(searchOptions, callbackFunction);
	}

	handleBackClick(clickEvent) {
		clickEvent.preventDefault();

		if(clickEvent.button === 0) {
			this.setView('search');
		}

	}

	render() {
		var contents;
		var data = this.state;
		switch(this.state.view) {
			case 'search':
				contents = <SearchRadios searchClasses={(ops) => this.searchClasses(ops)}/>;
				break;
			case 'loading':
				contents = <LoadingScreen />;
				break;
			case 'results':
				contents = <SearchResultList data={data.results} />;
				break;
		}

		return contents;
	}
}

class LoadingScreen extends React.Component {
	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading" style={{color: '#354066'}}>
					Loading
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<SearchPanel view={"search"} />,
	document.getElementById('search-panel')
);
