import React from 'react';
import ReactDOM from 'react-dom';
import SearchRadios from './searchRadios';
import SearchResultList from './searchResultList';

export default class SearchPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {showResults: this.props.showResults};
	}

	setView(view) {
		if(view === "results") {
			this.setState({showResults: true});
		} else if(view === "search") {
			this.setState({showResults: false});
		}
	}

	render() {
		if(this.state.showResults) {
			return(
				<div>
					<SearchResultList setPanelView={(v) => this.setView(v)}/>
				</div>
			);
		} else {
			return (
				<div>
					<SearchRadios setPanelView={(v) => this.setView(v)}/>
				</div>
			)
		}
	}
}

ReactDOM.render(
	<SearchPanel showResults={false} />,
	document.getElementById('search-panel')
);
