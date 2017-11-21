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
      subCategory3: props.subCategory3 || [],
      type: props.query.type || null,
      notification: props.notification
    }
    this.submitting = {
      subCategory3: false
    }
  }
  componentDidMount () {
    const { id } = this.state
    if (id) {
      NProgress.start()
      this.submitting = { ...this.submitting, subCategory3: true }
      this.props.getSubCategory3({ id })
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

  // handleSubCategoryRouter (categories, category) {
  //   const { type } = this.state
  //   if (type === 'dropship') {
  //     Router.push(
  //       url.format({
  //         pathname: '/dropship',
  //         query: {id: category.id}
  //       }),
  //       `/d/${categories.slug}/${category.slug}/${category.id}`
  //     )
  //   } else {
  //     Router.push(
  //       url.format({
  //         pathname: '/categories3',
  //         query: {id: category.id}
  //       }),
  //       `/c/${categories.slug}/${category.slug}/${category.id}`
  //     )
  //   }
  // }

  componentWillReceiveProps (nextProps) {
    const { subCategory3 } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(subCategory3) && this.submitting.subCategory3) {
      this.submitting = { ...this.submitting, subCategory3: false }
      NProgress.done()
      if (isError(subCategory3)) {
        this.setState({ notification: notifError(subCategory3.message) })
      }
      if (isFound(subCategory3)) {
        this.setState({ subCategory3 })
      }
    }
  }

  render () {
    console.log('category3', this.state)
    const { subCategory3, notification } = this.state
    const { categories } = subCategory3
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
                  onClick={() => this.handleCategoryRouter(category)}
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
  subCategory3: state.subCategory3
})

const mapDispatchToProps = (dispatch) => ({
  getSubCategory3: (params) => dispatch(homeActions.subCategory3(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Level3)
