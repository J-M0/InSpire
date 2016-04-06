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
    return (
      <div className="panel panel-default" id="search-results">
        <div className="panel-heading" style={{color: '#354066'}}>
          <div onClick={(e) => this.handleBackClick(e)}>
            <span className="glyphicon glyphicon-chevron-left" style={{color: '#354066'}}></span> Search Results
          </div> 
        </div>
        <ul className="list group">
          {data.results.map((result, i) => {
            return <SearchResultItem key={i} id={i} data={result} />
          })}
        </ul>
      </div>
    );
  }
}
