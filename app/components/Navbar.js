import React from 'react';

class navBarButton extends React.Component {
	refresh() {
		if (this.state.flag !== undefined)
		this.state.flag(this.state);
	}

	handleClick(e) {
		e.preventDefault();
		var bang = !this.state.testShow;
		this.setState({ testShow: bang});
		this.refresh();
		//GoToHTML file with data text
	}

	render() {
		return(
			<li><a href="#">"dataVariable"</a></li>
		);
	}
}

export default class SideNav extends React.Component {
	render() {
		return (
			<div id="sidebar-container">
				<img src="img/umass_logo.png" alt="UMass Logo" width="102" height="100" id="logo"></img>
				<span id="spire"> InSPIRE</span>
				<br /><br />
				<ul className="nav">
					<navBarButton data="Class Schedule"></navBarButton>
					<navBarButton data="Final Exam Schedule"></navBarButton>
					<navBarButton data="Finances"></navBarButton>
					<navBarButton data="Housing"></navBarButton>
					<navBarButton data="Logout"></navBarButton>
				</ul>
				<div id="rotate-container">
					<div id="trapezoid">
						<span className="glyphicon glyphicon-chevron-down" id="glyph-scaling"></span>
					</div>
				</div>
			</div>
		)
	}
	componentDidMount() {
		this.setState({testShow : false});
	}
}
