import React, { Component } from 'react'
import { connect } from 'react-redux'
// component
import Content from '../Components/Content'
import Wizard from '../Components/Wizard'

class ProductAddStepFour extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <Content>
        <section className='section is-paddingless has-shadow'>
          <Wizard total={4} active={4} />
          <div className='note'>
            Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang
          </div>
          <div className='filter-option active'>
            <div className='sort-list check-all top'>
              <label className='checkbox'>
                <span className='sort-text'>Pilih Semua</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
              <div className='eks-name'>
                <span>TIKI</span>
                <span>
                  <img src='../images/tiki.png' alt='' />
                </span>
              </div>
            </div>
            <div className='sort-list check-list left'>
              <label className='checkbox'>
                <span className='sort-text'>TIKI ONS (Over Night Service)</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
              <label className='checkbox'>
                <span className='sort-text'>TIKI Reguler</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
              <label className='checkbox'>
                <span className='sort-text'>TIKI Ekonomi</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
              <label className='checkbox'>
                <span className='sort-text'>TIKI HDS</span>
                <span className='input-wrapper'>
                  <input type='checkbox' />
                </span>
              </label>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <a className='button is-primary is-large is-fullwidth'>Lanjutkan</a>
              </li>
            </ul>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepFour)
