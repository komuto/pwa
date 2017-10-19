import React, { Component } from 'react'
import { connect } from 'react-redux'

class PaymentConfirmation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      form: {}
    }
  }

  handlingInput (e) {
    e.preventDefault()
    let { name, value } = e.target
    let { form } = this.state
    form[name] = value
    this.setState({ form })
  }

  render () {
    const { form } = this.state
    return (
      <section className='section is-paddingless'>
        <div className='edit-data-delivery bg-white edit'>
          <form className='form edit'>
            <div className='field'>
              <label className='label'>Nominal Pembayaran</label>
              <p className='control'>
                <input onChange={(e) => this.handlingInput(e)} name='amount' value={form.amount !== undefined ? form.amount : ''} className='input' type='number' />
              </p>
            </div>
            <div className='field'>
              <label className='label'>Tanggal Transfer</label>
              <p className='control detail-address'>
                <span className='location-label js-option'>Senin, 20 April 2017</span>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Bank Tujuan</label>
              <p className='control detail-address'>
                <span className='location-label js-option'>Bank Mandiri</span>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Bank Pengirim</label>
              <p className='control detail-address'>
                <span className='location-label js-option'>Bank Mandiri</span>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Rekening Pengirim</label>
              <p className='control detail-address'>
                <input className='input' type='text' value='082198475957830' />
              </p>
            </div>
            <div className='field'>
              <div className='add-product'>
                <p><strong>Upload bukti Transfer Anda</strong></p>
                <ul className='add-photo-list'>
                  <li>
                    <a className='add-photo'><span className='icon-add-big' /></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='field'>
              <a className='button is-primary is-large is-fullwidth js-option' data-target='#aditAddress'>Konfirmasikan Pembayaran</a>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentConfirmation)
