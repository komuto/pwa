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
import { validateResponse, isFetching } from '../Services/Status'

class Categories2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      subCategory: props.subCategory || [],
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

  componentWillReceiveProps (nextProps) {
    const { subCategory } = nextProps
    if (!isFetching(subCategory)) {
      NProgress.done()
      this.setState({ subCategory, notification: validateResponse(subCategory, 'Data sub kategori tidak ditemukan!') })
    }
  }

  render () {
    const { subCategory, notification } = this.state
    const { categories } = subCategory
    const navbar = {
      searchBoox: false,
      path: '/',
      textPath: categories.name
    }
    console.log(subCategory)
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
                  `/p/${categories.slug}?id=${categories.id}`
                )
              }}
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
                  onClick={() => {
                    Router.push(
                      url.format({
                        pathname: '/categories3',
                        query: {id: category.id}
                      }),
                      `/c/${categories.slug}/${category.slug}/${category.id}`
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

const mapStateToProps = (state) => ({
  subCategory: state.subCategory
})

const mapDispatchToProps = (dispatch) => ({
  getSubCategory: (params) => dispatch(homeActions.subCategory(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories2)
