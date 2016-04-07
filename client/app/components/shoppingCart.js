import React from 'react';
import Modal from './modal';
import {getShoppingCart} from '../server';

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.setState({morInfo: false});
  }

  refresh() {
  }

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.refresh();
  }

  handleRemoveClick(e) {
    e.preventDefault();
    this.refresh();
  }

  render() {
    var body;

    if (this.state.cart !== undefined) {
      if (this.state.cart.length !== 0) {
        body =
        <div>
          {this.state.cart.map((courses, i) => { var v = i.toString(); return (
            <div>
              <li className="list-group-item shop-cart-item" key={i} onClick={(e) => this.handleClick(e)}>{courses.courseNumber} - {courses.courseName}
                <span className="glyphicon glyphicon-remove pull-right shop-cart-item" style={{color: '#354066'}} onClick={(e) => this.handleRemoveClick(e)}></span>
                <Modal type="ClassInformation" data={courses} id={"CourseInfoModal" + v}/>
                <a className="btn shop-cart-item" key={i} data-toggle="modal" href={"#CourseInfoModal" + v} style={{textAlign: 'right', width: '100%', fontSize: '1.6vh'}}>...More info</a></li>
            </div>
          );})}
        </div>
      } else {
        body = "Your shopping cart is empty!";
      }
    }


    return(
      <div id="shopping-cart" className="panel panel-default">
        <div className="panel-heading" style={{color:'#354066'}}>
          Shopping Cart
        </div>
          <ul className="list group">
            {body}
          </ul>
        <div className="center-block">
          <button name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor:'#354066', align:'center', marginTop:'5px'}}>
            Enroll
          </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    getShoppingCart(this.props.params.id, (cart) =>  {
      this.setState({cart});
      this.setState({moreInfo: !this.state.moreInfo});
    });
  }
}
