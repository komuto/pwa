
import React from 'react'
import Link from 'next/link'

export const Navigation = (props) => {
  return (
    <nav className='level header is-fullwidth'>
      <div className='nav-left'>
        <Link href={props.path}>
          <a className='level-item'>
            <span>
              {props.icon}
              {props.textPath}
            </span>
          </a>
        </Link>
      </div>
    </nav>
  )
}

export const Hero = (props) => {
  return (
    <section className='hero'>
      <div className='container is-fluid'>
        <p>
          {props.textInfo}
          <Link href={props.path}><a> {props.textPath}</a></Link>
        </p>
      </div>
    </section>
  )
}
