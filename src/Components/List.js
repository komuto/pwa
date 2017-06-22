// @flow
import React from 'react'
import Link from 'next/link'

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
  const {path, name} = props
  return (
    <li>
      <Link href={path}><a><span className='categories-img' /> { name } <span className='icon-arrow-right' /></a></Link>
    </li>
  )
}
