import React, { Component } from 'react'
import Img from 'react-image'
// themes
import Images from '../Themes/Images'
// components
import Section from '../Components/Section'

class ProductDetailRule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openTerms: false
    }
  }

  openTerms = () => this.setState({ openTerms: !this.state.openTerms })

  render () {
    const { store } = this.props
    const { openTerms } = this.state
    const loader = <img src={Images.loading} />
    const unloader = <img src={Images.loadingFailed} />

    return (
      <Section className='section is-paddingless has-shadow'>
        <div className='info-product'>
          <div className='detail-rate'>
            <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
              <div className='column is-half'>
                <div className='rating-content is-left'>
                  <div className='box'>
                    <div className='media'>
                      <div className='media-left'>
                        <figure className='image'>
                          <a>
                            <Img
                              src={store.logo}
                              loader={loader}
                              unloader={unloader} />
                          </a>
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <h4> { store.name }
                            <span className={`icon-verified ${!store.is_verified ? 'unverified' : ''}`} />
                          </h4>
                          <div className='detail'>
                            <p> { store.province.name }</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='column is-half'>
                <div className='rating-content is-left'>
                  <a className='button is-primary is-outlined'><span className='icon-selected-sign' /> Di Favoritkan</a>
                </div>
              </div>
            </div>
          </div>
          <div className='detail-rate'>
            <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='rating-content is-left'>
                  <h3>Terms and Conditions</h3>
                  <div className={`desc-wrapp ${openTerms ? 'open' : ''}`}>
                    { store.term_condition }
                  </div>
                  <a className={`js-desc open-desc has-text-centered ${openTerms ? 'close' : ''}`} onClick={() => this.openTerms()}><span className='icon-arrow-down' /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    )
  }
}

export default ProductDetailRule
