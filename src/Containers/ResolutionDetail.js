// @flow
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
// components
import Notification from '../Components/Notification'
// actions
import * as userAction from '../actions/user'
// services
import { isFetching, validateResponse, validateResponseAlter } from '../Services/Status'

const TAB_INFORMATION = 'TAB_INFORMATION'
const TAB_DISCUSTION_SOLUTION = 'TAB_DISCUSTION_SOLUTION'

class ResolutionDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.query.id || null,
      resolutionDetail: props.resolutionDetail || null,
      tabs: TAB_INFORMATION,
      message: '',
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.afterSendMessage = false
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_INFORMATION) ? TAB_DISCUSTION_SOLUTION : TAB_INFORMATION })
  }

  topicType (topic) {
    switch (topic) {
      case 1: {
        return 'Umum'
      }
      case 2: {
        return 'Info'
      }
      case 3: {
        return 'Transaksi'
      }
      case 4: {
        return 'Lainnya'
      }
      default:
        break
    }
  }

  priorityType (priority) {
    switch (priority) {
      case 1: {
        return 'Low'
      }
      case 2: {
        return 'Medium'
      }
      case 3: {
        return 'High'
      }
      default:
        break
    }
  }

  statusType (status) {
    switch (status) {
      case 0: {
        return 'Close'
      }
      case 1: {
        return 'Open'
      }
      case 2: {
        return 'Menunggu alasan'
      }
      default:
        break
    }
  }

  handleInput (e) {
    const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    this.setState({ message: value })
  }

  async submitMessage (e) {
    const { id, message } = this.state
    if (e.key === 'Enter') {
      if (this.state.message !== '') {
        this.afterSendMessage = true
        await this.props.replyResolution({ id: id, message: message })
        this.setState({ message: '' })
      }
    }
  }

  componentDidMount () {
    const { id } = this.state
    if (id !== '') {
      this.props.getResolutionDetail({ id })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { resolutionDetail, dataReplyResolution } = nextProps
    if (!isFetching(resolutionDetail)) {
      this.setState({ resolutionDetail: nextProps.resolutionDetail, notification: validateResponse(resolutionDetail, resolutionDetail.message) })
    }
    if (!isFetching(dataReplyResolution) && this.afterSendMessage) {
      this.afterSendMessage = false
      if (dataReplyResolution.isFound) {
        this.setState({ resolutionDetail: dataReplyResolution })
      }
      this.setState({ notification: validateResponseAlter(dataReplyResolution, 'Berhasil mengirim Pesan', 'Gagal mengirim pesan') })
    }
  }

  render () {
    // console.log('state', this.state)
    const { notification, tabs, resolutionDetail, message } = this.state
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_INFORMATION && 'active'}>Informasi</a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_DISCUSTION_SOLUTION && 'active'}>Diskusi Solusi</a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation bordered'>
              {
                tabs === TAB_INFORMATION
                ? <InformationResolution
                  resolutionDetail={resolutionDetail}
                  topicType={(topic) => this.topicType(topic)}
                  statusType={(status) => this.statusType(status)}
                  priorityType={(priority) => this.priorityType(priority)} />
                : <ListDiscustionSolutions
                  resolutionDetails={resolutionDetail}
                  message={message}
                  afterSendMessage={this.afterSendMessage}
                  handleInput={(e) => this.handleInput(e)}
                  submitMessage={(e) => this.submitMessage(e)} />
              }
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const InformationResolution = (props) => {
  const { resolutionDetail } = props
  if (resolutionDetail === undefined) return null
  moment.locale('id')
  return (
    <div>
      <section className='section is-paddingless has-shadow'>
        <div className='info-purchase status'>
          <div className='detail-rate'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column is-half'>
                <div className='rating-content'>
                  <strong>Status Barang</strong>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content item-qty'>
                  <div className='item-status md reject'>{props.statusType(resolutionDetail.resolution.status)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='info-purchase status'>
          <div className='detail-rate'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column is-half'>
                <div className='rating-content'>
                  <strong>Prioritas</strong>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content'>
                  <div>{props.priorityType(resolutionDetail.resolution.priority)} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section is-paddingless has-shadow'>
        <div className='discuss'>
          <ul className='main-discuss notif-detail'>
            <li>
              <div className='box is-paddingless'>
                <article className='media'>
                  <div className='media-content'>
                    <div className='content'>
                      <p className='user-name'>
                        {resolutionDetail.resolution.title}
                      </p>
                    </div>
                    <label className='transaction'>{props.topicType(resolutionDetail.resolution.topic)}</label>
                    <span className='date-trans'>{moment.unix(resolutionDetail.resolution.created_at).format('DD MMMM YYYY')}</span>
                  </div>
                </article>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section className='section is-paddingless has-shadow'>
        <div className='info-purchase'>
          <div className='detail-rate'>
            <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='rating-content'>
                  <h3 className='title-content'>Keluhan</h3>
                </div>
                <div className='complaint'>
                  {resolutionDetail.isFound && resolutionDetail.resolution.discussions[0].message}
                </div>
              </div>
            </div>
            <div className='list-items'>
              <div className='columns is-mobile is-multiline'>
                { resolutionDetail.resolution.images
                  ? resolutionDetail.resolution.images.map((image, i) => {
                    return (
                      <div className='column' key={i}>
                        <img src={image.file} alt='pict' />
                      </div>
                    )
                  })
                  : ''
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const ListDiscustionSolutions = (props) => {
  const { resolutionDetails } = props
  if (resolutionDetails === undefined) return null
  moment.locale('id')
  return (
    <div>
      <section className='section is-paddingless'>
        <div className='discuss'>
          <ul className='notif-detail conversation bordered'>
            { resolutionDetails.resolution.discussions.map((res, i) => {
              return (
                <li key={i}>
                  <div className='box is-paddingless'>
                    <article className='media'>
                      <div className='media-left top sm'>
                        <figure className='image user-pict'>
                          <img src='' alt='pict' />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <p className='user-name'>
                            <strong>{res.name}</strong>
                            {res.message}
                          </p>
                        </div>
                        <span className='time-discuss'>{moment.unix(res.created_at).format('DD MMM YYYY h:mm')}</span>
                      </div>
                    </article>
                  </div>
                </li>
              )
            })
            }
          </ul>
        </div>
      </section>
      <div className='add-comment'>
        <div className='field'>
          <p className='control'>
            <textarea
              name='message'
              onChange={(e) => props.handleInput(e)}
              value={props.message}
              onKeyPress={(e) => props.submitMessage(e)}
              className='textarea' placeholder='Tulis pesan Anda disini' />
          </p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    resolutionDetail: state.resolutionDetail,
    dataReplyResolution: state.replyResolution
  }
}

const mapDispatchToProps = dispatch => ({
  getResolutionDetail: (params) => dispatch(userAction.getResolutionDetail(params)),
  replyResolution: (params) => dispatch(userAction.replyResolution(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResolutionDetail)
