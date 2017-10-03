// @flow
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import Loading from '../Components/Loading'
import Images from '../Themes/Images'
import Notification from '../Components/Notification'
// actions
import * as userAction from '../actions/user'
// services
import { isFetching, validateResponse, validateResponseAlter } from '../Services/Status'

const TAB_UNRESOLVED_RESOLUTION = 'TAB_UNRESOLVED_RESOLUTION'
const TAB_RESOLVED_RESOLUTION = 'TAB_RESOLVED_RESOLUTION'

class ResolutionCenter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unresolvedResolutions: props.unresolvedResolutions || null,
      resolvedResolutions: props.resolvedResolutions || null,
      tabs: TAB_UNRESOLVED_RESOLUTION,
      hasMore: true,
      fetchUnresolved: false,
      fetchingFirst: false,
      pagination: {
        page: 1,
        limit: 10
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.isAddNewUnresolved = false
  }

  switchTab (e) {
    const { tabs } = this.state
    this.setState({ tabs: (tabs === TAB_UNRESOLVED_RESOLUTION) ? TAB_RESOLVED_RESOLUTION : TAB_UNRESOLVED_RESOLUTION })
  }

  resolutionDetail (id) {
    Router.push(`/resolution-detail?id=${id}`)
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

  async loadMoreUnresolvedResolutions () {
    let { pagination, fetchUnresolved } = this.state
    if (!fetchUnresolved) {
      const newState = { pagination, fetchUnresolved: true }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      await this.props.getUnresolvedResolutions({ page: 2, limit: 10 })
    }
  }

  componentDidMount () {
    NProgress.start()
    this.setState({ fetchingFirst: true })
    this.props.getUnresolvedResolutions({ page: 1, limit: 10 })
    this.props.getResolvedResolutions(this.state.pagination)
  }

  componentWillReceiveProps (nextProps) {
    const { query } = this.props
    let stateUnresolvedResolutions = this.state.unresolvedResolutions
    const { unresolvedResolutions, resolvedResolutions, createResolution } = nextProps
    if (!isFetching(unresolvedResolutions) && this.state.fetchingFirst) {
      this.setState({ unresolvedResolutions: unresolvedResolutions, fetchingFirst: false, notification: validateResponse(unresolvedResolutions, unresolvedResolutions.message) })
    }
    if (!isFetching(unresolvedResolutions) && this.state.fetchUnresolved) {
      this.setState({ fetchUnresolved: false, hasMore: false })
      if (unresolvedResolutions.resolutions.length === 0) {
        this.setState({ hasMore: false })
      } else {
        stateUnresolvedResolutions.resolutions.concat(unresolvedResolutions.resolutions)
        this.setState({ unresolvedResolutions: stateUnresolvedResolutions, notification: validateResponse(unresolvedResolutions, unresolvedResolutions.message) })
      }
    }
    if (!isFetching(resolvedResolutions)) {
      NProgress.done()

      this.setState({ resolvedResolutions: nextProps.resolvedResolutions, notification: validateResponse(resolvedResolutions, resolvedResolutions.message) })
    }
    if (query.hasOwnProperty('create')) {
      this.setState({ notification: validateResponseAlter(createResolution, 'Berhasil menambahkan Resolusi', 'Gagal menambahkan Resolusi') })
    }
    console.log('nextPropsMes', nextProps)
  }

  render () {
    console.log('state', this.state)
    const { notification, tabs, unresolvedResolutions, resolvedResolutions, hasMore } = this.state
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_UNRESOLVED_RESOLUTION && 'active'}>
            <span className='text'>Menunggu</span>
          </a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_RESOLVED_RESOLUTION && 'active'}>
            <span className='text'>Terselesaikan
              {resolvedResolutions.isFound && <span className='notif-complaint'><span> {resolvedResolutions.resolutions.length} </span></span>}
            </span>
          </a>
        </div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='discuss'>
            <ul className='notif-detail conversation bresolutioned'>
              {
                tabs === TAB_UNRESOLVED_RESOLUTION
                ? <ListUnresolvedResolution
                  unresolvedResolutions={unresolvedResolutions}
                  hasMore={hasMore}
                  isAddNewUnresolved={this.isAddNewUnresolved}
                  loadMoreUnresolvedResolution={() => this.loadMoreUnresolvedResolutions()}
                  resolutionDetail={(id) => this.resolutionDetail(id)}
                  topicType={(topic) => this.topicType(topic)} />
                : <ListResolvedResolution
                  resolvedResolutions={resolvedResolutions}
                  resolutionDetail={(id) => this.resolutionDetail(id)}
                  topicType={(topic) => this.topicType(topic)} />
              }
            </ul>
          </div>
        </section>
        <a className='sticky-button' onClick={() => Router.push(`/resolution-add`)}><span className='txt'>+</span></a>
      </div>
    )
  }
}

