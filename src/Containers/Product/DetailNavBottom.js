import React, { Component } from 'react'

class ProductDetailNavBottom extends Component {
  handleButton () {
    const props = this.props
    if (props.query.type === 'dropship') {
      return (
        <a className={`button is-primary is-m-lg is-fullwidth ${props.submiting && 'is-loading'}`}
          onClick={() => !props.submiting && props.selectProductDropshipper()}>Pilih Barang ini</a>
      )
    } else {
      return (
        <a className={`button is-primary is-m-lg is-fullwidth ${props.submiting && 'is-loading'}`}
          onClick={() => !props.submiting && props.purchaseNow()}>Beli Sekarang</a>
      )
    }
  }

  render () {
    const props = this.props
    return (
      <div className='level nav-bottom nav-button is-mobile'>
        <a className={`button is-m-lg is-fullwidth is-outlined ${props.submitingDiscussion && 'is-loading'}`}
          onClick={() => { !props.submitingDiscussion && props.discussion() }}>
          { !props.submitingDiscussion && <span className='icon-comment black' /> }
          Diskusi ({props.count_discussion})
        </a>
        {this.handleButton()}
      </div>
    )
  }
}

export default ProductDetailNavBottom
