/**
 * Safei Muslim
 * Yogyakarta , 3 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
/** including component */
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
/** including actions */
import * as bankActions from '../../actions/bank'
import * as userActions from '../../actions/user'
/** including custom lib */
import RupiahFormat from '../../Lib/RupiahFormat'
/** define anotherBank const, because not available in banks api respon  */
const anotherBank = {
  code: '1001',
  id: -1,
  logo: null,
  name: 'Bank Lainya',
  status: 1,
  status_at: 1466497561
}

class Withdraw extends Component {
  constructor (props) {
    super(props)
    /** define state */
    this.state = {
      balance: props.balance || null,
      banks: props.banks || null,
      listBankAccounts: props.listBankAccounts || null,
      form: {},
      listBankShow: false,
      notification: props.notification
    }
    /** define submitting status, status when they call or not [TRUE, FALSE] */
    this.submitting = {
      balance: false,
      banks: false,
      listBankAccounts: false
    }
    /** setup moment localize to id */
    moment.locale('id')
    this.isAccountFound = false
  }

  render () {
    const { notification } = this.state
    const { isFound } = this.props

    return (
      <Content>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          <WithdrawContent
            {...this.state}
            isFound={isFound}
            handleInput={(e) => this.handleInput(e.target)}
            selectedBankPress={(e, p) => this.selectedBankPress(e, p)}
            listBankPress={(e) => this.listBankPress(e)}
            submitPress={(e) => this.submitPress(e)} />
        }
      </Content>
    )
  }

  componentDidMount () {
    /** set submitting balance true then call get balance api */
    this.submitting = { ...this.submitting, banks: true, listBankAccounts: true, balance: true }
    this.props.listBank()
    this.props.getBankAccounts()
    this.props.getBalance()
  }

  componentWillReceiveProps (nextProps) {
    const { banks, listBankAccounts, balance } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state get banks */
    if (!isFetching(banks) && this.submitting.banks) {
      this.submitting = { ...this.submitting, banks: false }
      if (isError(banks)) {
        this.setState({ notification: notifError(banks.message) })
      }
      if (isFound(banks)) {
        this.setState({ banks })
      }
    }

    /** handling state getSaldoToken */
    if (!isFetching(listBankAccounts) && this.submitting.listBankAccounts) {
      this.isAccountFound = true
      this.submitting = { ...this.submitting, listBankAccounts: false }
      if (isError(listBankAccounts)) {
        this.setState({ notification: notifError(listBankAccounts.message) })
      }
      if (isFound(listBankAccounts)) {
        this.setState({ listBankAccounts })
      }
    }

    /** handling state get balance */
    if (!isFetching(balance) && this.submitting.balance) {
      this.submitting = { ...this.submitting, balance: false }
      if (isError(balance)) {
        this.setState({ notification: notifError(balance.message) })
      }
      if (isFound(balance)) {
        this.setState({ balance })
      }
    }
  }

  /** show/hide list bank modal */
  listBankPress (e) {
    e.preventDefault()
    if (!e.target.className.includes('sortButton')) return
    this.setState({ listBankShow: !this.state.listBankShow })
  }

  /** handling when bank selected */
  selectedBankPress (e, bank) {
    e.preventDefault()
    this.setState({ form: {...this.state.form, bank}, listBankShow: false })
  }

  /** handling input changed */
  handleInput ({ value, name }) {
    this.setState({ form: { ...this.state.form, name: value } })
  }

  /** handling submit press */
  submitPress (e) {
    e.preventDefault()
    Router.push('/verify-otp-bank')
  }
}
/** content when user dont have bank account */
const WithdrawContent = ({ balance, banks, listBankAccounts, isFound, form, handleInput, listBankShow, listBankPress, selectedBankPress, submitPress }) => {
  let createDate = moment().format('Do MMMM YY')
  // let hasBankAccount = listBankAccounts.listBankAccounts.length > 0
  return (
    <section className='section is-paddingless'>
      <div className='detail'>
        <div className='detail-purchase summary'>
          <div className='detail-result detail-price'>
            <ul>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><span>Saldo Per {createDate}</span></div>
                  <div className='column is-half has-text-right'><span>Rp { RupiahFormat(balance.balance.user_balance) }</span></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='edit-data-delivery bg-white'>
        <form action='#' className='form'>
          <div className='field'>
            <label className='label'>Nominal Penarikan Dana</label>
            <p className='control with-currency'>
              <span className='cur-val'>Rp</span>
              <input name='amount' onChange={(e) => handleInput(e)} className='input' type='number' />
            </p>
          </div>
          <div className='field sortButton' onClick={(e) => listBankPress(e)}>
            <p className='control detail-address sortButton'>
              <span className='location-label js-option sortButton'>{ form.bank ? form.bank.name : 'Pilih Bank Tujuan' }</span>
            </p>
          </div>
          {/* {
            !hasBankAccount
            ? <div>
                <div className='field sortButton' onClick={(e) => listBankPress(e)}>
                  <p className='control detail-address sortButton'>
                    <span className='location-label js-option sortButton'>{ form.bank ? form.bank.name : 'Pilih Bank Tujuan' }</span>
                  </p>
                </div>
                {
                  form.bank && form.bank.id === anotherBank.id &&
                  <div className='field'>
                    <p className='control'>
                      <input name='bank_name' onChange={(e) => handleInput(e)} className='input' type='text' placeholder='Nama Bank' />
                    </p>
                  </div>
                }
                <div className='field'>
                  <p className='control'>
                    <input name='bank_branch_office_name' onChange={(e) => handleInput(e)} className='input' type='text' placeholder='Cabang Bank' />
                  </p>
                </div>
                <div className='field'>
                  <p className='control'>
                    <input name='holder_account_number' onChange={(e) => handleInput(e)} className='input' type='number' placeholder='Masukan Nomor Rekening' />
                  </p>
                </div>
                <div className='field'>
                  <p className='control'>
                    <input name='holder_name' onChange={(e) => handleInput(e)} className='input' type='text' placeholder='Masukkan Nama Pemilik Rekening' />
                  </p>
                </div>
              </div>
            : <div className='field sortButton' onClick={(e) => listBankPress(e)}>
                <p className='control detail-address sortButton'>
                  <span className='location-label js-option sortButton'>{ form.bank ? form.bank.name : 'Pilih Bank Tujuan' }</span>
                </p>
              </div>
          } */}
          <div className='field'>
            <a onClick={(e) => submitPress(e)} className='button is-primary is-large is-fullwidth js-option' data-target='#aditAddress'>Tarik Saldo</a>
          </div>
        </form>
      </div>
      <ListBank
        {...banks}
        {...form}
        listBankShow={listBankShow}
        listBankPress={(e) => listBankPress(e)}
        selectedBankPress={(e, p) => selectedBankPress(e, p)} />
    </section>
  )
}

