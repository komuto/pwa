import React, { Component } from 'react'
import Slider from 'react-slick'
// components
import MyImage from '../Components/MyImage'

class ProductDetailSlider extends Component {
  render () {
    const { images } = this.props
    const imgStyle = { marginTop: 10, marginBottom: 10, paddingLeft: 10 }
    let settings = {
      className: 'slider variable-width',
      dots: false,
      infinite: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true
    }
    let i = 0
    return <Slider {...settings}>
      {
              images.map((image) => {
                i++
                return <div style={imgStyle} key={i}>
                  <MyImage src={image.file} alt='Image' />
                </div>
              })
            }
    </Slider>
  }
}

export default ProductDetailSlider
