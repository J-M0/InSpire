import React from "react";
import SearchResultItem from './searchResultItem';

export default class SearchResultList extends React.Component {
  constructor(props){
    super(props);

    this.state = {results: props.data};
  }

  handleBackClick(clickEvent) {
    clickEvent.preventDefault();

    if(clickEvent.button === 0) {
      this.props.setPanelView('search');
    }
  }

  render() {
    var data = this.state;
    var body;
    if(data.results.length === 0) {
        body = (
            <p id="search-result-empty">No matching classes were found</p>
        );
    } else {
        body = (
            <ul className="list group">
              {data.results.map((result, i) => {
                return <SearchResultItem key={i} id={i} data={result} />
              })}
            </ul>
        );
    }
    return (
      <div className="panel panel-default" id="search-results">
        <div className="panel-heading" style={{color: '#354066'}}>
          <div onClick={(e) => this.handleBackClick(e)}>
            <span className="glyphicon glyphicon-chevron-left" style={{color: '#354066'}}></span> Search Results
          </div>
        </div>
        {body}
      </div>
    );
  }
}
