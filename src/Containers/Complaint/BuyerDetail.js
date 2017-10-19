/**
 * Safei Muslim
 * Yogyakarta , 17 Oktober 2017
 * PT Skyshi Digital Indonesa
 */

/** including dependencies */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
import { animateScroll } from 'react-scroll'
import moment from 'moment'
/** including component */
import Comment from '../../Components/Comment'
import Content from '../../Components/Content'
import Section from '../../Components/Section'
import Notification, { NotificationBox } from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
import Card, { WrapperMedia, WrapperMediaColoumn, WrapperInfo } from '../../Components/Card'
import { Navbar, Navtab } from '../Navbar'
/** including actions */
import * as transactionActions from '../../actions/transaction'
/** including custom lib */
// import RupiahFormat from '../../Lib/RupiahFormat'
/** including validations */
import * as validations from '../../Validations/Input'
/** including themes */
import Images from '../../Themes/Images'

class Buyer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: {
        data: [],
        onChange: (e) => this.onChangeComment(e),
        onEnter: (e) => this.onEnterComment(e),
        value: '',
        submitting: false
      },
      tab: props.query.tab || TabsName[0],
      id: props.query.id,
      buyerComplainedOrderDetail: props.buyerComplainedOrderDetail || null,
      notification: props.notification
    }

    this.submitting = {
      buyerComplainedOrderDetail: false,
      comment: false
    }
    moment.locale('id')
  }

  render () {
    let { buyerComplainedOrderDetail, tab, notification } = this.state
    let { isFound } = this.props
    let params = {
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/complaint-buyer', '/complaint/buyer'),
        textPath: 'Detail Komplain Barang'
      },
      navtab: {
        active: tab,
        onSelect: (params) => this.selectedTab(params),
        items: [
          {
            name: TabsName[0],
            notif: 0
          },
          {
            name: TabsName[1],
            notif: 0
          }
        ]
      }
    }

    return (
      <Content>
        <Navbar {...params} />
        <Navtab {...params.navtab} />
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        {
          isFound(buyerComplainedOrderDetail) &&
          <BuyerDetailContent {...this.state} />
        }
      </Content>
    )
  }

  scrollToBottom = () => {
    animateScroll.scrollToBottom()
  }

  onChangeComment (e) {
    e.preventDefault()
    this.setState({
      comment: {
        ...this.state.comment,
        value: validations.inputNormal(e.target.value)
      }
    })
  }

  onEnterComment (e) {
    if (e.key === 'Enter') {
      /** check login status */
      if (this.props.isLogin) {
        let { id } = this.state
        let { value, submitting } = this.state.comment
        if (value !== '' && !submitting) {
          this.props.createComplaintDiscussionBuyer({ id, content: value })
          this.setState({
            comment: {
              ...this.state.comment,
              submitting: true
            }
          })
        }
      } else {
        this.props.alertLogin()
      }
    }
  }

  selectedTab (params) {
    let href = `/complaint-buyer-detail?id=${this.state.id}&tab=${params}`
    let as = `/complaint/buyer/${this.state.id}?tab=${params}`
    Router.push(href, as)
  }

  componentDidMount () {
    NProgress.start()
    let { id } = this.state
    this.submitting = { ...this.submitting, buyerComplainedOrderDetail: true }
    this.props.getComplainedOrderDetailBuyer({ id })
  }

  componentWillReceiveProps (nextProps) {
    const { buyerComplainedOrderDetail, buyerComplaintDiscussion } = nextProps
    const { isFetching, isError, isFound, notifError } = this.props

    /** handling state status complaint resolved true */
    if (!isFetching(buyerComplainedOrderDetail) && this.submitting.buyerComplainedOrderDetail) {
      NProgress.done()
      this.submitting = { ...this.submitting, buyerComplainedOrderDetail: false }
      if (isError(buyerComplainedOrderDetail)) {
        this.setState({ notification: notifError(buyerComplainedOrderDetail.message) })
      }
      if (isFound(buyerComplainedOrderDetail)) {
        this.setState({
          buyerComplainedOrderDetail,
          comment: {
            ...this.state.comment,
            data: [...buyerComplainedOrderDetail.orderDetail.discussions]
          }
        })
      }
    }

    /** add new discussion */
    if (!isFetching(buyerComplaintDiscussion) && this.state.comment.submitting) {
      if (isError(buyerComplaintDiscussion)) {
        this.setState({ notification: notifError(buyerComplaintDiscussion.message) })
      }
      if (isFound(buyerComplaintDiscussion)) {
        this.setState({
          comment: {
            ...this.state.comment,
            submitting: false,
            value: '',
            data: [
              ...this.state.comment.data,
              buyerComplaintDiscussion.discussion
            ]
          }
        })
        this.scrollToBottom()
      }
    }

    /** switch tab */
    let oldTab = this.props.query.tab
    let nextTab = nextProps.query.tab
    if (oldTab !== nextTab) {
      this.setState({ tab: nextTab })
    }
  }
}

const BuyerDetailContent = ({ buyerComplainedOrderDetail, tab, comment }) => (
  <Content>
    {
      tab === TabsName[0]
      ? <DetailContent {...buyerComplainedOrderDetail} />
      : <DiscussionContent {...buyerComplainedOrderDetail} comment={comment} />
    }
  </Content>
)

