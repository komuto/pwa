import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
import { animateScroll } from 'react-scroll'
// component
// import MyImage from '../../Components/MyImage'
import Content from '../../Components/Content'
import Wizard from '../../Components/Wizard'
import Modal, { Button } from '../../Components/Modal'
// libs
import RupiahFormat from '../../Lib/RupiahFormat'
// actions
import * as catalogActions from '../../actions/catalog'
import * as productActions from '../../actions/product'
import * as storesActions from '../../actions/stores'
// services
import { Status } from '../../Services/Status'

class ProductAddStepThree extends Component {
  constructor (props) {
    super(props)
    let { stepThree } = props.tempCreateProduct
    this.state = {
      createCatalog: {
        data: props.createCatalog || null,
        submiting: false
      },
      dropshipfaq: props.dropshipfaq || null,
      tempCreateProduct: props.tempCreateProduct || null,
      catalogs: {
        data: props.catalogs || null,
        show: false,
        form: {
          name: ''
        },
        error: null,
        errorMessage: 'Default, error message!'
      },
      form: {
        condition: 1,
        is_insurance: true,
        is_dropship: false,
        status: 1,
        is_wholesaler: false,
        wholesales: [],
        ...stepThree
      },
      wholesalesError: {
        index: 0,
        attribute: 'min',
        status: false,
        message: 'Error, default message'
      },
      error: null,
      aboutDropshiping: {
        isActive: false
      },
      collapse: {}
    }
    this.submiting = false
  }

