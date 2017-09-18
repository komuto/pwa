// @flow
import React from 'react'
// Containers
import Header from '../Containers/Header'
import { Navbar, SearchBoox, Hero } from '../Containers/Navbar'
import Tabbar from '../Containers/Tabbar'
import { StickyContainer, Sticky } from 'react-sticky'
// Components
import Content from '../Components/Content'

export default (props) => {
  const { style, header, navbar, hero, tabbar, children } = props
  return (
    <Content style={{ height: '100%', width: '100%', position: 'absolute' }}>
      <Header {...header} />
      <Content className={`main ${style}`}>
        { (navbar) ? <Navbar {...props} /> : null}
        <StickyContainer>
          { (hero) ? <Hero {...props.hero} /> : null}
          { (navbar && navbar.searchBoox)
            ? <Sticky>
              {
                  ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                    return <SearchBoox sbStyle={style} isSticky={isSticky} {...props} />
                  }
                }
            </Sticky>
            : null
          }
          { children }
          { (tabbar) && <Tabbar {...props} /> }
        </StickyContainer>
      </Content>
    </Content>
  )
}