const DetailContent = ({ orderDetail }) => {
  let createdAt = moment.unix(orderDetail.invoice.created_at).format('Do MMMM YYYY')
  // let isComplaintNew = (orderDetail.response_status === 0 && orderDetail.status === 1)
  // let isComplaintReceived = (orderDetail.response_status === 0 && orderDetail.status === 4)
  let isComplaintDone = (orderDetail.response_status !== 0 && orderDetail.status === 8)

  return (
    <Content>
      <Section className='has-shadow'>
        {
          isComplaintDone
          ? <NotificationBox
            notifClass={`notif-payment-success`}
            icon={Images.paymentDone}>
            <p>
              <strong>
                  Komplain telah terselesaikan
                </strong>
            </p>
          </NotificationBox>
          : <NotificationBox
            notifClass={`notif-payment`}
            icon={Images.IconInfoYellow}>
            <p>
              <strong>
                  Anda memilih solusi Refund Dana, untuk itu Anda harus mengirim barang kembali ke Seller ,
                  paling lambat tanggal 5 September 2017. atau admin akan mengirimkan dana ke Seller
                </strong>
            </p>
          </NotificationBox>
        }
        <Item title='No Invoice' data={orderDetail.invoice.invoice_number} type='standard' />
        <Item title='Tanggal Transaksi' data={createdAt} type='standard' />
        <Item title='Status Penyelesaian' data={isComplaintDone ? <SolutionDone /> : <SolutionWaiting />} type='status' />
        <Item title='Penjual' data={<SellerInfo {...orderDetail} />} type='custom' />
        <Item title='Solusi yang diinginkan' data={SolutionType[orderDetail.solution - 1]} type='standard' />
      </Section>
      <Card title='Barang bermasalah'>
        {
          orderDetail.dispute_products.map((product, index) =>
            <Media key={index} product={product} />
          )
        }
      </Card>
      <Card title='Masalah yang terjadi'>
        <Info text={orderDetail.problems} />
      </Card>
      <Card title='Foto Barang'>
        <WrapperMediaColoumn>
          {
            orderDetail.proofs.map((product, index) =>
              <Photo key={index} {...product} />
            )
          }
        </WrapperMediaColoumn>
      </Card>
      <Card title='Keterangan'>
        <Info text={orderDetail.note} />
      </Card>
    </Content>
  )
}

const DiscussionContent = ({ comment }) => <Comment {...comment} />

/** item component */
const Item = ({ title, data, type, children }) => (
  <div className='info-purchase'>
    <div className='detail-rate is-purchase'>
      <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
        <div className='column is-half'>
          <div className='rating-content is-left'>
            <strong> {title} </strong>
          </div>
        </div>
        {
          (type === 'standard' || type === 'status') &&
          <div className='column is-half'>
            <div className='rating-content item-qty has-text-right'>
              {
                type === 'standard' && <span className='has-text-left'>{data}</span>
              }
              {
                type === 'status' && data
              }
            </div>
          </div>
        }
        {
          type === 'custom' && data
        }
      </div>
    </div>
  </div>
)

/** media card content */
const Media = ({ product }) => (
  <WrapperMedia>
    <div className='media-left is-bordered'>
      <figure className='image list-transaction sm'>
        <a><MyImage src={product.image} alt='Image' /></a>
      </figure>
    </div>
    <div className='media-content middle'>
      <div className='content'>
        <h4> {product.name} </h4>
      </div>
    </div>
  </WrapperMedia>
)

const Photo = ({image}) => (
  <div className='media-left md-margin'>
    <figure className='image list-transaction lgx'>
      <a><MyImage src={image} alt='Image' /></a>
    </figure>
  </div>
)

/** info card content */
const Info = ({ text }) => (
  <WrapperInfo>
    <span>{ text }</span>
  </WrapperInfo>
)

/** define name tabs */
const TabsName = ['Detail', 'Diskusi']

/** define solution type */
const SolutionType = ['Refund Dana', 'Tukar Barang']

/** content when solution is waiting */
const SolutionWaiting = () => (<div className='item-status md right reject'>Menunggu Penyelesaian</div>)

/** content when solution is done */
const SolutionDone = () => (<div className='item-status md right accepted'>Terselesaikan</div>)

/** content seller */
const SellerInfo = ({store}) => (
  <ul className='seller-items'>
    <li>
      <a className='is-bordered inline-text'>
        <MyImage src={store.logo} alt={store.name} />
      </a>
      <strong>{ store.name }</strong>
    </li>
  </ul>
)

const mapStateToProps = (state) => ({
  buyerComplainedOrderDetail: state.buyerComplainedOrderDetail,
  buyerComplaintDiscussion: state.buyerComplaintDiscussion
})

const mapDispatchToProps = (dispatch) => ({
  getComplainedOrderDetailBuyer: (params) => dispatch(transactionActions.getComplainedOrderDetailBuyer(params)),
  createComplaintDiscussionBuyer: (params) => dispatch(transactionActions.createComplaintDiscussionBuyer(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Buyer)
