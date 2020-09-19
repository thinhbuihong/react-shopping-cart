import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state={
      product:null,
    };
  }
  
  openModal = (product) =>{
    this.setState({product});
  }
  closeModal = () =>{
    this.setState({product:null});
  }
  render() {
    const{product} = this.state;
    return (
      <div>
        <Fade bottom cascase={true}>
          <ul className="products">
            {this.props.products.map(product => (
              <li key={product._id}>
                <div className="product">
                  <a href={"#" + product._id} onClick={this.openModal.bind(this, product)}>
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{"$" + product.price}</div>
                    <button onClick={this.props.addToCart.bind(this, product)} className="button primary">Add To Cart</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </Fade>
        {
          product && (
            <Modal onRequestClose={this.closeModal} isOpen={true}>
              <Zoom>
                <button onClick={this.closeModal} className="close-modal">X</button>
                <div>Modal</div>
                <div className="product-details">
                  <img src={product.image} alt={product.title}></img>
                  <div className="product-details-description">
                    <p>
                    <strong>
                    {product.title}
                    </strong>
                    </p>
                    <p>
                      {product.description}
                    </p>
                    <p>
                      Avaliable Sizes: 
                      {product.availableSizes.map(x=>(
                        <span> <button className="button">{x}</button></span>
                      ))}
                    </p>
                    <div className="product-price">
                      <div>
                        {"$"+product.price}
                      </div>
                      <button className="button primary" onClick={()=>{
                        this.props.addToCart(product);
                        this.closeModal();
                      }}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              </Zoom>
            </Modal>
          )
        }
      </div>
    )
  }
}
