import React, { Component } from 'react'
import {connect} from 'react-redux';
import {filterProducts, sortProducts} from '../actions/productActions';

class Filter extends Component {
  render() {
    return !this.props.products? (<div>Loading...</div>):(
      <div className="filter">
        <div className="filter-result">{this.props.products.length} Products</div>
        <div className="filter-sort">Order
          <select value={this.props.sort} 
          onChange={(e)=>this.props.sortProducts(this.props.products, e.target.value)}>
            <option>By</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">Filter
          <select value={this.props.size} 
          onChange={(e)=>this.props.filterProducts(this.props.items, e.target.value)}>
            <option value="">ALL</option>
            <option value="XS">XS</option> 
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    size: state.products.size,
    sort:state.products.sort,
    products: state.products.products,
    items:state.products.items,
  }
}
export default connect(mapStateToProps, 
  {filterProducts, sortProducts})(Filter);