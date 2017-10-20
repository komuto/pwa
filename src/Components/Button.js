// @flow
import React from 'react'
import Link from 'next/link'

export const ButtonFullWidthLink = ({ path, className, text }) => {
  return (
    <Link href={path}>
      <a className={`button is-primary is-large is-fullwidth ${className}`}>{text}</a>
    </Link>
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
