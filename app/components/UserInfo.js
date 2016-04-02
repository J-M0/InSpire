import React from 'react';
import Modal from './modal';
import {getStudentInfo} from '../server';


class LogOutButton extends React.Component {
  render()
  {
    return(
      <a href="#">Logout</a>
    );
  }
}

class FinalExamButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render()
  {
    if (this.props.data !== undefined){
      var data = this.props.data;
      var modalId = "FinalExamModal" + this.props.id;
    }

    return(
      <div>
        <Modal data={data} modalType="Final Exam Schedule" id={modalId} />
        <a data-toggle="modal" href={"#" + modalId}>Final Exam Schedule</a>
      </div>
    );
  }
}

class TranscriptButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render()
  {
    if (this.state !== undefined){
      var data = this.props.data;
      var modalId = "UnofficialTranscriptModal" + this.state.id;
    }
    return(
      <div>
        <Modal data={data} modalType="UnofficialTranscript" id={modalId} />
        <a href="#">Unofficial Transcript</a>
      </div>
    );
  }
}

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  refresh() {
    if (this.props.params !== undefined)
    getStudentInfo(this.props.params.id, (userInfo) => {
      this.setState({info:userInfo});
    });
  }

  componentDidMount(){
    this.refresh();
  }

  render() {
    if (this.state.info !== undefined){
      var studentID = this.state.params.id;
      var studentName = this.state.info.firstName + " " + this.state.info.lastName;
      var data = this.state.info;
    }

    return (
      <div className="panel panel-default" id="userinfo">
        <div className="panel-heading">
          <strong>{studentName} ({studentID})</strong>
        </div>
        <div className="panel-body">
          <FinalExamButton data={data} id={studentID} />
          <TranscriptButton />
          <LogOutButton />
        </div>
      </div>
    );
  }
}
