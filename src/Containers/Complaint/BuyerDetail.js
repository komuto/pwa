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
import { ButtonFullWidth } from '../../Components/Button'
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

class Detail extends Component {
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
        callBack: () => Router.push('/complaint?type=buyer', '/complaint/buyer'),
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

  scrollToBottom () {
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
    let href = `/complaint?type=buyer&id=${this.state.id}&tab=${params}`
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
        console.log('buyerComplainedOrderDetail: ', buyerComplainedOrderDetail)
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
      if (nextTab === TabsName[1]) {
        this.scrollToBottom()
      }
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
  /**
   * SolutionType :
   * REFUND: 1
   * EXCHANGE: 2
   */

  /**
   * DisputeResponseStatus :
   * NO_RESPONSE_YET: 0
   * BUYER_WIN: 1
   * SELLER_WIN: 2
   */

  /**
   * DisputeStatus :
   * NEW: 1
   * READ_BY_USER: 2
   * SEND_BY_BUYER: 3
   * RECEIVE_BY_SELLER: 4
   * SEND_BY_SELLER: 5
   * RECEIVE_BY_BUYER: 6
   * PROCESS_OF_REFUND: 7
   * CLOSED: 8
   * REVIEWED: 9
   */
  /** is refund  */
  let isRefund = orderDetail.solution === 1
  /** complaint no respon */
  let isComplaintNewRefund = isRefund && (orderDetail.response_status === 0 && orderDetail.status === 1)
  /** complaint product received by seller */
  let isComplaintReceivedRefund = isRefund && (orderDetail.response_status === 0 && orderDetail.status === 4)
  /** complaint finish need review */
  let isComplaintNeedReviewRefund = isRefund && (orderDetail.response_status !== 0 && orderDetail.status === 8)
  /** complaint finish */
  let isComplaintDoneRefund = isRefund && (orderDetail.response_status !== 0 && orderDetail.status === 9)

  /** is exchange  */
  let isExchange = orderDetail.solution === 2
  /** complaint no respon */
  let isComplaintNewExchange = isExchange && (orderDetail.response_status === 0 && orderDetail.status === 1)
  /** product send by sellet */
  let isSendBySellerExchange = isExchange && (orderDetail.response_status === 0 && orderDetail.status === 5)

  return (
    <Content>
      {
        isExchange &&
        <Section className='has-shadow'>
          {/* -- exchange-- */}
          { isComplaintNewExchange && <ComplaintNewExchange /> }
          { isSendBySellerExchange && <SendBySellerExchange /> }
          { isSendBySellerExchange && <Item title='No Resi' data={orderDetail.airway_bill} type='standard' /> }
          { isSendBySellerExchange && <Item title='Status Resi' data={'NULL'} type='standard' /> }
          <div className='info-purchase'>
            <div className='detail-rate is-purchase'>
              <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
                <div className='column'>
                  <a className='button is-primary is-large is-fullwidth js-option'>Barang sudah saya terima</a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      }
      <Section className='has-shadow'>
        {/* -- refund -- */}
        { isComplaintNewRefund && <ComplaintNewRefund /> }
        { isComplaintReceivedRefund && <ComplaintReceivedRefund /> }
        { isComplaintNeedReviewRefund && <ComplaintReviewRefund id={orderDetail.id} /> }
        { isComplaintDoneRefund && <ComplaintDoneRefund /> }
        <Item title='No Invoice' data={orderDetail.invoice.invoice_number} type='standard' />
        <Item title='Tanggal Transaksi' data={createdAt} type='standard' />
        <Item title='Status Komplain' data={isComplaintDoneRefund ? <SolutionDone /> : <SolutionWaiting />} type='status' />
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
export const Item = ({ title, data, type, children }) => (
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

// --------- EXCHANGE --------- //

/** complaint no proccess */
const ComplaintNewExchange = () => (
  <NotifWrapper
    notifClass={`notif-payment`}
    icon={Images.IconInfoYellow}
    message='Anda memilih solusi Tukar Barang, untuk itu Anda harus mengirim barang kembali ke Seller, paling lambat tanggal 5 September 2017. atau admin akan mengirimkan dana ke Seller' />
)

/** product send by seller */
const SendBySellerExchange = () => (
  <NotifWrapper
    notifClass={`notif-payment-waiting`}
    icon={Images.IconInfoBlue}
    message='Penjual telah mengirim ulang barang. Klik tombol "barang sudah saya terima" setelah Anda menerima barang tersebut.' />
)

// --------- REFUND --------- //

/** complaint no proccess */
const ComplaintNewRefund = () => (
  <NotifWrapper
    notifClass={`notif-payment`}
    icon={Images.IconInfoYellow}
    message='Anda memilih solusi Refund Dana, untuk itu Anda harus mengirim barang kembali ke Seller, paling lambat tanggal 5 September 2017. atau admin akan mengirimkan dana ke Seller' />
)

/** complaint product received by seller */
const ComplaintReceivedRefund = () => (
  <NotifWrapper
    notifClass={`notif-payment-waiting`}
    icon={Images.IconInfoBlue}
    message='Terimakasih telah bersifat kooperatif. Kini Admin akan mengirimkan kembali uang Anda. Dan segera setelah itu Admin akan menandai komplain ini sudah terselesaikan.' />
)

/** complaint finish */
const ComplaintDoneRefund = () => (
  <NotifWrapper
    notifClass={`notif-payment-success`}
    icon={Images.paymentDone}
    message='Komplain telah terselesaikan' />
)

/** complaint finish but need review for fine product */
const ComplaintReviewRefund = ({ id }) => (
  <Section className='has-shadow'>
    <NotifWrapper
      notifClass={`notif-payment-waiting`}
      icon={Images.IconInfoBlue}
      message='Silahkan mengisi review dari beberapa barang di invoice ini, setelah itu kami akan mengirim dana refund ke saldo Anda.' />
    <div className='info-purchase'>
      <ButtonFullWidth
        isLoading={false}
        onClick={() => Router.push(`/complaint?type=buyer&id=${id}&sub=review`, '/complaint/buyer/37/review')}
        text='Beri review untuk barang lainya' />
    </div>
  </Section>
)

const NotifWrapper = ({ notifClass, icon, message }) => (
  <NotificationBox
    notifClass={notifClass}
    icon={icon}>
    <p>
      <strong>
        { message }
      </strong>
    </p>
  </NotificationBox>
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
export const SolutionWaiting = () => (<div className='item-status md right reject'>Menunggu Penyelesaian</div>)

/** content when solution is done */
export const SolutionDone = () => (<div className='item-status md right accepted'>Terselesaikan</div>)

/** content seller */
export const SellerInfo = ({store}) => (
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
