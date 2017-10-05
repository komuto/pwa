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

export default (props) => {
  const { icon, name } = props
  const iconStyle = {
    display: 'inline-block',
    width: '28px',
    height: '28px',
    verticalAlign: 'middle',
    marginRight: '8px'
  }
  return (
    <li key={name}>
      <a onClick={() => props.onClick()}>
        { icon && <img src={icon} style={iconStyle} />}
        {/* <span className='categories-img' /> */}
        { name }
        <span className='icon-arrow-right' />
      </a>
    </li>
  )
}
