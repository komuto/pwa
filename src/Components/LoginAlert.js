import React from 'react'
import Router from 'next/router'
// themes
import Images from '../Themes/Images'
// component
import MyImage from './MyImage'
import Modal from './Modal'

export default (props) => {
  const { show, localize } = props
  return (
    <Modal show={show} title={localize.signin} closePress={() => props.close()}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: '50%', margin: '0 auto' }}><MyImage src={Images.phoneAccount} alt='phoneAccount' /></div>
        <p>{localize.signin_warning}</p>
        {/* <div className='columns is-mobile'>
        </div> */}
        <div className='column'>
          <a className='button is-primary is-large is-fullwidth' onClick={() => Router.push('/signin')}>{localize.signin}</a>
        </div>
        <div className='column'>
          <a className='button is-primary is-large is-fullwidth is-outlined' onClick={() => Router.push('/signup')}>{localize.signup}</a>
        </div>
      </div>
    </Modal>
  )
}
