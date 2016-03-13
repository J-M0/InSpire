import React from 'react';
import {getShoppingCart} from '../server';

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  refresh() {
    console.log("refreshed");
  }

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("this is from the cart item");
    this.refresh();
  }

  render() {
    var body
    if (this.state.cart !== undefined) {
      if (this.state.cart.length !== 0) {
        body =
        <div>
          {this.state.cart.map((courses, i) => { return (
            <li className="list-group-item shop-cart-item" key={i} onClick={(e) => this.handleClick(e)}>{courses.courseId} - {courses.courseName}</li>
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
    });
  }
}
