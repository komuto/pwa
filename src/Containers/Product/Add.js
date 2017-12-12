import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
// components
import Content from '../../Components/Content'
import Notification from '../../Components/Notification'
// actions
import * as otherActions from '../../actions/other'

class Add extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      saleCount: props.saleCount,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.fetching = false
  }

  componentDidMount () {
    this.fetching = true
    this.props.getMarketPlaceCommission()
  }

  componentWillReceiveProps (nextProps) {
    const { saleCount } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props
    if (!isFetching(saleCount) && this.fetching) {
      this.fetching = false
      if (isFound(saleCount)) {
        this.setState({ saleCount })
      }
      if (isError(saleCount)) {
        this.setState({ notification: notifError(saleCount.message) })
      }
    }
    console.log('nextProps', nextProps)
  }

  render () {
    console.log('state', this.state)
    const { notification } = this.state
    return (
      <Content>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='add-product'>
            <div className='container is-fluid'>
              <div className='title'>
                <h3>Tentukan produk yang akan ditambah</h3>
              </div>
            </div>
            <div className='container is-fluid'>
              <ul className='add-option'>
                <li style={{ backgroundColor: 'white' }}>
                  <div className='box'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-upload-product' />
                        </figure>
                      </div>
                      <div className='media-content' onClick={() => Router.push('/product-add-step-one', '/product/add/one')}>
                        <div className='content'>
                          <p>
                            <strong>Upload Produk Baru</strong><br />
                            Tambahkan produk baru untuk dijual
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right black' />
                </li>
                <li style={{ backgroundColor: 'white' }} onClick={() => Router.push('/about-dropshipping')}>
                  <div className='box'>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <span className='icon-upload-dropshipper' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p>
                            <strong>Ambil dari Dropshipper</strong><br />
                            Ambil produk dari dropshipper. Dan Anda akan mendapat komisi penjualan hingga sebesar 2.5%
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                  <span className='icon-arrow-right' />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  saleCount: state.saleCount
})

const mapDispatchToProps = (dispatch) => ({
  getMarketPlaceCommission: () => dispatch(otherActions.getMarketPlaceCommission())
})

export default connect(mapStateToProps, mapDispatchToProps)(Add)
