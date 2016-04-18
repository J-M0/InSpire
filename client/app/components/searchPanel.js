import React from 'react';
import SearchResultList from './searchResultList';
import {getSearchResults} from '../server';

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { view: 'search' };
  }

  setView(newView) {
    this.setState({ view: newView });
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
        contents = <SearchResultList data={data.results} setPanelView={(v) => this.setView(v)}/>;
        break;
    }

    return contents;
  }
}

class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="panel panel-default" id="search-results">
        <div className="panel-heading" style={{color: '#354066'}}>
          Loading...
        </div>
      </div>
    );
  }
}

class SearchRadios extends React.Component {

  handleSubmit(clickEvent) {
    clickEvent.preventDefault();
    var form = clickEvent.target;
    var searchOptions = {
      "seatsAvail": form.seats.checked,
      "keyword": form.keyword.value,
      "classNum": form.classNum.value,
      "classNumOps": form.classNumOps.value,
      "subject": form.subject.value,
      "genEdCat": form.genEdCat.value,
      "session": form.session.value,
      "instructionMode": form.instrMode.value
    };
    this.props.searchClasses(searchOptions);
  }

  render() {
    return (
      <div className="panel panel-default" id="search-radios">
        <div className="panel-heading" style={{color: '#354066'}}>Class Search Filters</div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="checkbox">
            <label><input type="checkbox" defaultChecked id="seats"/>Show Open Courses Only</label>
          </div>
          <div className="form-group">
            <label htmlFor="keyword">Keyword:</label>
            <input type="text" id="keyword" className="pull-right keyword" />
          </div>
          <div className="form-group">
            <label htmlFor="classNum">Class Number:</label>
            <select className="form control" id="classNumOps">
              <option>{"="}</option>
              <option>&gt;=</option>
            </select>
            <input type="text" id="classNum" className="pull-right keyword" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <select className="form-control" id="subject">
              <option>&nbsp;</option>
              <option>Computer Science</option>
              <option>Computer Engineering</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="genEdCat">Gen Ed Category:</label>
            <select className="form-control" id="genEdCat">
              <option>&nbsp;</option>
              <option>AL Literature</option>
              <option>History</option>
              <option>Biology</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="session">Session</label>
            <select className="form-control" id="session">
              <option>&nbsp;</option>
              <option>*University</option>
              <option>CPE Summer Session 1</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="instrMode">Mode of Instruction</label>
            <select className="form-control" id="instrMode">
              <option>&nbsp;</option>
              <option>Classroom</option>
              <option>Online</option>
            </select>
          </div>

          <div className="center-block">
            <button id="singlebutton" name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor: '#354066'}} type="submit">
              Search <span className="glyphicon glyphicon-search" style={{marginLeft: '5px', marginBottom: '5px'}}></span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
