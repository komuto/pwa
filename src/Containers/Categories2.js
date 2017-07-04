// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
// components
import List from '../Components/List'
import CategoriesWrap from '../Components/CategoriesWrap'
import Section from '../Components/Section'
import Content from '../Components/Content'
// containers
import { Navbar } from '../Containers/Navbar'
// actions
import * as homeActions from '../actions/home'
// Utils
import { Status } from '../Services/Status'

class Categories2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      categories: props.subCategory.categories || null
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id) NProgress.start() && this.props.dispatch(homeActions.subCategory({ id }))
  }

  componentWillReceiveProps (nextProps) {
    const { subCategory } = nextProps
    console.log(subCategory)
    if (!subCategory.isLoading) {
      NProgress.done()
      switch (subCategory.status) {
        case Status.SUCCESS :
          (subCategory.isFound)
          ? this.setState({ categories: subCategory.categories })
          : this.setState({ notification: {status: true, message: 'Data tidak ditemukan'} })
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: subCategory.message} })
          break
        default:
          break
      }
    }
  }

  render () {
    const { categories } = this.state
    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: 'NEED API UPDATE'
    }

    console.log(categories)

    return (
      <Content>
        <Navbar params={navbar} />
        <Section>
          <CategoriesWrap>
            <List path='categories3' name='NEED API UPDATE' />
          </CategoriesWrap>
          <CategoriesWrap>
            {
              categories.map((category) => {
                return <List
                  key={category.id}
                  onClick={() => {
                    Router.push(
                              url.format({
                                pathname: '/categories2',
                                query: {id: category.id}
                              }),
                              `/c/${category.slug}/${category.id}`
                            )
                  }}
                  name={category.name} />
              })
            }
          </CategoriesWrap>
        </Section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    subCategory: state.subCategory
  }
}

export default connect(mapStateToProps)(Categories2)
