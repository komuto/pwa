import React, { Component } from 'react'

class Modal extends Component {
  outsideModaPress = (e) => (e.target.className === 'sort-option') && this.props.closePress()

  render () {
    const { show, title, children, closePress } = this.props
    return (
      <div className='sort-option' style={{ display: show ? 'block' : 'none' }} onClick={(e) => this.outsideModaPress(e)}>
        <div className='notif-report add-voucher'>
          <div className='header-notif'>
            <h3>{title}</h3>
            <span onClick={(e) => closePress(e)} className='icon-close' />
          </div>
          { children }
        </div>
      </div>
    )
  }
}

export const Button = (props) => {
  return <button onClick={(e) => props.onClick(e)} className={`button is-primary is-large is-fullwidth ${props.className}`}>{props.text}</button>
}

export default Modal
