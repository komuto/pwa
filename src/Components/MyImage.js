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
