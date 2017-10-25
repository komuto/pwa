/**
 * Safei Muslim
 * Yogyakarta , 2017
 * PT Skyshi Digital Indonesa
 */

import React from 'react'
import { ButtonFullWidthLink } from './Button'
import MyImage from './MyImage'

/**
 * Norif field error
 */
export const FieldError = (props) => {
  let message = props.message !== undefined ? props.message : '* wajib diisi'
  return <i style={{ color: 'red' }}>{message}</i>
}

/**
 * Notification full page
 */
export const NotificationPage = ({ icon, title, subTitle, path, text }) => {
  return (
    <div className='main user user-success'>
      <section className='content'>
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <MyImage src={icon} alt='komuto' />
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

/**
 * Notification payment status
 * box in section
 */
export const NotificationBox = ({ notifClass, icon, children }) => (
  <div className={`box ${notifClass}`}>
    <article className='media'>
      <div className='media-left'>
        <figure className='image user-pict' style={icon === undefined ? { width: 50 } : {}}>
          <MyImage src={icon} alt='icon' />
        </figure>
      </div>
      <div className='media-content'>
        <div className='content'>
          { children }
        </div>
      </div>
    </article>
  </div>
)

/**
 * type : is-primary, is-info, is-success, is-warning, is-danger
 * isType : true/false
 * message : message
 */
export default (props) => {
  if (!props.isShow) return null
  return (
    <div className={`notification ${props.type}`} style={{ position: 'fixed', width: '100%', left: '0', top: '64px', zIndex: '8' }}>
      { props.activeClose ? <button className='delete' onClick={props.onClose} /> : null }
      { props.message }
    </div>
  )
}
