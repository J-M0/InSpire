import React from 'react';

export default class SideNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
		getEnrolledCourses(this.state.userId, (enrolled) => {
			this.setState({enrolled});
		});
	}

	refresh() {
		if (this.state.flag !== undefined)
			this.state.flag(this.state);
		getStudentInfo(this.state.userId, (userInfo) => {
			this.setState({userInfo});
		});
	}

	handleClick(e) {
		e.preventDefault();
		// TODO: Create modal for viewing possible classes of
		var bang = !this.state.testShow;
		this.setState({ testShow: bang});
		this.refresh();
	}

    render() {
      return (
        <div id="sidebar-container">
			     <img src="img/umass_logo.png" alt="UMass Logo" width="102" height="100" id="logo"/>
			     <span id="spire"> InSPIRE</span>
			     <ul class="nav">
				       <li>
					          <a href="#">Student Home <span class="glyphicon glyphicon-chevron-left"></span></a>
				       </li>
				       <li>
					          <a href="#">Enrollment <span class="glyphicon glyphicon-chevron-down"></span></a>
				       </li>
				       <ui class="nav">
					          <li><a href="#">Class Schedule</a></li>
					          <li><a href="#">Final Exam Schedule</a></li>
				       </ui>
				       <li>
					          <a href="#">Finances <span class="glyphicon glyphicon-chevron-left"></span></a>
				       </li>
				       <li>
					          <a href="#">Housing <span class="glyphicon glyphicon-chevron-left"></span></a>
				       </li>
				       <li>
					          <a href="#">Log Out <span class="glyphicon glyphicon-log-out"></span></a>
				       </li>
			    </ul>
			    <div id="rotate-container">
				      <div id="trapezoid">
					          <span class="glyphicon glyphicon-chevron-down" id="glyph-scaling"></span>
				      </div>
          </div>
		</div>
     )
   }
   componentDidMount() {
		queryCourses(this.state.day, this.state.start, this.state.end, (available) => {
			this.setState({available});
		});
		this.setState({testShow : false});
	}
}
