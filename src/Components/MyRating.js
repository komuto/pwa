import React from 'react'
import Rating from 'react-rating'
// themes
import Images from '../Themes/Images'
// component
import MyImage from './MyImage'

export default (props) => {
  let size = props.size !== undefined ? props.size : 16
  return <Rating
    {...props}
    empty={<MyImage src={Images.startDisabled} style={{width: size + 'px', height: size + 'px'}} className='icon' />}
    full={<MyImage src={Images.startEnabled} style={{width: size + 'px', height: size + 'px'}} className='icon' />} />
}
