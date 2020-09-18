import React from 'react';
import Products from './components/Products';
import data from "./data.json";
//feature 1
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      products:data.products,
      size:"",
      sort:"",
    }
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
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              cart item
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
