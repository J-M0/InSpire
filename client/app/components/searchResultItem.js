import React from 'react';
import Modal from './modal';
import ClassInfo from './classInfo';

export default class SearchResultItem extends React.Component {
  constructor(props) {
    super(props);

    var newState = props.data;
    newState.moreInfo = false;
    this.state = newState;
  }

  handleChevronClick(clickEvent) {
    clickEvent.preventDefault();

    if(clickEvent.button === 0) {
      this.setState({moreInfo: !this.state.moreInfo});
    }
  }

  render() {
    var data = this.state;
    var body;
    var chevron;
    var modalId = "ResultModal" + this.props.id;
    var description;

    if(data.description.length > 100) {
      description = data.description.substring(0, 100).concat("...");
    }

    if(this.state.moreInfo) {
      chevron = <span className="glyphicon glyphicon-chevron-down pull-right"></span>;
      body = (
        <div>
          <br />
          {description}
          <br />
          <a className="btn" data-toggle="modal" href={"#" + modalId} style={{textAlign: 'right', width: '100%', fontSize: '1.6vh'}}>...More info</a>
        </div>
      );
    } else {
      chevron = <span className="glyphicon glyphicon-chevron-left pull-right"></span>;
    }
    return (
      <li className="list-group-item">
        <Modal type="ClassInformation" data={data} id={modalId} />

        {/*<ClassInfo id={modalId} data={data}/>*/}
        <span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
        {data.courseNumber} - {data.courseName} <a href="#" onClick={(e) => this.handleChevronClick(e)}>{chevron}</a>
        {body}
      </li>
    );
  }
}
