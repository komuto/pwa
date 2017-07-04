// @flow
import React from 'react'

export const ListTitle = (props) => {
  const { name } = props
  return (
    <div className='container is-fluid'>
      <div className='title'>
        <h3>{ name }</h3>
      </div>
    </div>
  )
}

export default (props:any) => {
  const { name } = props
  return (
    <li key={name}>
      <a onClick={() => props.onClick()}><span className='categories-img' />{ name } <span className='icon-arrow-right' /></a>
    </li>
  )
}
