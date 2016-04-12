import React from 'react';
import Modal from './modal';
import {getShoppingCart} from '../server';

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    getShoppingCart(this.props.params.id, (cart) =>  {
      this.setState({cart});
    });
  }

  refresh() {
  }

  handleClick(e) {
    e.preventDefault();
    console.log("handleClick");
    this.refresh();
  }

  handleRemoveClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleRemoveClick");
    this.refresh();
  }

  render() {
    var body;

    if (this.state.cart !== undefined) {
      if (this.state.cart.length !== 0) {
        body =
          this.state.cart.map((courses, i) => { 
            return (
              <li className="list-group-item shop-cart-item" key={i} onClick={(e) => this.handleClick(e)}>
                <span>{courses.courseNumber} - {courses.courseName}</span>
                {/*
								   To Do: Make the X turn white when hovered - easy
                          Add remove from cart logic - easy
                          Add enroll from cart logic - easy
                          Add batch enrollment from cart logic - not so easy
                */}
                <span className="glyphicon glyphicon-remove pull-right shop-cart-item" style={{color: '#354066'}} onClick={(e) => this.handleRemoveClick(e)}/>
                <Modal type="ClassInformation" data={courses} id={"CourseInfoModal" + i}/>
                <a className="shop-cart-item" key={i} data-toggle="modal" href={"#CourseInfoModal" + i}>More info</a>
              </li>
            );
          })
      } else {
        body = "Your shopping cart is empty!";
      }
    }

    return(
      <div id="shopping-cart" className="panel panel-default">
        <div className="panel-heading" style={{color:'#354066'}}>
          Shopping Cart
        </div>
        <div className="panel-body" style={{padding: '0px'}}>
          <ul className="list group">
            {body}
          </ul>
        </div>
        <button name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor:'#354066', marginTop:'5px'}}>
          Enroll
        </button>
      </div>
    );
  }
}
