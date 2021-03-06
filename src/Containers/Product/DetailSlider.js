import React, { Component } from 'react'
import Slider from 'react-slick'
// components
import MyImage from '../../Components/MyImage'

class ProductDetailSlider extends Component {
  render () {
    const { images } = this.props
    const imgStyle = { marginTop: 10, marginBottom: 10, paddingLeft: 10 }
    let settings = {
      className: 'slider variable-width',
      dots: false,
      infinite: false,
      centerMode: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: true
    }
    return <Slider {...settings}>
      {
              images.map((image, index) => {
                return <div key={index} style={{ maxWidth: '100%', ...imgStyle }}>
                  <MyImage src={image.file} alt='sliderImage' style={{ height: '150px' }} />
                </div>
              })
            }
    </Slider>
  }
}

export default ProductDetailSlider
