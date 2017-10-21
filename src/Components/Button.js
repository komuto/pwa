import React from 'react'
import Router from 'next/router'

export const ButtonFullWidthLink = ({ path, className, text }) => {
  return (
    <a onClick={() => Router.push(path)} className={`button is-primary is-large is-fullwidth ${className}`}>{text}</a>
  )
}

export const ButtonFullWidth = ({ isLoading, onClick, text }) => {
  return (
    <button
      type='button'
      className={`button is-primary is-large is-fullwidth ${isLoading ? 'is-loading' : ''}`}
      onClick={onClick}>
      {text}
    </button>
  )
}