const ListUnresolvedResolution = (props) => {
  const { unresolvedResolutions } = props
  if (unresolvedResolutions === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        unresolvedResolutions.resolutions.length > 0
        ? <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMoreUnresolvedResolution.bind(this), 500)}
          hasMore={props.hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            unresolvedResolutions.resolutions.map((resolution, i) => {
              let sttNewUnresolved = props.isAddNewUnresolved && i === 0
              return (
                <section className='section is-paddingless has-shadow' key={i}>
                  <div className='discuss' onClick={() => props.resolutionDetail(resolution.id)}>
                    <ul className='main-discuss notif-detail'>
                      <li>
                        <div className={`box is-paddingless ${sttNewUnresolved && 'effect-slide-down'}`}>
                          <article className='media'>
                            <div className='media-content'>
                              <div className='content'>
                                <p className='user-name'>
                                  {resolution.title}
                                </p>
                              </div>
                              <label className='transaction'>{props.topicType(resolution.topic)}</label>
                              <span className='date-trans'>{moment.unix(resolution.created_at).format('DD MMMM YYYY')}</span>
                            </div>
                          </article>
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>
              )
            })
          }
        </InfiniteScroll>
        : <EmptyResolution />
      }
    </div>
  )
}

const ListResolvedResolution = (props) => {
  const { resolvedResolutions } = props
  if (resolvedResolutions === undefined) return null
  moment.locale('id')
  return (
    <div>
      {
        resolvedResolutions.resolutions.length > 0
        ? resolvedResolutions.resolutions.map((resolution, i) => {
          return (
            <section className='section is-paddingless has-shadow' key={i}>
              <div className='discuss' onClick={() => this.resolutionDetail(resolution.id)}>
                <ul className='main-discuss notif-detail'>
                  <li>
                    <div className='box is-paddingless'>
                      <article className='media'>
                        <div className='media-content'>
                          <div className='content'>
                            <p className='user-name'>
                              {resolution.title}
                            </p>
                          </div>
                          <label className='transaction'>{props.topicType(resolution.topic)}</label>
                          <span className='date-trans'>{moment.unix(resolution.created_at).format('DD MMMM YYYY')}</span>
                        </div>
                      </article>
                    </div>
                  </li>
                </ul>
                <div className='notif-admin'>
                  <span className='icon-notif-admin' />Dinyatakan selesai oleh Admin
                </div>
              </div>
            </section>
          )
        })
        : <EmptyResolution />
      }
    </div>
  )
}

const EmptyResolution = () => {
  return (
    <div className='container is-fluid'>
      <div className='desc has-text-centered'>
        <img src={Images.emptyStatesResolusi} alt='komuto' />
        <br /><br />
        <p><strong className='bold'>Pusat Resolusi Kosong</strong></p>
        <p>Anda belum memiliki hal untuk didiskusikan penyelesaian masalahnya</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    createResolution: state.createResolution,
    unresolvedResolutions: state.unresolvedResolutions,
    resolvedResolutions: state.resolvedResolutions
  }
}

const mapDispatchToProps = dispatch => ({
  getUnresolvedResolutions: (params) => dispatch(userAction.getUnresolvedResolutions(params)),
  getResolvedResolutions: (params) => dispatch(userAction.getResolvedResolutions(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResolutionCenter)
