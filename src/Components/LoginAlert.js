import React from 'react'
import Router from 'next/router'
// themes
import Images from '../Themes/Images'
// component
import MyImage from './MyImage'
import Modal from './Modal'

export default (props) => {
  return (
    <Modal show={props.show} title='Anda harus login' closePress={() => props.close()}>
      <div style={{ textAlign: 'center' }}>
        <MyImage src={Images.phoneAccount} />
        <p>Anda haru login terlebih dahulu!</p>
        <div className='columns is-mobile'>
          <div className='column is-half'>
            <a className='button is-primary is-large is-fullwidth' onClick={() => Router.push('/signin')}>LOGIN</a>
          </div>
          <div className='column is-half'>
            <a className='button is-primary is-large is-fullwidth is-outlined' onClick={() => Router.push('/signup')}>REGISTER</a>
          </div>
        </div>
      </div>
    </Modal>
  )
}
