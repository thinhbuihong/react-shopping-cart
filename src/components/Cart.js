import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      address: "",
    }
  }

  createOrder = (event) => {
    event.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  }
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (<div className="cart cart-header">Cart is empty</div>) :
          (<div className="cart cart-header">You have {cartItems.length} in the cart </div>)}
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
