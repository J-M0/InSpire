import React from 'react';
import {getShoppingCart} from '../server';

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return(
      <div id="shopping-cart" className="panel panel-default">
        <div className="panel-heading" style={{color:'#354066'}}>
          Shopping Cart
        </div>
        
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
