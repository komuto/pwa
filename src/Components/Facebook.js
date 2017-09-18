import React from 'react'
import FacebookLogin from 'react-facebook-login'

export const LoginFacebook = (props) => {
  return <FacebookLogin
    appId='829312977224065'
    fields='name,email,picture'
    textButton={props.text}
    callback={(response) => props.responseFacebook(response)}
    cssClass='button is-fb is-large is-fullwidth'
    icon={<span className='icon-fb' />} />
}
