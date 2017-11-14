// @flow
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'
import NProgress from 'nprogress'
// components
import Router from 'next/router'
import Loading from '../../Components/Loading'
import Images from '../../Themes/Images'
import MyImage from '../../Components/MyImage'
import Notification from '../../Components/Notification'
// actions
import * as userAction from '../../actions/user'
// services
import { validateResponseAlter } from '../../Services/Status'

const TAB_UNRESOLVED_RESOLUTION = 'TAB_UNRESOLVED_RESOLUTION'
const TAB_RESOLVED_RESOLUTION = 'TAB_RESOLVED_RESOLUTION'

class ResolutionCenter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unresolvedResolutions: props.unresolvedResolutions || null,
      resolvedResolutions: props.resolvedResolutions || null,
      tabs: TAB_UNRESOLVED_RESOLUTION,
      pagination: {
        page: 1,
        limit: 10
      },
      pagination2: {
        page: 1,
        limit: 10
      },
      notification: {
        type: 'is-success',
        status: false,
        message: 'Error, default message.'
      }
    }
    this.hasMore = { unresolvedResolutions: false, resolvedResolutions: false }
    this.fetching = { unresolvedResolutions: false, resolvedResolutions: false }
    this.fetchingFirst = { unresolvedResolutions: false, resolvedResolutions: false }
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
    let { pagination } = this.state
    if (!this.fetching.buyerMessages) {
      const newState = { pagination }
      pagination['page'] = pagination.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, buyerMessages: true }
      await this.props.getUnresolvedResolutions(this.state.pagination)
    }
  }

  async loadMoreResolvedResolutions () {
    let { pagination2 } = this.state
    if (!this.fetching.archiveBuyerMessages) {
      const newState = { pagination2 }
      pagination2['page'] = pagination2.page + 1
      this.setState(newState)
      this.fetching = { ...this.fetching, archiveBuyerMessages: true }
      await this.props.getResolvedResolutions(this.state.pagination2)
    }
  }

  componentDidMount () {
    NProgress.start()
    this.fetchingFirst = { unresolvedResolutions: true, resolvedResolutions: true }
    this.props.getUnresolvedResolutions(this.state.pagination)
    this.props.getResolvedResolutions(this.state.pagination2)
  }

  componentWillReceiveProps (nextProps) {
    const { query, isFetching, isFound, isError, notifError } = this.props
    const { unresolvedResolutions, resolvedResolutions, createResolution } = nextProps

    if (!isFetching(unresolvedResolutions) && this.fetchingFirst.unresolvedResolutions) {
      NProgress.done()
      this.fetchingFirst = { ...this.fetchingFirst, unresolvedResolutions: false }
      if (isFound(unresolvedResolutions)) {
        this.setState({ unresolvedResolutions })
        this.hasMore = { ...this.hasMore, unresolvedResolutions: unresolvedResolutions.resolutions.length > 9 }
      }
      if (isError(unresolvedResolutions)) {
        this.setState({ notification: notifError(unresolvedResolutions.message) })
      }
    }

    if (!isFetching(unresolvedResolutions) && this.fetching.unresolvedResolutions) {
      this.fetching = { ...this.fetching, unresolvedResolutions: false }
      let stateUnresolvedResolutions = this.state.unresolvedResolutions
      if (isFound(unresolvedResolutions)) {
        this.hasMore = { ...this.hasMore, unresolvedResolutions: unresolvedResolutions.resolutions.length > 9 }
        stateUnresolvedResolutions.resolutions = stateUnresolvedResolutions.resolutions.concat(unresolvedResolutions.resolutions)
        this.setState({ unresolvedResolutions: stateUnresolvedResolutions })
      }
      if (isError(unresolvedResolutions)) {
        this.setState({ notification: notifError(unresolvedResolutions.message) })
        this.hasMore = { ...this.hasMore, unresolvedResolutions: false }
      }
    }

    if (!isFetching(resolvedResolutions) && this.fetchingFirst.resolvedResolutions) {
      NProgress.done()
      this.fetchingFirst = { ...this.fetchingFirst, resolvedResolutions: false }
      if (isFound(resolvedResolutions)) {
        this.setState({ resolvedResolutions })
        this.hasMore = { ...this.hasMore, resolvedResolutions: resolvedResolutions.resolutions.length > 9 }
      }
      if (isError(resolvedResolutions)) {
        this.setState({ notification: notifError(resolvedResolutions.message) })
      }
    }

    if (!isFetching(resolvedResolutions) && this.fetching.resolvedResolutions) {
      this.fetching = { ...this.fetching, resolvedResolutions: false }
      let stateResolvedResolutions = this.state.resolvedResolutions
      if (isFound(resolvedResolutions)) {
        this.hasMore = { ...this.hasMore, resolvedResolutions: resolvedResolutions.resolutions.length > 9 }
        stateResolvedResolutions.resolutions = stateResolvedResolutions.resolutions.concat(resolvedResolutions.resolutions)
        this.setState({ resolvedResolutions: stateResolvedResolutions })
      }
      if (isError(resolvedResolutions)) {
        this.setState({ notification: notifError(resolvedResolutions.message) })
        this.hasMore = { ...this.hasMore, resolvedResolutions: false }
      }
    }

    if (query.hasOwnProperty('create')) {
      this.setState({ notification: validateResponseAlter(createResolution, 'Berhasil menambahkan Resolusi', 'Gagal menambahkan Resolusi') })
    }
  }

  render () {
    const { notification, tabs, unresolvedResolutions, resolvedResolutions } = this.state
    return (
      <div>
        <div className='nav-tabs'>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_UNRESOLVED_RESOLUTION && 'active'}>
            <span className='text'>Menunggu</span>
          </a>
          <a onClick={(e) => this.switchTab(e)} className={tabs === TAB_RESOLVED_RESOLUTION && 'active'}>
            <span className='text'>Terselesaikan
              {resolvedResolutions.isFound && resolvedResolutions.resolutions.length !== 0 && <span className='notif-complaint'><span> {resolvedResolutions.resolutions.length} </span></span>}
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
                  hasMore={this.hasMore.unresolvedResolutions}
                  loadMore={() => this.loadMoreUnresolvedResolutions()}
                  resolutionDetail={(id) => this.resolutionDetail(id)}
                  topicType={(topic) => this.topicType(topic)} />
                : <ListResolvedResolution
                  resolvedResolutions={resolvedResolutions}
                  hasMore={this.hasMore.resolvedResolutions}
                  loadMore={() => this.loadMoreResolvedResolutions()}
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
          loadMore={_.debounce(props.loadMore.bind(this), 500)}
          hasMore={props.hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            unresolvedResolutions.resolutions.map((resolution, i) => {
              return (
                <section className='section is-paddingless has-shadow' key={i}>
                  <div className='discuss' onClick={() => props.resolutionDetail(resolution.id)}>
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
        ? <InfiniteScroll
          pageStart={0}
          loadMore={_.debounce(props.loadMore.bind(this), 500)}
          hasMore={props.hasMore}
          loader={<Loading size={12} color='#ef5656' className='is-fullwidth has-text-centered' />}>
          {
            resolvedResolutions.resolutions.map((resolution, i) => {
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
          }
        </InfiniteScroll>
        : <EmptyResolution />
      }
    </div>
  )
}

const EmptyResolution = () => {
  return (
    <div className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyStatesResolusi} alt='komuto' />
          <br /><br />
          <p><strong className='bold'>Pusat Resolusi Kosong</strong></p>
          <p>Anda belum memiliki hal untuk didiskusikan penyelesaian masalahnya</p>
        </div>
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
