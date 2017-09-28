// @flow
import React from 'react'
import Link from 'next/link'

export const ButtonFullWidthLink = (props) => {
  return (
    <Link href={props.path}><a className={`button is-primary is-large is-fullwidth ${props.className}`}>{props.text}</a></Link>
  )
}

export const ButtonFullWidth = (props) => {
  return (
    <button
      type='button'
      className={`button is-primary is-large is-fullwidth ${props.isLoading ? 'is-loading' : ''}`}
      onClick={props.onClick}>
      {props.text}
    </button>
  )
}
