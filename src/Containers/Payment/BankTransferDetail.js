import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// actios
import * as transactionActions from '../../actions/transaction'
import * as bankActions from '../../actions/bank'
// components
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import { Navbar } from '../Navbar'
import MyImage from '../../Components/MyImage'
// services
import { Status } from '../../Services/Status'
// lib
import RupiahFormat from '../../Lib/RupiahFormat'
// themes
import Images from '../../Themes/Images'

class TransactionDetailBankTransfer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      transaction: props.transaction || null,
      komutoAccounts: props.komutoAccounts || null,
      submiting: false,
      showDetailTransaction: false,
      showNotifTransaction: false,
      notification: {
        type: 'is-danger',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  detailTransactionPress (e) {
    e.preventDefault()
    this.setState({ showDetailTransaction: !this.state.showDetailTransaction })
  }

  callBackPress () {
    this.setState({ showNotifTransaction: !this.state.showNotifTransaction })
  }

  async componentDidMount () {
    const { id, komutoAccounts } = this.state
    NProgress.start()
    await this.props.getTransaction({ id })
    if (!komutoAccounts.isFound) await this.props.getKomutoBankAccounts()
  }

  componentWillReceiveProps (nextProps) {
    const { transaction, komutoAccounts } = nextProps
    let { notification } = this.state
    notification = {status: false, message: 'Error, default message.'}
    if (!transaction.isLoading) {
      NProgress.done()
      switch (transaction.status) {
        case Status.SUCCESS :
          if (!transaction.isFound) notification = {type: 'is-danger', status: true, message: 'Keranjang belanja kosong!'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: transaction.message}
          break
        default:
          break
      }
      this.setState({ transaction, notification })
    }

    if (!komutoAccounts.isLoading) {
      NProgress.done()
      switch (komutoAccounts.status) {
        case Status.SUCCESS :
          if (!komutoAccounts.isFound) notification = {type: 'is-danger', status: true, message: 'Data bank tidak ditemukan!'}
          break
        case Status.OFFLINE :
        case Status.FAILED :
          notification = {type: 'is-danger', status: true, message: komutoAccounts.message}
          break
        default:
          break
      }
      this.setState({ komutoAccounts, notification })
    }
  }

  render () {
    const { transaction, komutoAccounts, showDetailTransaction, showNotifTransaction } = this.state
    const { bucket, invoices, summary_invoice } = transaction.transaction

    console.log(komutoAccounts)

    const params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => this.callBackPress(),
        textPath: 'Detail Transaksi'
      }
    }

    let isPromo = false
    let promoCode = ''
    let promoNominal = 0
    let totalPrice = 0

    console.log(transaction)

    if (transaction.isFound) {
      isPromo = bucket.promo
      promoCode = isPromo ? isPromo.promo_code : '-'
      promoNominal = isPromo ? isPromo.nominal : 0
      totalPrice = summary_invoice.total_price
    }

    return (
      <Content>
        <Navbar {...params} />
        {
          transaction.isFound &&
            <Section>
              <section className='section is-paddingless has-shadow'>
                <div className='box notif-payment'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image user-pict'>
                        <img src='../images/icon-waiting.svg' alt='pict' />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p>
                          <strong>Menunggu Pembayaran</strong>
                          <br />
                          1 hari  :  20 jam  :  30 menit
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className='payment-detail bank-transfer'>
                  <ul>
                    <li>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column is-one-third'>
                          <div className='label-text is-left'>
                            <span>No Invoice</span>
                          </div>
                        </div>
                        <div className='column'>
                          <div className='is-left has-text-right'>
                            {
                              invoices.map((invoice, index) => {
                                return <span key={index}>{ invoice.invoice_number }</span>
                              })
                            }
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column is-one-third'>
                          <div className='rating-content is-left'>
                            <span>Total Tagihan</span>
                          </div>
                        </div>
                        <div className='column'>
                          <div className='rating-content is-left has-text-right'>
                            <span>Rp { RupiahFormat(totalPrice) }</span>
                            <a onClick={(e) => this.detailTransactionPress(e)} className='detail-collapsed'>
                              Detail
                              { showDetailTransaction ? <span className='icon-arrow-down blue top' /> : <span className='icon-arrow-down blue' /> }
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li style={{ display: showDetailTransaction ? 'block' : 'none' }}>
                      <div className='payment-detail step-pay'>
                        <ul className='detail-transaction'>
                          <li>
                            <ul className='total-pay'>
                              <li>
                                <div className='columns is-mobile is-multiline no-margin-bottom'>
                                  <div className='column'>
                                    <div className='label-text is-left'>
                                      <span>
                                        Total Belanja
                                      </span>
                                    </div>
                                  </div>
                                  <div className='column is-one-third'>
                                    <div className='has-text-right'>
                                      <span>Rp { RupiahFormat(totalPrice) }</span>
                                    </div>
                                  </div>
                                </div>
                                <div className='columns is-mobile is-multiline no-margin-bottom'>
                                  <div className='column'>
                                    <div className='label-text is-left'>
                                      <span className='pay-code'>
                                        Kode Voucher { promoCode }
                                      </span>
                                    </div>
                                  </div>
                                  <div className='column is-one-third'>
                                    <div className='has-text-right'>
                                      <span className='pay-code'> - Rp { RupiahFormat(promoNominal) }</span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className='columns is-mobile is-multiline no-margin-bottom'>
                                  <div className='column'>
                                    <div className='label-text is-left'>
                                      <span>
                                        Sisa Pembayaran
                                      </span>
                                    </div>
                                  </div>
                                  <div className='column is-one-third'>
                                    <div className='has-text-right'>
                                      <span>Rp { RupiahFormat(totalPrice - promoNominal) }</span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
              <section className='section is-paddingless has-shadow'>
                <div className='container is-fluid'>
                  <div className='title step-transfer'>
                    <h3>Cara Pembayaran</h3>
                  </div>
                </div>
                <div className='payment-detail step-pay step-transfer'>
                  <ul>
                    <li>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='is-left'>
                            <span className='step-num'>1</span>
                            <div className='step-val'>
                              Lakukan Transfer ke salah satu rekening di bawah ini:
                              {
                                komutoAccounts.komutoAccounts.map((account, index) => {
                                  return (
                                    <div className='list-bank' key={index}>
                                      <ul className='list-inline col2w'>
                                        <li className='label-text'>
                                          <span>{ account.bank.name }</span>
                                        </li>
                                        <li>
                                          <div className='has-text-right img-method'>
                                            <MyImage src={account.bank.logo} alt={account.bank_branch_office_name} />
                                          </div>
                                        </li>
                                      </ul>
                                      <ul className='rek-info'>
                                        <li>
                                          <div className='field-left'>No Rek</div>
                                          <div className='field-right'><span>:</span> { account.holder_account_number } </div>
                                        </li>
                                        <li>
                                          <div className='field-left'>Atas nama</div>
                                          <div className='field-right'><span>:</span> {account.bank_branch_office_name } </div>
                                        </li>
                                        <li>
                                          <div className='field-left'>Cabang</div>
                                          <div className='field-right'><span>:</span> { account.bank_branch_office_name }</div>
                                        </li>
                                      </ul>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='is-left'>
                            <span className='step-num'>2</span>
                            <div className='step-val'>
                              Lakukan Pembayaran sampai 3 digit terakhir
                              <p className='price-unique'>Rp { RupiahFormat(totalPrice - promoNominal) }</p>
                            </div>
                            <div className='box digit notif-payment'>
                              <p>Lakukan pembayaran sampai 3 digit terakhir agar pembayaran bisa diproses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='is-left'>
                            <span className='step-num'>3</span>
                            <span className='step-val'>
                              Lakukan konfirmasi agar pembayaran Anda dapat diproses.
                            </span>
                            <br />
                            <a className='button is-primary is-large is-fullwidth'>Konfirmasi Pembayaran</a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
              <section className='section is-paddingless has-shadow'>
                <div className='payment-detail step-pay'>
                  <ul>
                    <li>
                      <div className='columns is-mobile is-multiline no-margin-bottom'>
                        <div className='column'>
                          <div className='label-text is-left'>
                            <span>Daftar Barang yang dibeli</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    {
                      invoices.map((invoice) => {
                        return invoice.items.map((item, index) => {
                          return (
                            <li key={index}
                              onClick={() => Router.push(`/product-detail?id=${item.product.id}`)}
                            >
                              <div className='columns is-mobile is-multiline no-margin-bottom'>
                                <div className='column'>
                                  <div className='box'>
                                    <div className='media'>
                                      <div className='media-left'>
                                        {/* <figure className='image' style={{ width: 50 }}> */}
                                        <figure className='image'>
                                          <a><MyImage src={item.product.image} alt='Image' /></a>
                                        </figure>
                                      </div>
                                      <div className='media-content'>
                                        <div className='content'>
                                          <h4> {item.product.name} </h4>
                                          <a className='btn-detail'><span className='icon-arrow-right' /></a>
                                          <div className='detail'>
                                            <p>Sports Stations Shop</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )
                        })
                      })
                    }
                  </ul>
                </div>
              </section>
            </Section>
        }

        <div className='sort-option' style={{ display: showNotifTransaction ? 'block' : 'none' }}>
          <div className='notif-report'>
            <img src={Images.transaksiDetail} alt='' />
            <h3>Ke Halaman Transaksi</h3>
            <p>Kami akan mengarahkan Anda ke Daftar Transaksi Anda</p>
            <button className='button is-primary is-large is-fullwidth'>Ke Daftar Transaksi</button>
          </div>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  komutoAccounts: state.komutoAccounts
})

const mapDispatchToProps = (dispatch) => ({
  getTransaction: (params) => dispatch(transactionActions.getTransaction(params)),
  getKomutoBankAccounts: () => dispatch(bankActions.getKomutoBankAccounts())
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailBankTransfer)
