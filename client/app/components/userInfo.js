import React from 'react';
import Modal from './modal';
import {getStudentInfo} from '../server';
import {ResetDatabase} from '../resetdb';


class LogOutButton extends React.Component {
  render()
  {
    return(
      <a href="#">Logout</a>
    );
  }
}

class FinalExamButton extends React.Component {
  render() {
    var modal;

    if (this.props.data !== undefined && this.props.id !== undefined) {
      var data = this.props.data;
      var modalId = "FinalExamModal" + this.props.id;
      modal = <Modal data={data} type="FinalExamSchedule" id={modalId} />
    }
    return(
      <div>
        <a data-toggle="modal" href={"#" + modalId}>Final Exam Schedule</a>
        {modal}
      </div>
    );
  }
}

class TranscriptButton extends React.Component {
  render() {
    var modal;

    // Do not create the modal until we have the proper data
    if (this.props.data !== undefined && this.props.id !== undefined) {
      var data = this.props.data;
      var modalId = "UnofficialTranscriptModal" + this.props.id;
      modal = <Modal data={data} type="UnofficialTranscript" id={modalId} />
    }

    return(
      <div>
        <a data-toggle="modal" href={"#" + modalId}>Unofficial Transcript</a>
        {modal}
      </div>
    );
  }
}

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    getStudentInfo(this.props.params.id, (userInfo) => {
      this.setState({info:userInfo});
    });
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
          <TranscriptButton data={data} id={studentID} />
          <LogOutButton />
          <ResetDatabase />
        </div>
      </div>
    );
  }
}
