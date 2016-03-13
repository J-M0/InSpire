import React from 'react';

class navBarExtendButton extends React.Component {
	refresh() {
		if (this.state.flag !== undefined)
		this.state.flag(this.state);
	}

	handleClick(e) {
		e.preventDefault();
		e.stopPropagation();

		//Extend / contract menu - Not sure how to implement in React
		// If sidebar is previously hidden:
			// #sidebar-container {
			// 	visibility: visible;
			// }
			// #rotate-container {
			//     left: 74%;
			//   }
		// If sidebar is previously visible:
			// #sidebar-container {
			// 	visibility: hidden;
			// }
			// #rotate-container {
			//     left: -25%;
			//   }
	}

	render()
	{
		return(
			<div id="rotate-container">
				<div id="trapezoid">
					<span className="glyphicon glyphicon-chevron-down" id="glyph-scaling"></span>
				</div>
			</div>
		);
	}

}

class navBarButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = props;
	}

	refresh() { //Not sure what this does or if it's necessary
		if (this.state.flag !== undefined)
		this.state.flag(this.state);
	}

	handleClick(e) {
		e.preventDefault();
		var bang = !this.state.testShow;
		this.setState({ testShow: bang});
		this.refresh();
		//Go to blank HTML file with data text
	}

	render()
	{
		var text = this.props.data;
		return(
			<li><a href="#" onClick={e => this.handleClick(e)}>{text}</a></li>
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
					<navBarButton data={"Class Schedule"} />
					<navBarButton data={"Final Exam Schedule"} />
					<navBarButton data={"Finances"} />
					<navBarButton data={"Housing"} />
					<navBarButton data={"Logout"} />
				</ul>
				<navBarExtendButton />
			</div>
		)
	}
	componentDidMount() {
		this.setState({testShow : false}); //Not sure what this does or if it's necessary
	}
}
