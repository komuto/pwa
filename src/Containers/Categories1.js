// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import url from 'url'
// components
import List from '../Components/List'
import CategoriesWrap from '../Components/CategoriesWrap'
import Content from '../Components/Content'
import Section, { SectionTitle } from '../Components/Section'
import Notification from '../Components/Notification'
// actions
import * as homeActions from '../actions/home'
// Utils
import { Status } from '../Services/Status'

class Categories1 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allCategory: props.allCategory || null,
      type: props.query.type || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { allCategory } = this.state.allCategory
    if (allCategory.length < 1) {
      NProgress.start()
      await this.props.getCategory()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { allCategory } = nextProps
    if (!allCategory.isLoading) {
      NProgress.done()
      if (allCategory.status === Status.SUCCESS) this.setState({ allCategory })
      if (allCategory.status === Status.OFFLINE) this.setState({ notification: {status: true, message: allCategory.message} })
      if (allCategory.status === Status.FAILED) this.setState({ notification: {status: true, message: allCategory.message} })
    }
  }

  handleCategoryRouter (category) {
    const { type } = this.state
    if (type === 'dropship') {
      Router.push(
        url.format({
          pathname: '/dropship',
          query: {id: category.id, type: 'dropship'}
        }),
        `/d/${category.slug}?id=${category.id}`
      )
    } else {
      Router.push(
        url.format({
          pathname: '/product',
          query: {id: category.id}
        }),
        `/p/${category.slug}?id=${category.id}`
      )
    }
  }

  handleSubCategoryRouter (subCategory) {
    const { type } = this.state
    if (type === 'dropship') {
      Router.push(
        url.format({
          pathname: '/categories2',
          query: {id: subCategory.id, type: 'dropship'}
        }),
        `/c/${subCategory.slug}/${subCategory.id}`
      )
    } else {
      Router.push(
        url.format({
          pathname: '/categories2',
          query: {id: subCategory.id}
        }),
        `/c/${subCategory.slug}/${subCategory.id}`
      )
    }
  }

  render () {
    const { notification } = this.state
    const { allCategory } = this.state.allCategory
    let categoriesItems = allCategory.map((category) => {
      return (
        <Section key={category.id}>
          <SectionTitle title={category.name} />
          <CategoriesWrap>
            <List
              icon={category.icon}
              key={category.id}
              onClick={() => this.handleCategoryRouter(category)}
              name={`Lihat Semua di ${category.name}`} />
          </CategoriesWrap>
          <CategoriesWrap>
            {
              category.sub_categories.map((subCategory, index) => {
                return <List
                  icon={subCategory.icon}
                  key={index}
                  onClick={() => this.handleSubCategoryRouter(subCategory)}
                  name={subCategory.name} />
              })
            }
          </CategoriesWrap>
        </Section>
      )
    })

    return (
      <Content>
        <Notification
          type='is-warning'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        { categoriesItems }
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  allCategory: state.allCategory
})

const mapDispatchToProps = (dispatch) => ({
  getCategory: () => dispatch(homeActions.allCategory())
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories1)
