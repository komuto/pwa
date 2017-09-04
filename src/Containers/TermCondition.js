// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
// actions
import * as actionTypes from '../actions/stores'
import * as actionUserTypes from '../actions/user'
// services
import { Status } from '../Services/Status'

class TermCondition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      term: '',
      submitting: false,
      validation: false,
      notification: {
        status: false,
        color: 'is-success',
        message: 'Error, default message.'
      }
    }
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
    return (
      <span style={{color: result ? '#23d160' : '#ef5656',
        display: validation ? 'block' : 'none',
        letterSpacing: '0.2px'}} >
        {result ? '' : textFailed}
      </span>
    )
  }

  updateTerm (e) {
    e.preventDefault()
    const { term, submitting } = this.state
    let isValid = term.length > 0
    if (isValid) {
      const newSubmitting = { submitting, validation: false }
      newSubmitting.submitting = true
      this.setState(newSubmitting)
      this.props.updateTerm({ term_condition: term })
    } else {
      this.setState({ validation: true })
    }
  }

  componentDidMount () {
    this.props.getProfile()
  }

  componentWillReceiveProps (nextProps) {
    const { submitting, notification } = this.state
    const { updateStore, profile } = nextProps
    if (!updateStore.isLoading && updateStore.isFound && submitting) {
      switch (updateStore.status) {
        case Status.SUCCESS:
          const newNotification = { notification, submitting: false }
          newNotification.notification['status'] = true
          newNotification.notification['message'] = updateStore.message
          newNotification.notification['color'] = 'is-success'
          this.setState(newNotification)
          break
        case Status.OFFLINE :
        case Status.FAILED :
          const newNotif = { notification, submitting: false }
          newNotif.notification['status'] = true
          newNotif.notification['message'] = updateStore.message
          newNotif.notification['color'] = 'is-danger'
          this.setState(newNotif)
          break
        default:
          break
      }
    }
    if (!profile.isLoading && profile.isFound) {
      this.setState({ profile, term: profile.user.store.term_condition })
    }
  }

  render () {
    const { submitting, term, profile, notification } = this.state
    if (profile.isFound) {
      return (
        <div>
          <div
            className={`notification ${notification.status && notification.color}`}
            style={{display: notification.status ? 'block' : 'none'}}>
            <button className='delete' onClick={(e) => this.handleNotification(e)} />
            {notification.message}
          </div>
          <div className='note-head'>
            <p>Terms and Conditions akan ditampilkan pada profil toko dan detail barang Anda. </p>
          </div>
          <section className='content'>
            <div className='container is-fluid'>
              <form action='#' className='form edit'>
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
                  <p className='ex'><strong>Contoh:</strong> <br />
                  - Toko Hanya melakukan pengiriman di hari kamis <br />
                  - Pesanan diatas jam 10 pagi akan diproses besok
                  </p>
                </div>
                <a
                  className={`button is-primary is-large is-fullwidth ${submitting && 'is-loading'}`}
                  onClick={(e) => this.updateTerm(e)}>Simpan Perubahan
                </a>
              </form>
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
