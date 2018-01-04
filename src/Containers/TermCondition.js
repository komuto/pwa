// @flow
import React from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// components
import Notification from '../Components/Notification'
// actions
import * as actionTypes from '../actions/stores'
import * as actionUserTypes from '../actions/user'

class TermCondition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      term: '',
      submiting: false,
      validation: false,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.fetchingFirst = false
  }

  handleNotification (e) {
    const { notification } = this.state
    const newState = { notification }
    newState.notification['status'] = !notification.status
    this.setState(newState)
  }

  handleInput (e) {
    const { value } = e.target
    let { term } = this.state
    const newState = { term }
    newState.term = value
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { term, validation } = this.state
    let result = name === 'term' && term.length > 0
    let errorMsg = {
      fontSize: '12px',
      letterSpacing: '0.2px',
      color: '#ef5656',
      display: validation ? 'block' : 'none'
    }
    return (
      <span style={errorMsg}>
        {result ? '' : textFailed}
      </span>
    )
  }

  updateTerm (e) {
    e.preventDefault()
    const { term, submiting } = this.state
    let isValid = term.length > 0
    if (isValid) {
      const newSubmitting = { submiting, validation: false }
      newSubmitting.submiting = true
      this.setState(newSubmitting)
      this.props.updateTerm({ term_condition: term })
    } else {
      this.setState({ validation: true })
    }
  }

  componentDidMount () {
    this.fetchingFirst = true
    this.props.getProfile()
    NProgress.start()
  }

  componentWillReceiveProps (nextProps) {
    const { submiting } = this.state
    const { updateStore, profile } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(updateStore) && submiting) {
      this.setState({ submiting: false })
      if (isFound(updateStore)) {
        this.setState({ notification: notifSuccess(updateStore.message) })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          Router.back()
        }, 3000)
      }
      if (isError(updateStore)) {
        this.setState({ notification: notifError(updateStore.message) })
      }
    }
    if (!isFetching(profile) && this.fetchingFirst) {
      this.fetchingFirst = false
      NProgress.done()
      if (isFound(profile)) {
        // let term = profile.user.store.term_condition ? profile.user.store.term_condition : ''
        this.setState({ profile })
      }
      if (isError(profile)) {
        this.setState({ notification: notifError(profile.message) })
      }
    }
  }

  exampleTerm () {
    const { profile } = this.state
    if (profile.user.store.term_condition) {
      return (
        <div>
          <p className='ex'>Term and Conditions Toko {profile.user.store.name } :</p>
          <p className='ex'>{ profile.user.store.term_condition } </p>
        </div>
      )
    } else {
      return (
        <p className='ex'><strong>Contoh:</strong> <br />
        - Toko Hanya melakukan pengiriman di hari kamis <br />
        - Pesanan diatas jam 10 pagi akan diproses besok
        </p>
      )
    }
  }

  render () {
    const { submiting, term, profile, notification } = this.state
    if (profile.isFound) {
      return (
        <div>
          <Notification
            type={notification.type}
            isShow={notification.status}
            activeClose
            onClose={() => this.setState({notification: {status: false, message: ''}})}
            message={notification.message} />
          <div className='note-head'>
            <p>Terms and Conditions akan ditampilkan pada profil toko dan detail barang Anda. </p>
          </div>
          <section className='content'>
            <div className='container is-fluid'>
              <div className='field '>
                <p className='control'>
                  <input
                    className='input'
                    type='text'
                    placeholder='Tulis Terms and Conditions'
                    name='term'
                    value={term}
                    onChange={(e) => this.handleInput(e)} />
                </p>
                {this.renderValidation('term', 'Mohon isi Terms and Conditions')}
                { this.exampleTerm() }
              </div>
              <a
                className={`button is-primary is-large is-fullwidth ${submiting && 'is-loading'}`}
                onClick={(e) => this.updateTerm(e)}>Simpan Perubahan
              </a>
            </div>
          </section>
        </div>
      )
    } else {
      return (<br />)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    updateStore: state.updateStore,
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => ({
  updateTerm: (params) => dispatch(actionTypes.updateTerm(params)),
  getProfile: () => dispatch(actionUserTypes.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(TermCondition)
