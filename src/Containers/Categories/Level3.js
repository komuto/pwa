// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
// components
import List from '../../Components/List'
import CategoriesWrap from '../../Components/CategoriesWrap'
import Section from '../../Components/Section'
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
// containers
import { Navbar } from '../../Containers/Navbar'
// actions
import * as homeActions from '../../actions/home'

class Level3 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      subCategory: props.subCategory || [],
      type: props.query.type || null,
      notification: props.notification
    }
    this.submitting = {
      subCategory: false
    }
  }
  componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      this.submitting = { ...this.submitting, subCategory: true }
      this.props.getSubCategory({ id })
    }
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
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(subCategory) && this.submitting.subCategory) {
      this.submitting = { ...this.submitting, subCategory: false }
      NProgress.done()
      if (isError(subCategory)) {
        this.setState({ notification: notifError(subCategory.message) })
      }
      if (isFound(subCategory)) {
        this.setState({ subCategory })
      }
    }
  }

  render () {
    const { subCategory, notification } = this.state
    const { categories } = subCategory
    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: categories.name
      }
    }
    return (
      <Content>
        <Navbar {...params} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Level3)
