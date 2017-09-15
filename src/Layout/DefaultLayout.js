// @flow
import React from 'react'
// Containers
import Header from '../Containers/Header'
import { Navbar, SearchBoox, Hero } from '../Containers/Navbar'
import Tabbar from '../Containers/Tabbar'
import { StickyContainer, Sticky } from 'react-sticky'
// Components
import Content from '../Components/Content'

export default (props: any) => {
  const { children } = props
  const { style, header, navbar, hero, tabbar } = props.params
  return (
    <Content style={{height: '100%', width: '100%', position: 'absolute'}}>
      <Header params={header} />
      <Content className={`main ${style}`}>
        { (navbar) ? <Navbar params={navbar} {...props} /> : null}
        <StickyContainer>
          { (hero) ? <Hero params={hero} /> : null}
          { (navbar && navbar.searchBoox)
            ? <Sticky>
              {
                  ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                    return <SearchBoox style={style} isSticky={isSticky} />
                  }
                }
            </Sticky>
            : null
          }
          { children }
          { (tabbar) && <Tabbar params={tabbar} {...props} /> }
        </StickyContainer>
      </Content>
    </Content>
  )
}
