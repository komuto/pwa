// @flow
import React from 'react'
// Containers
import Header from '../Containers/Header'
// Components
import Content from '../Components/Content'

export default (props) => {
  const { children, style, header } = props
  return (
    <Content style={{height: '100%', width: '100%', position: 'absolute'}}>
      <Header {...header} {...props} />
      <Content className={`main ${style}`}>
        { children }
      </Content>
    </Content>
  )
}
