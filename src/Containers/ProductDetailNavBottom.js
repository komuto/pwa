import React, { Component } from 'react'
import Router from 'next/router'

class ProductDetailNavBottom extends Component {
  render () {
    const props = this.props
    return (
      <div className='level nav-bottom nav-button is-mobile'>
        <a className='button is-m-lg is-fullwidth is-outlined'
          onClick={() => {
            Router.push(`/discussion?id=${props.id}`)
          }}><span className='icon-comment black' /> Diskusi ({props.count_discussion})</a>
        <a className='button is-primary is-m-lg is-fullwidth'>Beli Sekarang</a>
      </div>
    )
  }
}

export default ProductDetailNavBottom
