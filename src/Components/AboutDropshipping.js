// @flow
import React from 'react'
// components
import Router from 'next/router'
// actions

class AboutDropshipping extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      submitting: false,
      collapse: {
        collapse1: false,
        collapse2: false,
        collapse3: false,
        collapse4: false
      }
    }
  }

  handleCollapse (e, typeCollapse) {
    e.preventDefault()
    const { collapse } = this.state
    let newCollapse = { collapse }
    switch (typeCollapse) {
      case 'collapse1':
        newCollapse.collapse['collapse1'] = !collapse.collapse1
        this.setState(newCollapse)
        break
      case 'collapse2':
        newCollapse.collapse['collapse2'] = !collapse.collapse2
        this.setState(newCollapse)
        break
      case 'collapse3':
        newCollapse.collapse['collapse3'] = !collapse.collapse3
        this.setState(newCollapse)
        break
      case 'collapse4':
        newCollapse.collapse['collapse4'] = !collapse.collapse4
        this.setState(newCollapse)
        break
      default:
        break
    }
  }

  toProductAddFromDropshipper (e) {
    e.preventDefault()
    Router.push('/dropship')
  }

  render () {
    const { collapse } = this.state
    return (
      <div>
        <section className='section is-paddingless'>
          <div className='form-product'>
            <div className='main-collapse'>
              <div className={`collpase-content ${collapse.collapse1 && 'active'}`}
                onClick={(e) => this.handleCollapse(e, 'collapse1')}>
                <a className='js-collapse collapse-title'>Apa itu Dropshipping? <span className='icon-arrow-down' /></a>
                <div className={`collapse-body ${collapse.collapse1 && 'collapsed'}`}>
                  <div className='collapse-in'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  </div>
                </div>
              </div>
              <div className={`collpase-content ${collapse.collapse2 && 'active'}`}
                onClick={(e) => this.handleCollapse(e, 'collapse2')}>
                <a className='js-collapse collapse-title'>Berapa persen komisi yang reseller dapat? <span className='icon-arrow-down' /></a>
                <div className={`collapse-body ${collapse.collapse2 && 'collapsed'}`}>
                  <div className='collapse-in'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  </div>
                </div>
              </div>
              <div className={`collpase-content ${collapse.collapse3 && 'active'}`}
                onClick={(e) => this.handleCollapse(e, 'collapse3')}>
                <a className='js-collapse collapse-title'>Bagaimana jika ada yang bertanya tentang produk ini. siapa yang akan menjawab?. pemilik barang atau reseller? <span className='icon-arrow-down' /></a>
                <div className={`collapse-body ${collapse.collapse3 && 'collapsed'}`}>
                  <div className='collapse-in'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  </div>
                </div>
              </div>
              <div className={`collpase-content ${collapse.collapse4 && 'active'}`}
                onClick={(e) => this.handleCollapse(e, 'collapse4')}>
                <a className='js-collapse collapse-title'>Bagaimana jika terjadi refund? <span className='icon-arrow-down' /></a>
                <div className={`collapse-body ${collapse.collapse4 && 'collapsed'}`}>
                  <div className='collapse-in'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <a className='button is-primary is-large is-fullwidth'
                  onClick={(e) => this.toProductAddFromDropshipper(e)}>
                  Saya Mengerti, Lanjutkan Proses
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default AboutDropshipping
