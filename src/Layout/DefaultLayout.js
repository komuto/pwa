// @flow
import React from 'react'
// Containers
import Header from '../Containers/Header'
import { Navbar, Hero } from '../Containers/Navbar'
import Tabbar from '../Containers/Tabbar'
// Components
import Content from '../Components/Content'

export default (props) => {
  const { style, header, navbar, hero, tabbar, children } = props
  return (
    <Content style={{ height: '100%', width: '100%', position: 'absolute' }}>
      <Header {...header} props={props} />
      <Content className={`main ${style}`}>
        { (navbar) && <Navbar {...props} /> }
        { (hero) && <Hero {...props.hero} />}
        { children }
        { (tabbar) && <Tabbar {...props} /> }
      </Content>
    </Content>
  )
}
