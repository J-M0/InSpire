import React from 'react';

class NavbarExtendButton extends React.Component {
  render() {
    return(
      <div id="rotate-container">
        <div id="trapezoid" onClick={(e)=>this.props.onClick(e)}>
          <span className="glyphicon glyphicon-chevron-down" id="glyph-scaling"></span>
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

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
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
    if (this.state.expand == true) {
      shamt = {left: '0%'};
    }

    return (
      <div id="sidebar-container" style={shamt}>
        <img src="img/umass_logo.png" alt="UMass Logo" width="100" height="100" style={{margin: '10px'}} id="logo"></img>
        <span id="spire"> InSPIRE</span>
        <br /><br />
        <ul className="nav"> 
          <NavbarButton data={"Class Schedule"} />
          <NavbarButton data={"Class Schedule"} />
          <NavbarButton data={"Final Exam Schedule"} />
          <NavbarButton data={"Finances"} />
          <NavbarButton data={"Housing"} />
          <NavbarButton data={"Logout"} />
        </ul>
        <NavbarExtendButton onClick={(e)=>this.expand(e)}/>
      </div>
    )
  }

  componentDidMount() {
    this.setState({expand: false});
  }
}
