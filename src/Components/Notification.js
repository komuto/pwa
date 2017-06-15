// @flow
import React from 'react'
import { ButtonFullWidthLink } from './Button'

export const NotificationPage = (props) => {
  return (
    <div className='main user user-success'>
      <section className='content'>
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <img src={props.icon} alt='komuto' />
            <p><strong>{props.title}</strong></p>
            <p>{props.subTitle}</p>
          </div>
          <div className='columns is-mobile'>
            <div className='column'>
              <ButtonFullWidthLink
                path={props.path}
                text={props.text} />
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
export default (props:any) => {
  if (!props.isShow) return null
  return (
    <div className={`notification ${props.type}`}>
      { props.activeClose ? <button className='delete' onClick={props.onClose} /> : null }
      { props.message }
    </div>
  )
}
