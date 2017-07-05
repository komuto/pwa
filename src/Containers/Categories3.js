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
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }
  componentDidMount () {
    const { id } = this.state
    if (id) NProgress.start() && this.props.dispatch(homeActions.subCategory({ id }))
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
              onClick={() => {
                Router.push(
                  url.format({
                    pathname: '/product',
                    query: {id: categories.id}
                  }),
                  `/p/${categories.slug}/${categories.id}`
                )
              }}
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
                  onClick={() => {
                    Router.push(
                      url.format({
                        pathname: '/product',
                        query: {id: category.id}
                      }),
                      `/p/${categories.slug}/${category.slug}/${category.id}`
                    )
                  }}
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

const mapStateToProps = (state) => {
  return {
    subCategory: state.subCategory
  }
}
export default connect(mapStateToProps)(Categories3)
