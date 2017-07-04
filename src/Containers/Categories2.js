// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
// components
import List from '../Components/List'
import CategoriesWrap from '../Components/CategoriesWrap'
import Section from '../Components/Section'
// actions
// import * as homeActions from '../actions/home'

class Categories2 extends Component {
  // constructor (props) {
  //   super(props)
  // }

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

const mapStateToProps = (state) => {
  return {
    subCategory: state.subCategory
  }
}

export default connect(mapStateToProps)(Categories2)
