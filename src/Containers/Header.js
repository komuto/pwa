// @flow
import React from 'react'
import Head from 'next/head'
const Header = (props) => {
  const { title } = props
  return (
    <Head>
      <title>{ title }</title>
    </Head>
  )
}

export default Header
