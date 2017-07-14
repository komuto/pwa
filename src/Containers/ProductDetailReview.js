import React, { Component } from 'react'
import Router from 'next/router'
import Section from '../Components/Section'
import ReviewItem from '../Components/ReviewItem'

class ProductDetailReview extends Component {
  render () {
    const { product, reviews } = this.props
    return (
      <Section className='section is-paddingless has-shadow'>
        <div className='container is-fluid'>
          <div className='title'>
            <h3>Ulasan ({reviews.length})</h3>
          </div>
        </div>
        { reviews.map((review, index) => { if (index < 2) return <ReviewItem {...review} key={review.id} /> }) }) }
        <div className='column is-paddingless'>
          <div className='see-all' onClick={() => Router.push(`/reviews?id=${product.id}`)}>
            <span className='link'>Lihat semua ulasan <span className='icon-arrow-right' /></span>
          </div>
        </div>
      </Section>
    )
  }
}

export default ProductDetailReview
