import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from "./data.json";
//feature 1


const cartItems= JSON.parse(localStorage.getItem("cartItems"))
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      products:data.products,
      size:"",
      sort:"",
      cartItems: cartItems || []
    }
  }
  sortProducts = (event) =>{
    const sort = event.target.value;
    this.setState(state => ({
      sort,
      products: this.state.products.slice().sort((a,b) => {
        return (sort === "lowest")? (a.price - b.price) : 
        (sort === "highest") ? b.price -a.price : (a._id < b._id ? -1: 1)
      })
    }));
  }
  addToCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart=false;
    cartItems.forEach(item=>{
      if(item._id === product._id){
        item.count ++;
        alreadyInCart=true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product, count:1});
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  filterProducts = (event) =>{
    const size = event.target.value;
    if(size === ""){
      this.setState({size, products:data.products})
    }else{
      this.setState({
        size,
        products: data.products.filter(product => 
          product.availableSizes.indexOf(event.target.value) >= 0),
      })

    }
  }
  createOrder = (order) =>{
    alert("Need to save order for " +order.name);
  }
  removeFromCart = (product) =>{
    let cartItems= this.state.cartItems.slice();
    cartItems= cartItems.filter(x=>x._id !== product._id)
    this.setState({
      cartItems
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
              size={this.state.size} 
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}></Filter>
              <Products addToCart={this.addToCart}
              products={this.state.products}></Products>
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
    );
  }
}

export default App;
