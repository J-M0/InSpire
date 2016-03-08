import React from 'react';
import ReactDom from 'react-dom';
import SearchRadios from './searchRadios';
import SearchResultList from './searchResultList';

export default class SearchPanel extends React.Component {
	render() {
		return(
			<div>
				<SearchRadios />
				<SearchResultList />
			</div>
		);
	}
}
