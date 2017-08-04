import React, { Component } from 'react'

class ProductDetailNavBottom extends Component {
  render () {
    const props = this.props
    return (
      <div className='level nav-bottom nav-button is-mobile'>
        <a className={`button is-m-lg is-fullwidth is-outlined ${props.submitingDiscussion && 'is-loading'}`}
          onClick={() => { !props.submitingDiscussion && props.discussion() }}>
          { !props.submitingDiscussion && <span className='icon-comment black' /> }
          Diskusi ({props.count_discussion})
        </a>
        <a className={`button is-primary is-m-lg is-fullwidth ${props.submiting && 'is-loading'}`}
          onClick={() => !props.submiting && props.purchaseNow()}>Beli Sekarang</a>
      </div>
    )
  }
}

export default ProductDetailNavBottom
