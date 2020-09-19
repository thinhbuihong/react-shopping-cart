import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import {connect} from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import {removeFromCart} from '../actions/cartAction';
import {createOrder, clearOrder} from "../actions/orderAction";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      address: "",
    }
  }
  closeModal = ()=>{
    this.props.clearOrder();
  }
  createOrder = (event) => {
    event.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total:this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  }
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (<div className="cart cart-header">Cart is empty</div>) :
          (<div className="cart cart-header">You have {cartItems.length} in the cart </div>)}

        {order && <Modal isOpen={true} onRequestClose={this.closeModal}>
          <Zoom>
            <button className="close-modal" onClick={this.closeModal}>X</button>
            <div className="order-details">
              <h3 className="success-message">Your order has been placed</h3>
              <h2>Order {order._id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>{order.total}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>{order.cartItems.map(x=>(
                    <div>
                      {x.count} * {x.title} 
                    </div>
                  ))}</div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-item">
                {cartItems.map(item => {
                  return (<li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {"$" + item.price + " x " + item.count + " "}
                        <button className="button" onClick={this.props.removeFromCart.bind(this, item)}>Remove</button>
                      </div>
                    </div>
                  </li>)
                })}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total: $
                  {cartItems.reduce((a, c) => a + (c.price * c.count), 0)}
                  </div>
                  <button className="button primary" onClick={() => {
                    this.setState({ showCheckout: true })
                  }}>Proceed</button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input type="email" name="email" required onChange={this.handleInput}></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input name="name" type="text" required onChange={this.handleInput}></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input type="text" name="address" required onChange={this.handleInput}></input>
                        </li>
                        <li>
                          <button className="button primary" type="submit">Checkout</button>
                        </li>
                      </ul>
                    </form>
                  </div>

                </Fade>
              )}

            </div>
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    cartItems: state.cart.cartItems,
    order:state.order.order,
  }
}

export default connect(mapStateToProps,
  {removeFromCart,createOrder, clearOrder} )(Cart);