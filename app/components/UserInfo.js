import React from 'react';
import {getStudentInfo} from '../server';


class logOutButton extends React.Component {
  render()
  {
    return(
      <a href="#">Logout</a>
    );
  }
}

class finalExamButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render()
  {
    return(
      <a href="#">Final Exams</a>
    );
  }
}

class transcriptButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render()
  {
    return(
      <a href="#">Unofficial Transcript</a>
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
      var studentID = this.state.info.studentId;
      var studentName = this.state.info.firstName + " " + this.state.info.lastName;
    }
    return (
      <div className="panel panel-default" id="userinfo">

        <div className="panel-heading">
          <strong>{studentName} ({studentID})</strong>
        </div>

        <div className="panel-body">
          <transcriptButton />Unofficial Transcript
            <br />
          <finalExamButton />Final Exam
            <br />
          <logOutButton />Logout
        </div>
      </div>
    );
  }
}
