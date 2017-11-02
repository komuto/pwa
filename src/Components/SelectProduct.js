import React, { Component } from 'react'
import MyImage from '../Components/MyImage'

class SelectProduct extends Component {
  render () {
    const { product, isSelected, handleSelectedProducts } = this.props
    return (
      <div className='sort-list check-list middle item-select'>
        <label className='checkbox' onClick={(e) => handleSelectedProducts(e, product.id)}>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left is-bordered'>
                <figure className='image'>
                  <MyImage src={product.image} alt='pict' />
                </figure>
              </div>
              <div className='media-content middle'>
                <div className='content'>
                  <p>
                    <strong>{product.name} </strong>
                  </p>
                </div>
              </div>
            </article>
          </div>
          <span className={`input-wrapper ${isSelected && 'checked'}`}>
            <input type='checkbox' />
          </span>
        </label>
      </div>
    )
  }
}

export default SelectProduct
