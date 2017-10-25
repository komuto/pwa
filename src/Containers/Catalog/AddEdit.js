// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
import Notification from '../../Components/Notification'
// actions
import * as actionTypes from '../../actions/catalog'

class AddEditCatalog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      catalog: '',
      validation: false,
      submiting: {
        create: false,
        update: false
      },
      fetchingFirst: false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  handleInput (e) {
    const { value } = e.target
    let { catalog } = this.state
    const newState = { catalog }
    newState.catalog = value
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { catalog, validation } = this.state
    let result = name === 'catalog' && catalog.length > 0
    return (
      <span style={{color: result ? '#23d160' : '#ef5656',
        display: validation ? 'block' : 'none',
        letterSpacing: '0.2px'}} >
        {!result && textFailed}
      </span>
    )
  }

  postCatalog (e) {
    e.preventDefault()
    const { updateCatalog, createCatalog, query } = this.props
    const { catalog } = this.state
    const isUpdate = this.props.query.hasOwnProperty('id') && query.id !== ''
    let isValid = catalog.length > 0
    if (isValid) {
      if (isUpdate) {
        updateCatalog({ id: query.id, name: catalog })
        this.setState({ submiting: { create: false, update: true } })
      } else {
        createCatalog({ name: catalog })
        this.setState({ submiting: { create: true, update: false } })
      }
    } else {
      this.setState({ validation: true })
    }
  }

  componentDidMount () {
    const { catalog } = this.state
    const { query, getCatalog } = this.props
    if (this.props.query.hasOwnProperty('id') && query.id !== '') {
      if (catalog === '') {
        this.setState({ fetchingFirst: true })
        getCatalog({ id: query.id })
        NProgress.start()
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { submiting, fetchingFirst } = this.state
    const { statusCreateCatalog, statusUpdateCatalog, statusGetCatalog } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!isFetching(statusCreateCatalog) && submiting.create) {
      this.setState({ submiting: { create: false, update: false } })
      if (isFound(statusCreateCatalog)) {
        const href = `/catalog-list?isSuccess`
        const as = 'catalog-list'
        Router.push(href, as, { shallow: true })
      }
      if (isError(statusCreateCatalog)) {
        const href = `/catalog-list?isSuccess`
        const as = 'catalog-list'
        Router.push(href, as, { shallow: true })
      }
    }
    if (!isFetching(statusUpdateCatalog) && submiting.update) {
      this.setState({ submiting: { create: false, update: false } })
      if (isFound(statusUpdateCatalog)) {
        const href = `/catalog-list?isSuccess`
        const as = 'catalog-list'
        Router.push(href, as, { shallow: true })
      }
      if (isError(statusUpdateCatalog)) {
        const href = `/catalog-list?isSuccess`
        const as = 'catalog-list'
        Router.push(href, as, { shallow: true })
      }
    }
    if (!isFetching(statusGetCatalog) && fetchingFirst) {
      this.setState({ fetchingFirst: false })
      if (isFound(statusGetCatalog)) {
        this.setState({ catalog: statusGetCatalog.catalog.name })
      }
      if (isError(statusGetCatalog)) {
        this.setState({ notification: notifError(statusGetCatalog.message) })
      }
      NProgress.done()
    }
  }

  handleButton () {
    const { submiting } = this.state
    const { query } = this.props
    const isUpdate = this.props.hasOwnProperty('query') && query.id !== ''
    return (
      <button
        className={`button is-primary is-large is-fullwidth ${(submiting.create || submiting.update) ? 'is-loading' : ''}`}
        onClick={(e) => this.postCatalog(e)} >
        { isUpdate ? 'Simpan Perubahan' : 'Buat Katalog Baru'}
      </button>
    )
  }

  render () {
    const { catalog, validation, notification } = this.state
    return (
      <section className='content'>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='container is-fluid'>
          <form className='form edit'>
            <div className='has-text-centered noted' />
            <div className='field '>
              <p className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Masukkan Nama Katalog'
                  value={catalog}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              {validation && this.renderValidation('catalog', 'Mohon isi nama katalog')}
            </div>
            {this.handleButton()}
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    statusCreateCatalog: state.createCatalog,
    statusUpdateCatalog: state.updateCatalog,
    statusGetCatalog: state.getCatalog
  }
}

const mapDispatchToProps = dispatch => ({
  updateCatalog: (params) => dispatch(actionTypes.updateCatalog(params)),
  createCatalog: (params) => dispatch(actionTypes.createCatalog(params)),
  getCatalog: (params) => dispatch(actionTypes.getCatalog(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCatalog)
