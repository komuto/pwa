// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
// actions
import * as actionTypes from '../actions/catalog'
// services
import { Status } from '../Services/Status'

class AddEditCatalog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      catalog: '',
      validation: false,
      submitting: false,
      setStateStart: false
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
    const isUpdate = this.props.hasOwnProperty('query') && query.id !== ''
    let isValid = catalog.length > 0
    if (isValid) {
      isUpdate ? updateCatalog({ id: query.id, name: catalog }) : createCatalog({ name: catalog })
      this.setState({ submitting: true })
    } else {
      this.setState({ validation: true })
    }
  }

  componentDidMount () {
    const { catalog } = this.state
    const { query, getCatalog } = this.props
    if (this.props.hasOwnProperty('query') && query.id !== '') {
      if (catalog === '') {
        this.setState({ setStateStart: true })
        getCatalog({ id: query.id })
      }
    }
    NProgress.done()
  }

  componentWillReceiveProps (nextProps) {
    const { submitting, notification, setStateStart } = this.state
    const { statusCreateCatalog, statusUpdateCatalog, statusGetCatalog } = nextProps
    if (!statusCreateCatalog.isLoading && submitting) {
      switch (statusCreateCatalog.status) {
        case Status.SUCCESS: {
          this.setState({ submitting: false })
          const href = `/catalog-list?isSuccess`
          const as = 'catalog-list'
          Router.push(href, as, { shallow: true })
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          this.setState({ submitting: false })
          const href = `/catalog-list?isSuccess`
          const as = 'catalog-list'
          Router.push(href, as, { shallow: true })
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
    if (!statusUpdateCatalog.isLoading && submitting) {
      switch (statusUpdateCatalog.status) {
        case Status.SUCCESS: {
          this.setState({ submitting: false })
          const href = `/catalog-list?isSuccess`
          const as = 'catalog-list'
          Router.push(href, as, { shallow: true })
          break
        }
        case Status.OFFLINE :
        case Status.FAILED : {
          this.setState({ submitting: false })
          const href = `/catalog-list?isSuccess`
          const as = 'catalog-list'
          Router.push(href, as, { shallow: true })
          break
        }
        default:
          break
      }
      this.setState({ notification })
    }
    if (statusGetCatalog.isFound && setStateStart) {
      this.setState({ catalog: statusGetCatalog.catalog.name })
    }
  }

  handleButton () {
    const { submitting } = this.state
    const { query } = this.props
    const isUpdate = this.props.hasOwnProperty('query') && query.id !== ''
    return (
      <button
        className={`button is-primary is-large is-fullwidth ${submitting ? 'is-loading' : ''}`}
        onClick={(e) => this.postCatalog(e)} >
        { isUpdate ? 'Simpan Perubahan' : 'Buat Katalog Baru'}
      </button>
    )
  }

  render () {
    const { catalog, validation } = this.state
    return (
      <section className='content'>
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
