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

class Level2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      subCategory2: props.subCategory2 || [],
      type: props.query.type || null,
      notification: props.notification
    }
    this.submitting = {
      subCategory2: false
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
          pathname: '/categories3',
          query: {id: category.id, type: 'dropship'}
        }),
        `/c/${categories.slug}/${category.slug}/${category.id}?type=dropship`
      )
    } else {
      Router.push(
        url.format({
          pathname: '/categories3',
          query: {id: category.id}
        }),
        `/c/${categories.slug}/${category.slug}/${category.id}`
      )
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id) {
      this.submitting = { ...this.submitting, subCategory2: true }
      NProgress.start()
      this.props.getSubCategory2({ id })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { subCategory2 } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(subCategory2) && this.submitting.subCategory2) {
      NProgress.done()
      this.submitting = { ...this.submitting, subCategory2: false }
      if (isError(subCategory2)) {
        this.setState({ notification: notifError(subCategory2.message) })
      }
      if (isFound(subCategory2)) {
        this.setState({ subCategory2 })
      }
    }
  }

  render () {
    const { subCategory2, notification } = this.state
    const { categories } = subCategory2
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
              ? categories.sub_categories.map((category, index) => {
                return <List
                  icon={category.icon}
                  key={index}
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
  subCategory2: state.subCategory2
})

const mapDispatchToProps = (dispatch) => ({
  getSubCategory2: (params) => dispatch(homeActions.subCategory2(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Level2)
