import React from 'react'
import Rating from 'react-rating'
// themes
import Images from '../Themes/Images'

export default (props:any) => {
  return <Rating
    {...props}
    empty={<img src={Images.startDisabled} style={{width: '16px', height: '16px'}} className='icon' />}
    full={<img src={Images.startEnabled} style={{width: '16px', height: '16px'}} className='icon' />} />
}
