import React from 'react';
import {getStudentInfo} from '../server';


class UserInfoButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render()
  {
    var text = this.props.data;
    return(
      <li><a href={'../../Modal would pop up.html'}>{text}</a></li>
    );
  }
}

export default class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  refresh() {
     getStudentInfo(this.props.params.id, (userInfo) => {
      this.setState({userInfo});
    });
  }

    render() {
      //var Si = this.state.userInfo.studentId;
      return (
				<div className="panel panel-default" id="todo">
					<div className="panel-heading">User Info</div>
					<div className="panel-body">
            Name <br /> StudentId <br />
            <UserInfoButton data={"Final Exam Schedule"} />
            <UserInfoButton data={"Logout"} />
					</div>
				</div>
     )
}
}
