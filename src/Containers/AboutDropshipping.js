// @flow
import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// components
// actions
import * as storesActions from '../actions/stores'

class AboutDropshipping extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dropshipfaq: props.dropshipfaq || null,
      collapse: {}
    }
    this.fetchingFirst = false
  }

  handleCollapse (e, index) {
    e.preventDefault()
    const { collapse } = this.state
    const newState = { collapse }
    newState.collapse[index] = !collapse[index]
    this.setState(newState)
  }

  toProductAddFromDropshipper (e) {
    e.preventDefault()
    Router.push(`/dropship`)
  }

  componentDidMount () {
    if (!this.state.dropshipfaq.isFound) {
      NProgress.start()
      this.fetchingFirst = true
      this.props.getDropshipperFaq()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { dropshipfaq } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(dropshipfaq) && this.fetchingFirst) {
      this.fetchingFirst = false
      NProgress.done()
      if (isFound(dropshipfaq)) {
        let collapse = {}
        dropshipfaq.faq.map((data, i) => {
          collapse[`${i}`] = false
        })
        this.setState({ dropshipfaq, collapse })
      }
      if (isError(dropshipfaq)) {
        this.setState({ notification: notifError(dropshipfaq.message) })
      }
    }
  }

  render () {
    const { collapse, dropshipfaq } = this.state
    if (!dropshipfaq.isFound) return null
    return (
      <div>
        <section className='section is-paddingless'>
          <div className='form-product'>
            <div className='main-collapse'>
              { dropshipfaq.faq.map((data, i) => {
                return (
                  <div className={`collpase-content ${collapse[i] && 'active'}`}
                    onClick={(e) => this.handleCollapse(e, i)} key={i}>
                    <a className='js-collapse collapse-title'>{data.question} <span className='icon-arrow-down' /></a>
                    <div className={`collapse-body ${collapse[i] && 'collapsed'}`}>
                      <div className='collapse-in'>
                        { data.answer.split('\n').map((item, key) => {
                          return (
                            <span key={key}>
                              {item}
                              <br />
                            </span>
                          )
                        })
                        }
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                { this.props.query.type !== 'dropshipOption' ? <a className='button is-primary is-large is-fullwidth'
                  onClick={(e) => this.toProductAddFromDropshipper(e)}>
                  Saya Mengerti, Lanjutkan Proses
                  </a> : ''
                }
              </li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dropshipfaq: state.dropshipfaq
})

const mapDispatchToProps = dispatch => ({
  getDropshipperFaq: () => dispatch(storesActions.getDropshipperFaq())
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutDropshipping)
