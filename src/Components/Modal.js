import React, { Component } from 'react'

class Modal extends Component {
  outsideModaPress = (e) => (e.target.className === 'sort-option') && this.props.closePress()

  render () {
    const { show, title, children, closePress } = this.props
    return (
      <div className='sort-option' style={{ display: show ? 'block' : 'none', zIndex: 1000 }} onClick={(e) => this.outsideModaPress(e)}>
        <div className='notif-report add-voucher'>
          {
            title &&
            <div className='header-notif'>
              <h3>{title}</h3>
              <span onClick={(e) => closePress(e)} className='icon-close' />
            </div>
          }
          { children }
        </div>
      </div>
    )
  }
}

export const ModalSlide = ({ title, show, showPress, children, style }) => {
  return (
    <div className='sort-option sortButton' onClick={(e) => showPress(e)} style={{ display: show ? 'block' : 'none', ...style }}>
      <div className='sort-list sortButton'>
        <p><strong>{ title }</strong></p>
        <form className='form'>
          <div className='field'>
            <div className='control popup-option change-address'>
              { children }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export const ModalFull = ({ title, show, showPress, children }) => {
  return (
    <div className={`modal modal-filter modal-dropship ${show && 'is-active'}`}>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{title}</p>
          <button onClick={(e) => showPress(e)} className='delete icon-close' />
        </header>
        <section className='modal-card-body'>
          <div className='edit-data-delivery bg-white'>
            { children }
          </div>
        </section>
      </div>
    </div>
  )
}

export const Button = (props) => {
  return <button onClick={(e) => props.onClick(e)} className={`button is-primary is-large is-fullwidth ${props.className}`}>{props.text}</button>
}

export default Modal
