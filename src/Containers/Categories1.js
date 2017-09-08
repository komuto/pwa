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
import { validateResponse, isFetching } from '../Services/Status'

class Categories1 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allCategory: props.allCategory || null,
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  async componentDidMount () {
    const { allCategory } = this.state.allCategory
    if (!allCategory.isFound) {
      NProgress.start()
      await this.props.getCategory()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { allCategory } = nextProps
    if (!isFetching(allCategory)) {
      NProgress.done()
      this.setState({ allCategory, notification: validateResponse(allCategory, 'Data kategori tidak ditemukan!') })
    }
  }

  render () {
    const { allCategory, notification } = this.state
    let categoriesItems = allCategory.isFound && allCategory.allCategory.map((category) => {
      return (
        <Section key={category.id}>
          <SectionTitle title={category.name} />
          <CategoriesWrap>
            <List
              icon={category.icon}
              key={category.id}
              onClick={() => {
                Router.push(
                url.format({
                  pathname: '/product',
                  query: {id: category.id}
                }),
                `/p/${category.slug}?id=${category.id}`
              )
              }}
              name={`Lihat Semua di ${category.name}`} />
          </CategoriesWrap>
          <CategoriesWrap>
            {
              category.sub_categories.map((subCategory, index) => {
                return <List
                  icon={subCategory.icon}
                  key={index}
                  onClick={() => {
                    Router.push(
                      url.format({
                        pathname: '/categories2',
                        query: {id: subCategory.id}
                      }),
                      `/c/${subCategory.slug}/${subCategory.id}`
                    )
                  }}
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
