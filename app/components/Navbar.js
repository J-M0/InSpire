import React from 'react';

export default class SideNav extends React.Component {
    render() {
      return (
        <div id="sidebar-container">
			     <img src="img/umass_logo.png" alt="UMass Logo" width="102" height="100" id="logo">
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
}
