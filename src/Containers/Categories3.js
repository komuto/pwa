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
import Notification from '../Components/Notification'
// containers
import { Navbar } from '../Containers/Navbar'
// actions
import * as homeActions from '../actions/home'
// utils
import { Status } from '../Services/Status'

class Categories3 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      categories: props.subCategory || [],
      type: props.query.type || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }
  componentDidMount () {
    const { id } = this.state
    if (id) NProgress.start() && this.props.getSubCategory({ id })
  }

  handleCategoryRouter (categories) {
    const { type } = this.state
    if (type === 'dropship') {
      Router.push(
        url.format({
          pathname: '/dropship',
          query: {id: categories.id, type: 'dropship'}
        }),
        `/d/${categories.slug}?id=${categories.id}`
      )
    } else {
      Router.push(
        url.format({
          pathname: '/product',
          query: {id: categories.id}
        }),
        `/p/${categories.slug}?id=${categories.id}`
      )
    }
  }

  handleSubCategoryRouter (categories, category) {
    const { type } = this.state
    if (type === 'dropship') {
      Router.push(
        url.format({
          pathname: '/dropship',
          query: {id: category.id}
        }),
        `/d/${categories.slug}/${category.slug}/${category.id}`
      )
    } else {
      Router.push(
        url.format({
          pathname: '/categories4',
          query: {id: category.id}
        }),
        `/c/${categories.slug}/${category.slug}/${category.id}`
      )
    }
  }

  componentWillReceiveProps (nextProps) {
    const { subCategory } = nextProps
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
    const { categories, notification } = this.state
    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: categories.name
    }
    return (
      <Content>
        <Navbar params={navbar} />
        <Notification
          type='is-warning'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Section>
          <CategoriesWrap>
            <List
              onClick={() => this.handleCategoryRouter(categories)}
              icon={`${categories.icon}`}
              name={`Lihat Semua di ${categories.name}`} />
          </CategoriesWrap>
          <CategoriesWrap>
            {
              categories.sub_categories
              ? categories.sub_categories.map((category) => {
                return <List
                  icon={category.icon}
                  key={category.id}
                  onClick={() => this.handleSubCategoryRouter(categories, category)}
                  name={category.name} />
              })
              : null
            }
          </CategoriesWrap>
        </Section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  subCategory: state.subCategory
})

const mapDispatchToProps = (dispatch) => ({
  getSubCategory: (params) => dispatch(homeActions.subCategory(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories3)
