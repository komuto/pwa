// @flow
import React, { Component } from 'react'
// components
import List from '../Components/List'
import CategoriesWrap from '../Components/CategoriesWrap'
import Section from '../Components/Section'

class Categories3 extends Component {
  render () {
    return (
      <Section>
        <CategoriesWrap>
          <List path='categories4' name='Lihat Semua di Sepatu Pria' />
        </CategoriesWrap>
        <CategoriesWrap>
          <List path='categories4' name='Sepatu Formal' />
          <List path='categories4' name='Sepatu Casual' />
          <List path='categories4' name='Fashion Sport' />
          <List path='categories4' name='Fashion Pria' />
        </CategoriesWrap>
      </Section>
    )
  }
}

export default Categories3