/** list bank modal content */
const ListBank = ({ banks, bank, listBankShow, listBankPress, selectedBankPress }) => {
  return (
    <div className='sort-option sortButton' onClick={(e) => listBankPress(e)} style={{ display: listBankShow ? 'block' : 'none' }}>
      <div className='sort-list sortButton'>
        <p><strong>Pilih Rekening Tujuan</strong></p>
        <form className='form'>
          <div className='field'>
            <div className='control popup-option change-address'>
              {
                banks.map((b) => {
                  return <label key={b.id} onClick={(e) => selectedBankPress(e, b)} className={`radio ${bank && bank.id === b.id && 'checked'}`}>
                    <input type='radio' name='address' />
                    <strong>{b.name}</strong>
                  </label>
                })
              }
              <label onClick={(e) => selectedBankPress(e, anotherBank)} className={`radio ${bank && bank.id === anotherBank.id && 'checked'}`}>
                <input type='radio' name='address' />
                <strong>{anotherBank.name}</strong>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

/** function get state from redux */
const mapStateToProps = (state) => ({
  balance: state.balance,
  banks: state.banks,
  listBankAccounts: state.listBankAccounts
})

/** function get actions from redux */
const mapDispatchToPtops = (dispatch) => ({
  listBank: () => dispatch(bankActions.listBank()),
  getBankAccounts: () => dispatch(bankActions.getBankAccounts()),
  getBalance: () => dispatch(userActions.getBalance())
})

/** connecting componet with redux */
export default connect(mapStateToProps, mapDispatchToPtops)(Withdraw)
