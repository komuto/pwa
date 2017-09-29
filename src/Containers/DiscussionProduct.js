// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import moment from 'moment'
import NProgress from 'nprogress'
// components
import Images from '../Themes/Images'
import Notification from '../Components/Notification'
// actions
import * as userAction from '../actions/user'
// services
import { isFetching, validateResponse } from '../Services/Status'

class DiscussionProduct extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userDiscussion: props.userDiscussion || null,
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  detailDiscussion (id) {
    Router.push(`/discussion-product-detail?id=${id}`)
  }

  componentDidMount () {
    if (!this.state.userDiscussion.isFound) {
      NProgress.start()
      this.props.getDiscussion()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { userDiscussion } = nextProps
    if (!isFetching(userDiscussion)) {
      NProgress.done()
      this.setState({
        userDiscussion: nextProps.userDiscussion,
        notification: validateResponse(userDiscussion, userDiscussion.message)
      })
    }
  }

  renderListMessages () {
    const { userDiscussion } = this.state
    if (userDiscussion.isFound && userDiscussion.discussions.length > 0) {
      moment.locale('id')
      return userDiscussion.discussions.map((discussion, i) => {
        return (
          <li key={i} onClick={(id) => this.detailDiscussion(discussion.product.id)}>
            <div className='box is-paddingless'>
              <article className='media'>
                <div className='media-left top sm'>
                  <figure className='image user-pict'>
                    <img src={discussion.product.image} alt='pict' />
                  </figure>
                </div>
                <div className='media-content'>
                  <div className='content'>
                    <p className='user-name'>
                      <strong>{discussion.product.name}</strong>
                      {discussion.question}
                    </p>
                  </div>
                  <span className='time-discuss'>{moment.unix(discussion.created_at).format('h:mm')}</span>
                </div>
              </article>
            </div>
          </li>
        )
      })
    } else {
      return (
        <div className='container is-fluid'>
          <div className='desc has-text-centered'>
            <img src={Images.emptyStatesDiscussion} alt='komuto' />
            <br /><br />
            <p><strong className='bold'>Diskusi Produk Anda Kosong</strong></p>
            <p>Anda belum pernah melakukan tanya jawab kepada penjual untuk produk apapun</p>
          </div>
        </div>
      )
    }
  }

  render () {
    const { notification } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation bordered'>
              {this.renderListMessages()}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userDiscussion: state.userDiscussion
  }
}

const mapDispatchToProps = dispatch => ({
  getDiscussion: () => dispatch(userAction.getDiscussion())
})

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionProduct)
