import React from 'react'
import Img from 'react-image'
// themes
import Images from '../Themes/Images'

export default (props) => {
  const loader = <img src={Images.loading} />
  const unloader = <img src={Images.loadingFailed} />
  return <Img
    {...props}
    loader={loader}
    unloader={unloader} />
}

export const ImageRounded = ({ img, width, height, borderRadius, padding }) => (
  <div style={{ width, height, borderRadius, padding, backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
)
