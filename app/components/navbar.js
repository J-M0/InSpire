import React from 'react';
//import BlankHTML from '../../build/blankHTML.html'
import {Link} from 'react-router';

class NavbarExtendButton extends React.Component {
  render() {
		var faceOut = {
			transition: 'transform .15s',
			marginRight: '-8px',
			paddingBottom: '30px'
		};

		if (this.props.face !== undefined) {
			faceOut.transform = (this.props.face) ? 'rotate(0deg)' : 'rotate(180deg)';
		}

    return(
      <div id="rotate-container">
        <div id="trapezoid" onClick={(e)=>this.props.onClick(e)}>
					<div id="rotate-chevron-container" style={faceOut}>
            <span className="glyphicon glyphicon-chevron-down" id="glyph-scaling"></span>
					</div>
        </div>
      </div>
    );
  }
}

class NavbarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render()
  {
    var text = this.props.data;
    return(
      <li><Link to={"#"/*BlankHTML*/}>{text}</Link></li>
    );
  }
}

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state=props;
  }

  expand(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({expand: !this.state.expand});
  }

  render() {
    var shamt = {left: '-15%'};
		var sz = {width: '95%'};

    if (this.state.expand == true) {
      shamt = {left: '0%'};
			sz = {width: '100%'};
    }

    return (
      <div id="sidebar-container" style={shamt}>
        <img src="img/umass_logo.png" alt="UMass Logo" width="100" height="100" style={{margin: '10px'}} id="logo"></img>
        <span id="spire"> InSPIRE</span>
        <br /><br />
        <ul className="nav" style={sz}>
          <NavbarButton data={"Class Schedule"} />
          <NavbarButton data={"Class Schedule"} />
          <NavbarButton data={"Final Exam Schedule"} />
          <NavbarButton data={"Finances"} />
          <NavbarButton data={"Housing"} />
          <NavbarButton data={"Logout"} />
        </ul>
        <NavbarExtendButton onClick={(e)=>this.expand(e)} face={this.state.expand}/>
      </div>
    )
  }

  componentDidMount() {
    this.setState({expand: false});
  }
}