  /** reset scroll */
  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
  }

  formHandling (e) {
    let { form, error } = this.state
    let { name, value } = e.target
    form[name] = value
    error = null
    if (name === 'discount' && value > 100) {
      error = 'discount'
    }
    this.setState({ form, error })
  }

  catalogOnChange (e) {
    this.setState({ catalogs: { ...this.state.catalogs, form: { name: e.target.value }, error: null } })
  }

  catalogPress () {
    this.setState({ catalogs: { ...this.state.catalogs, show: !this.state.catalogs.show } })
  }

  async catalogAddPress () {
    let { catalogs } = this.state
    catalogs.error = null

    if (catalogs.form.name === '') {
      catalogs.error = 'name'
      catalogs.errorMessage = 'Nama tidak boleh kosong'
      this.setState({ catalogs })
      return
    }
    NProgress.start()
    await this.props.addCatalog({ ...catalogs.form })
    this.setState({ createCatalog: { ...this.state.createCatalog, submiting: true } })
  }

  wholesaleAddPress (e) {
    const { form } = this.state
    form.wholesales.push({
      min: '',
      max: '',
      price: ''
    })
    this.setState({ form })
  }

  wholesaleRemovePress (index) {
    const { form } = this.state
    delete form.wholesales[index]
    this.setState({ form })
  }

  wholesaleHandling (e, index) {
    e.preventDefault()
    let { form, wholesalesError } = this.state
    let { name, value } = e.target
    if (name === 'min') {
      form.wholesales[index].min = value
    }

    if (name === 'max') {
      form.wholesales[index].max = value
    }

    if (name === 'price') {
      form.wholesales[index].price = value
    }
    wholesalesError = this.wholesaleErrorHandling(form.wholesales, index, name)
    this.setState({ form, wholesalesError })
  }

  wholesaleErrorHandling (wholesales, myIndex = null, attribute = null) {
    let errorDefault = {
      status: false
    }

    let errorMinOrder = {
      ...errorDefault,
      status: true,
      attribute: 'min',
      message: 'Min order tidak valid'
    }

    let errorMaxOrder = {
      ...errorDefault,
      status: true,
      attribute: 'max',
      message: 'Max order tidak valid'
    }

    for (let index = 0; index < wholesales.length; index++) {
      /**
       * before wholesales
       */
      let bw = wholesales[index - 1]
      let bwStatus = bw !== undefined
      let bwMaxOrder = ''
      if (bwStatus) {
        bwMaxOrder = bw.max !== '' ? Number(bw.max) : ''
      }
      /**
       * wholesales
       */
      let w = wholesales[index]
      let wMinOrder = w.min !== '' ? Number(w.min) : ''
      let wMaxOrder = w.max !== '' ? Number(w.max) : ''
      /**
       * after wholesales
       */
      let aw = wholesales[index + 1]
      let awStatus = aw !== undefined
      let awMinOrder = ''
      if (awStatus) {
        awMinOrder = aw.min !== '' ? Number(aw.min) : ''
      }
      /**
       * validate min order
       * jika min order lebih besar dari max order
       * jika min order kurang dari maxorder(bwMaxOrder) list data sebelumny
       */

      if ((attribute === 'min') && ((wMaxOrder !== '' && wMinOrder >= wMaxOrder) || ((bwStatus && bwMaxOrder !== '') && (wMinOrder < bwMaxOrder)))) {
        return {
          index,
          ...errorMinOrder
        }
      }

      /**
       * validate max order
       * jika max order lebih kecil dari min order
       * jika max order lebih besar dari min order(awMinOrder) list data setelahnya
       */
      if ((attribute === 'max') && ((wMinOrder !== '' && wMaxOrder <= wMinOrder) || ((awStatus && awMinOrder !== '') && (wMaxOrder > awMinOrder)))) {
        return {
          index,
          ...errorMaxOrder
        }
      }
    }

    return errorDefault
  }

  aboutDropshipingPress () {
    this.setState({
      aboutDropshiping: {
        ...this.state.aboutDropshiping,
        isActive: !this.state.aboutDropshiping.isActive
      }
    })
  }

  handleCollapse (e, index) {
    e.preventDefault()
    const { collapse } = this.state
    const newState = { collapse }
    newState.collapse[index] = !collapse[index]
    this.setState(newState)
  }

  onSumbit () {
    let { form, tempCreateProduct } = this.state

    if (form.price === undefined || form.price === '') {
      this.setState({ error: 'name' })
      return
    }

    if (form.weight === undefined || form.weight === '') {
      this.setState({ error: 'weight' })
      return
    }

    if (form.stock === undefined || form.stock === '') {
      this.setState({ error: 'stock' })
      return
    }

    // if (form.catalog_id === undefined || form.catalog_id === '') {
    //   this.setState({ error: 'catalog_id' })
    //   return
    // }

    this.submiting = true
    this.props.setTempCreateProduct({
      ...tempCreateProduct,
      stepThree: {
        ...form,
        isFound: true
      }
    })
  }

  componentDidMount () {
    this.scrollToTop()
    const { catalogs } = this.state
    if (!catalogs.isFound) {
      NProgress.start()
      this.props.getCatalogs()
      this.props.getDropshipperFaq()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { catalogs, createCatalog, tempCreateProduct, dropshipfaq } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
    if (!catalogs.isLoading) {
      NProgress.done()
      if (catalogs.status === Status.SUCCESS) this.setState({ catalogs: { ...this.state.catalogs, data: catalogs } })
      if (catalogs.status === Status.OFFLINE || catalogs.status === Status.FAILED) this.setState({ notification: {status: true, message: catalogs.message} })
    }

    if (!createCatalog.isLoading) {
      NProgress.done()
      if (createCatalog.status === Status.SUCCESS) {
        catalogs.catalogs.push(createCatalog.catalog)
        this.setState({
          createCatalog: { ...this.state.createCatalog, submiting: false },
          catalogs: { ...this.state.catalogs, data: catalogs, show: false },
          form: { ...this.state.form, catalog_id: createCatalog.catalog.id }
        })
        this.props.resetCreateCatalog()
      }
      if (catalogs.status === Status.OFFLINE || catalogs.status === Status.FAILED) this.setState({ notification: {status: true, message: catalogs.message} })
    }
    if (!isFetching(dropshipfaq)) {
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
    if (this.submiting && tempCreateProduct.stepThree.isFound) Router.push('/product-add-step-four', '/product/add/four')
  }

  render () {
    const { form, catalogs, createCatalog, wholesalesError, aboutDropshiping, error, collapse, dropshipfaq } = this.state
    const styleError = {
      borderBottomColor: '#ef5656',
      color: '#ef5656'
    }

    let price = form.price !== undefined ? form.price : 0
    let discount = form.discount !== undefined ? form.discount : 0
    let priceAfterDiscount = price - (price * (discount / 100))
    let commision = priceAfterDiscount * (10 / 100)

    let nameError = error === 'name' ? styleError : {}
    let discountError = error === 'discount' ? styleError : {}
    let weightError = error === 'weight' ? styleError : {}
    let stockError = error === 'stock' ? styleError : {}
    let catalogError = error === 'catalog_id' ? styleError : {}

    return (
      <Content>
        <Wizard total={4} active={3} />
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Spesifikasi</h3>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field is-horizontal'>
              <div className='field-body columns is-mobile'>
                <div className='field column'>
                  <label className='label' style={nameError}>Harga Produk</label>
                  <p className='control is-expanded price'>
                    <span className='currency' style={nameError}>Rp</span>
                    <input onChange={(e) => this.formHandling(e)} value={form.price !== undefined && form.price} placeholder='0' name='price' className='input' type='number' style={nameError} />
                  </p>
                </div>
                <div className='field column is-one-quarter'>
                  <label className='label' style={discountError}>Diskon</label>
                  <p className='control is-expanded discount'>
                    <span className='disc' style={discountError}>%</span>
                    <input onChange={(e) => this.formHandling(e)} value={form.discount !== undefined && form.discount} placeholder='0' name='discount' className='input' type='number' style={discountError} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='detail spec'>
            <div className='detail-result'>
              <h3>Rincian Penerimaan</h3>
              <ul>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Harga Jual</div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(priceAfterDiscount) }</strong></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Komisi  (10%  dari Rp { RupiahFormat(priceAfterDiscount)} )</div>
                    <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(commision) }</strong></div>
                  </div>
                </li>
                <li>
                  <div className='columns custom is-mobile'>
                    <div className='column is-half'>Uang yang akan Anda terima</div>
                    <div className='column is-half has-text-right'><strong className='total'>Rp { RupiahFormat(priceAfterDiscount - commision) }</strong></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field'>
              <label className='label' style={weightError}>Berat Produk</label>
              <p className='control is-expanded discount'>
                <span className='disc' style={weightError}>Kg</span>
                <input onChange={(e) => this.formHandling(e)} value={form.weight !== undefined && form.weight} placeholder='0' name='weight' className='input' type='number' style={weightError} />
              </p>
            </div>
            <div className='field'>
              <label className='label' style={stockError}>Stock Produk</label>
              <p className='control is-expanded'>
                <input onChange={(e) => this.formHandling(e)} value={form.stock !== undefined && form.stock} placeholder='0' name='stock' className='input' type='number' style={stockError} />
              </p>
            </div>
            <div className='field radio-horizontal'>
              <label className='label'>Jenis Produk</label>
              <p className='control'>
                <label className={`radio primary ${String(form.condition) === '1' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='condition' value='1' type='radio' />
                  <strong>Baru</strong>
                </label>
                <label className={`radio primary ${String(form.condition) === '0' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='condition' value='0' type='radio' />
                  <strong>Bekas</strong>
                </label>
              </p>
            </div>
            <div className='field'>
              <label className='label'>Asuransi Produk</label>
              <p className='control'>
                <label className={`radio primary ${String(form.is_insurance) === 'true' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='is_insurance' value type='radio' />
                  <strong>Wajib</strong>
                </label>
                <label className={`radio primary ${String(form.is_insurance) === 'false' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='is_insurance' value={false} type='radio' />
                  <strong>Optional</strong>
                </label>
              </p>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Opsi</h3>
            </div>
          </div>
          <div className='filter-option active right-style'>
            <div className='sort-list check-all top'>
              <label className='checkbox'>
                <span className={`sort-text ${String(form.is_dropship) === 'true' ? 'active' : ''}`}>Jadikan Dropshipping</span>
                <span>Memungkinkan penjual lain untuk menjual barang ini di toko mereka</span>
                <a onClick={() => this.aboutDropshipingPress()} className='modal-button'>Pelajari Lebih Lanjut tentang dropshipping</a>
                <span className={`input-wrapper ${String(form.is_dropship) === 'true' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='is_dropship' value={String(form.is_dropship) === 'true' ? 'false' : 'true'} type='checkbox' />
                </span>
              </label>
              <label className='checkbox'>
                <span className={`sort-text ${String(form.status) === '0' ? 'active' : ''}`}>Sembunyikan Barang</span>
                <span>Barang yang disembunyikan tidak akan muncul di toko Anda. Tapi tetap dapat di dropshipping kan</span>
                <span className={`input-wrapper ${String(form.status) === '0' ? 'checked' : ''}`}>
                  <input onClick={(e) => this.formHandling(e)} name='status' value={String(form.status) === '1' ? '0' : '1'} type='checkbox' />
                </span>
              </label>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Katalog Toko</h3>
            </div>
          </div>
          <div className='spec-price'>
            <div className='field'>
              <label style={catalogError}>Katalog</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.catalog_id !== undefined ? form.catalog_id : 'default'} name='catalog_id' style={catalogError}>
                    <option value='default' >Pilih</option>
                    {
                      catalogs.data.isFound &&
                      catalogs.data.catalogs.map((catalog) => {
                        return <option key={catalog.id} value={catalog.id}>{ catalog.name }</option>
                      })
                    }
                  </select>
                </span>
              </p><br />
              <a onClick={() => this.catalogPress()} className='js-option' data-target='#addCatalog'>+ Tambah Katalog</a>
            </div>
          </div>
        </section>
        <section className='section is-paddingless has-shadow'>
          <div className='container is-fluid'>
            <div className='title'>
              <h3>Grosir</h3>
            </div>
          </div>
          <div className='spec-price'>
            <label className='switch right'>
              <input onClick={() => this.setState({ form: {...this.state.form, is_wholesaler: !this.state.form.is_wholesaler} })} type='checkbox' checked={form.is_wholesaler} />
              <span className='slider round' />
            </label>
            <h3 className='title-content'>Aktifkan Harga Grosir</h3>
            <p>Memberikan harga spesial kepada pembeli untuk pembelian dalam jumlah tertentu</p>
          </div>
          <div className='effect-display' style={{ display: form.is_wholesaler ? 'block' : 'none' }}>
            {
              form.wholesales.map((wholesale, index) => {
                let errorStatus = wholesalesError.status && index === wholesalesError.index
                let errorStatusMinOrder = errorStatus && wholesalesError.attribute === 'min'
                let errorStatusMaxOrder = errorStatus && wholesalesError.attribute === 'max'
                return (
                  <div className='spec-price effect-display' key={index}>
                    <div className='field'>
                      <div className='field-body columns'>
                        <div className='field column quarter'>
                          <label className='label' style={errorStatus ? styleError : {}}>Jumlah Produk</label>
                          <p className='control is-expanded prod-qty'>
                            <input onChange={(e) => this.wholesaleHandling(e, index)} value={wholesale.min} style={errorStatusMinOrder ? styleError : {}} placeholder='0' name='min' className='input' type='number' />
                            <span>s/d</span>
                            <input onChange={(e) => this.wholesaleHandling(e, index)} value={wholesale.max} style={errorStatusMaxOrder ? styleError : {}} placeholder='0' name='max' className='input' type='number' />
                          </p>
                        </div>
                        <div className='field column'>
                          <label className='label'>Harga Produk</label>
                          <p className='control is-expanded price'>
                            <span className='currency'>Rp</span>
                            <input onChange={(e) => this.wholesaleHandling(e, index)} placeholder='0' name='price' className='input' type='number' value={wholesale.price} />
                          </p>
                        </div>
                      </div>
                    </div>
                    { errorStatus && <span style={styleError}> {wholesalesError.message} </span> }
                    <div className='remove-wrapp'>
                      <a onClick={() => this.wholesaleRemovePress(index)} className='remove'>Hapus</a>
                    </div>
                  </div>
                )
              })
            }
            <div className='spec-price'>
              <a onClick={(e) => this.wholesaleAddPress(e)}>+ Tambah Daftar Harga Grosir</a>
            </div>
          </div>
        </section>
        <section className='section is-paddingless'>
          <div className='payment-detail action'>
            <ul>
              <li>
                <a onClick={() => !this.submiting && this.onSumbit()} className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}>Lanjutkan</a>
              </li>
            </ul>
          </div>
        </section>
        <Modal show={catalogs.show} title='Buat Katalog Baru' closePress={() => this.catalogPress()}>
          <div className='field'>
            <p className='control'>
              <input onChange={(e) => this.catalogOnChange(e)} name='name' className='input' style={catalogs.error === 'name' ? styleError : {}} type='text' placeholder='Masukkan nama katalog' />
              { catalogs.error === 'name' && <label style={styleError}> {catalogs.errorMessage} </label> }
            </p>
          </div>
          <Button text='Buat Katalog Baru' onClick={() => !createCatalog.submiting && this.catalogAddPress()} className={createCatalog.submiting && 'is-loading'} />
        </Modal>
        <div className={`modal modal-filter modal-dropship ${aboutDropshiping.isActive ? 'is-active' : ''}`}>
          <div className='modal-background' />
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>Tentang Dropshipping</p>
              <button onClick={() => this.aboutDropshipingPress()} className='delete icon-close' />
            </header>
            <section className='modal-card-body'>
              <div className='main-collapse'>
                { dropshipfaq.isFound && dropshipfaq.faq.map((data, i) => {
                  return (
                    <div className={`collpase-content ${collapse[i] && 'active'}`}
                      onClick={(e) => this.handleCollapse(e, i)} key={i}>
                      <a className='js-collapse collapse-title'>{data.question} <span className='icon-arrow-down' /></a>
                      <div className={`collapse-body ${collapse[i] && 'collapsed'}`}>
                        <div className='collapse-in'>
                          {data.answer}
                        </div>
                      </div>
                    </div>
                  )
                })
                }
              </div>
            </section>
          </div>
        </div>
      </Content>
    )
  }
}

const mapStateToProps = (state) => ({
  catalogs: state.getListCatalog,
  createCatalog: state.createCatalog,
  tempCreateProduct: state.tempCreateProduct,
  dropshipfaq: state.dropshipfaq
})

const mapDispatchToProps = (dispatch) => ({
  getCatalogs: () => dispatch(catalogActions.getListCatalog()),
  addCatalog: (params) => dispatch(catalogActions.createCatalog(params)),
  resetCreateCatalog: (params) => dispatch(catalogActions.resetCreateCatalog()),
  setTempCreateProduct: (params) => dispatch(productActions.tempCreateProduct(params)),
  getDropshipperFaq: () => dispatch(storesActions.getDropshipperFaq())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepThree)
