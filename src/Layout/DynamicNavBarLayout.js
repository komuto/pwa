// @flow
import React from 'react'
// Containers
import Header from '../Containers/Header'
// Components
import Content from '../Components/Content'

export default (props: any) => {
  const { children } = props
  const { style, header } = props.params
  return (
    <Content>
      <Header params={header} />
      <Content className={`main ${style}`}>
        { children }
      </Content>
    </Content>
  )
}
