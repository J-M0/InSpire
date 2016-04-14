import React from 'react';
import Modal from './modal';
import {getShoppingCart, enrollInClass, dropCourseFromCart} from '../server';

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    getShoppingCart(this.props.params.id, (cart) =>  {
      this.setState({cart});
    });
  }

  refresh(courseId) {
    dropCourseFromCart(this.props.params.id, courseId, (cart) => {
			this.setState({cart});
		});
  }

  handleClick(e) {
    e.preventDefault();
    //console.log("handleClick");
  }

  handleRemoveClick(e, courseId) {
    e.preventDefault();
    e.stopPropagation();
    this.refresh(courseId);
  }

  addClass(course) {
    enrollInClass(this.props.params.id, course, () => {
      //location.reload();
    });
  }

  render() {
    var body;
    var enroll = 
      <button name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor:'#354066', marginTop:'5px'}}>
        Enroll
      </button>;

    if (this.state.cart !== undefined) {
      if (this.state.cart.length !== 0) {
        body =
          this.state.cart.map((course, i) => {
            return (
              <li className="list-group-item shop-cart-item" key={i} onClick={(e) => this.handleClick(e)}>
                <span>{course.courseNumber} - {course.courseName}</span>
                {/*
                          Add batch enrollment from cart logic - not so easy
                */}
                <span className="glyphicon glyphicon-remove pull-right " style={{color: '#FFFFFF'}} onClick={(e) => this.handleRemoveClick(e, course._id)}/>
                <Modal type="ClassInformation" data={course} id={"CourseInfoModal" + i} addClass={(c) => this.addClass(c)}/>
                <a key={i} data-toggle="modal" href={"#CourseInfoModal" + i}>More info</a>
              </li>
            );
          })
      } else {
        body = <div style={{textAlign: 'center', padding: '10px'}}>Your shopping cart is empty!</div>;
        enroll = undefined;
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
        {enroll}
      </div>
    );
  }
}
