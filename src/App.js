import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from "./data.json";
import store from './store';
import {Provider} from 'react-redux';

const cartItems = JSON.parse(localStorage.getItem("cartItems"))
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: cartItems || []
    }
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }
  removeFromCart = (product) => {
    let cartItems = this.state.cartItems.slice();
    cartItems = cartItems.filter(x => x._id !== product._id)
    this.setState({
      cartItems
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
              </div>

              <div className="sidebar">
                <Cart cartItems={this.state.cartItems}
                  createOrder={this.createOrder}
                  removeFromCart={this.removeFromCart}></Cart>
              </div>
            </div>
          </main>
          <footer>
            All right is reserved.
        </footer>
        </div>

      </Provider>
    );
  }
}

export default App;
