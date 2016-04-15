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

  componentDidMount() {
    this.props.subscribe(this, 'ShoppingCart', 'reload');
    this.setState({selected: []});
  }

  refresh() {
  }

  handleClick(e, id) {
    e.preventDefault();
    var idx = this.state.selected.indexOf(id);
    var selected = this.state.selected;
    (idx === -1) ? selected.push(id) : selected.splice(idx, 1);
    this.setState({selected});
  }

  handleRemoveClick(e, courseId) {
    e.preventDefault();
    e.stopPropagation();
    dropCourseFromCart(this.props.params.id, courseId, (cart) => {
      this.setState({cart});
    });
  }

  addClass(course) {
    enrollInClass(this.props.params.id, course, () => {
      dropCourseFromCart(this.props.params.id, course, (cart) => {
        this.setState({cart});
      });
    });
    this.props.reload();
  }

  batchAddClass() {
    if (this.state.selected.length !== 0) {
      this.state.selected.map((course) => {
        this.addClass(course);
      });
    }
    this.setState({selected: []});
  }

  render() {
    var body;
    var englyph;
    var selected;

    var enroll =
      <button name="singlebutton" className="btn btn-primary center-block" style={{backgroundColor:'#354066', marginTop:'5px'}} onClick={()=>this.batchAddClass()}>
        Enroll
      </button>;

    /* colors for glyphicons go here
     * can enroll (green) - #348531
     * class full (red) - #C9363E
     * restrictions (yellow) - #D9D762
     */

    if (this.state.cart !== undefined) {
      if (this.state.cart.length !== 0) {
        body =
          this.state.cart.map((course) => {
            var courseId = course._id;
            selected = (this.state.selected.indexOf(courseId) !== -1) ? "selected" : "";
            if (course.enrolled.length >= course.capacity) {
              englyph = <span className="glyphicon glyphicon-asterisk pull-right" style={{color: '#C9363E', fontSize: '1.2em'}} />;
            } else if (course.restrictions !== "") {
              englyph = <span className="glyphicon glyphicon-asterisk pull-right" style={{color: '#D9D762', fontSize: '1.2em'}} />;
            } else {
              englyph = <span className="glyphicon glyphicon-asterisk pull-right" style={{color: '#348531', fontSize: '1.2em'}} />;
            }
            return (
              <li className={"list-group-item shop-cart-item " + selected} key={courseId} onClick={(e) => this.handleClick(e, courseId)}>
                <span>{course.courseNumber} - {course.courseName}</span>
                <span className="glyphicon glyphicon-remove pull-right glyph-show-hover" style={{color: '#FFFFFF', display: 'none'}} 
                      onClick={(e) => this.handleRemoveClick(e, course._id)}/>
                <span className="glyph-hide-hover" style={{marginLeft: '10px'}}>{englyph}</span>
                <Modal type="ClassInformation" data={course} id={"CourseInfoModal" + courseId} addClass={(c) => this.addClass(c)} button='add' reload={this.props.reload}/>
                <br/>
                <a key={courseId} data-toggle="modal" href={"#CourseInfoModal" + courseId}>More info</a>
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
