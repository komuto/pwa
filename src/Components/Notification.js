// @flow
import React from 'react'
import { ButtonFullWidthLink } from './Button'

export const FieldError = (props) => {
  let message = props.message !== undefined ? props.message : '* wajib diisi'
  return <i style={{ color: 'red' }}>{message}</i>
}

export const NotificationPage = ({ icon, title, subTitle, path, text }) => {
  return (
    <div className='main user user-success'>
      <section className='content'>
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <img src={icon} alt='komuto' />
            <p><strong>{title}</strong></p>
            <p>{subTitle}</p>
          </div>
          <div className='columns is-mobile'>
            <div className='column'>
              <ButtonFullWidthLink
                path={path}
                text={text} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

 // type : is-primary, is-info, is-success, is-warning, is-danger
 // isType : true/false
 // message : message
export default (props) => {
  if (!props.isShow) return null
  return (
    <div className={`notification ${props.type}`}>
      { props.activeClose ? <button className='delete' onClick={props.onClose} /> : null }
      { props.message }
    </div>
  )
}
