// @flow
import React, { Component } from 'react'
// components
import List, { ListTitle } from '../Components/List'
import CategoriesWrap from '../Components/CategoriesWrap'
import Section from '../Components/Section'

class Categories1 extends Component {
  render () {
    return (
      <div>
        <Section>
          <ListTitle name='Fashion dan Aksesoris' />
          <CategoriesWrap>
            <List path='categories2' name='Lihat Semua di Fashion dan Aksesoris' />
          </CategoriesWrap>
          <CategoriesWrap>
            <List path='categories2' name='Fashion Pria' />
            <List path='categories2' name='Fashion Wanita' />
            <List path='categories2' name='Fashion Wanita' />
            <List path='categories2' name='Fashion Wanita' />
            <List path='categories2' name='Fashion Wanita' />
          </CategoriesWrap>
        </Section>
        <Section>
          <ListTitle name='Ibu dan Anak' />
          <CategoriesWrap>
            <List path='categories2' name='Lihat Semua di Ibu dan Anak' />
          </CategoriesWrap>
          <CategoriesWrap>
            <List path='categories2' name='Perlengkapan Bayi' />
            <List path='categories2' name='Susu dan Nutrisi Bayi' />
            <List path='categories2' name='Baby Sitter' />
          </CategoriesWrap>
        </Section>
      </div>
    )
  }
}

export default Categories1
