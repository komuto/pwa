// @flow
import React, { Component } from 'react'
// components
import List from '../Components/List'
import CategoriesWrap from '../Components/CategoriesWrap'
import Section from '../Components/Section'

class Categories2 extends Component {
  render () {
    return (
      <Section>
        <CategoriesWrap>
          <List path='categories3' name='Lihat Semua di Fashion Pria' />
        </CategoriesWrap>
        <CategoriesWrap>
          <List path='categories3' name='Fashion Pria' />
          <List path='categories3' name='Fashion Wanita' />
          <List path='categories3' name='Fashion Wanita' />
          <List path='categories3' name='Fashion Wanita' />
          <List path='categories3' name='Fashion Wanita' />
        </CategoriesWrap>
      </Section>
    )
  }
}

export default Categories2
