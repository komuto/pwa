import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// component
import Notification from '../Components/Notification'
// actions
import * as homeActions from '../actions/home'
import * as brandActions from '../actions/brand'
import * as productActions from '../actions/product'
import * as storesActions from '../actions/stores'
// Utils
import { Status, isFetching, validateResponseAlter } from '../Services/Status'

class ProductUpdateNameCategory extends Component {
  constructor (props) {
    super(props)
    const { storeProductDetail } = props.storeProductDetail
    let name = props.storeProductDetail.isFound ? storeProductDetail.product.name : ''
    let categoryOne = props.storeProductDetail.isFound ? storeProductDetail.category.parents[0].id : ''
    let categoryTwo = props.storeProductDetail.isFound ? storeProductDetail.category.parents[1].id : ''
    let categoryThree = props.storeProductDetail.isFound ? storeProductDetail.category.parents[2].id : ''
    let categoryId = props.storeProductDetail.isFound ? storeProductDetail.category.id : ''
    let brandId = props.storeProductDetail.isFound ? storeProductDetail.brand.id : ''
    let description = props.storeProductDetail.isFound ? storeProductDetail.product.description : ''
    this.state = {
      id: props.query.id || null,
      storeProductDetail: props.storeProductDetail || null,
      brands: props.brands || null,
      category: props.category || null,
      subCategory: props.subCategory || null,
      subCategory2: props.subCategory2 || null,
      subCategory3: props.subCategory3 || null,
      form: {
        name,
        categoryOne,
        categoryTwo,
        categoryThree,
        category_id: categoryId,
        brand_id: brandId,
        description
      },
      includeBrand: false,
      error: null,
      submiting: false,
      convertToForm: false,
      notification: {
        status: false,
        type: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  formHandling (e) {
    let { form, error } = this.state
    form[e.target.name] = e.target.value
    error = null
    if (e.target.value === '') {
      error = e.target.name
      this.setState({ error })
      return
    }
    // fetch category level 2
    if (e.target.name === 'categoryOne') {
      this.props.getSubCategory({ id: e.target.value })
    }
    // fetch category level 3
    if (e.target.name === 'categoryTwo') {
      this.props.getSubCategory2({ id: e.target.value })
    }
    // fetch category level 4
    if (e.target.name === 'categoryThree') {
      this.props.getSubCategory3({ id: e.target.value })
    }
    this.setState({ form, error })
  }

  includeBrandPress (e, isBrandChecked) {
    e.preventDefault()
    let { includeBrand, form } = this.state
    includeBrand = !isBrandChecked
    if (!includeBrand) delete form['brand_id']
    this.setState({ includeBrand, form })
  }

  submit () {
    const { form } = this.state

    if (form.name === undefined || form.name === '') {
      this.setState({ error: 'name' })
      return
    }

    if (form.categoryOne === undefined) {
      this.setState({ error: 'categoryOne' })
      return
    }

    if (form.categoryTwo === undefined) {
      this.setState({ error: 'categoryTwo' })
      return
    }

    if (form.categoryThree === undefined) {
      this.setState({ error: 'categoryThree' })
      return
    }

    if (form.category_id === undefined) {
      this.setState({ error: 'category_id' })
      return
    }

    if (form.description === undefined) {
      this.setState({ error: 'description' })
      return
    }
    this.submiting = true
    const brandId = form.hasOwnProperty('brand_id') ? form.brand_id : ''
    const params = {
      id: this.state.id.split('.')[0],
      name: form.name,
      catalog_id: form.catalog_id,
      brand_id: brandId,
      description: form.description
    }
    this.props.updateProduct(params)
  }

  async componentDidMount () {
    const { category, brands, id, storeProductDetail } = this.state
    if (!storeProductDetail.isFound || (storeProductDetail.isFound && String(storeProductDetail.storeProductDetail.product.id) !== String(id))) {
      NProgress.start()
      const productId = id.split('.')[0]
      await this.props.getStoreProductDetail({ id: productId })
      this.setState({convertToForm: true})
    }
    if (!category.isFound) {
      NProgress.start()
      // fetch category level 1
      await this.props.getCategory()
    }
    if (!brands.isFound) {
      NProgress.start()
      await this.props.getBrand()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { storeProductDetail, form, convertToForm } = this.state
    const { category, alterProducts, subCategory, subCategory2, subCategory3, brands, tempCreateProduct } = nextProps

    if (!category.isLoading) {
      NProgress.done()
      if (category.status === Status.SUCCESS) this.setState({ category })
      if (category.status === Status.OFFLINE || category.status === Status.FAILED) this.setState({ notification: {status: true, message: category.message} })
    }
    if (!subCategory.isLoading) {
      NProgress.done()
      if (subCategory.status === Status.SUCCESS) this.setState({ subCategory })
      if (subCategory.status === Status.OFFLINE || subCategory.status === Status.FAILED) this.setState({ notification: {status: true, message: subCategory.message} })
    }
    if (!subCategory2.isLoading) {
      NProgress.done()
      if (subCategory2.status === Status.SUCCESS) this.setState({ subCategory2 })
      if (subCategory2.status === Status.OFFLINE || subCategory2.status === Status.FAILED) this.setState({ notification: {status: true, message: subCategory2.message} })
    }
    if (!subCategory3.isLoading) {
      NProgress.done()
      if (subCategory3.status === Status.SUCCESS) this.setState({ subCategory3 })
      if (subCategory3.status === Status.OFFLINE || subCategory3.status === Status.FAILED) this.setState({ notification: {status: true, message: subCategory3.message} })
    }
    if (!brands.isLoading) {
      NProgress.done()
      if (brands.status === Status.SUCCESS) this.setState({ brands })
      if (brands.status === Status.OFFLINE || brands.status === Status.FAILED) this.setState({ notification: {status: true, message: brands.message} })
    }

    if (this.submiting && tempCreateProduct.stepTwo.isFound) {
      this.submiting = false
      Router.push('/product-add-step-three')
    }

    if (nextProps.storeProductDetail.isFound && convertToForm) {
      switch (nextProps.storeProductDetail.status) {
        case Status.SUCCESS :
          const newState = { storeProductDetail, form, convertToForm: false }
          newState.form['name'] = nextProps.storeProductDetail.storeProductDetail.product.name
          newState.form['categoryOne'] = nextProps.storeProductDetail.storeProductDetail.category.parents[0].id
          newState.form['categoryTwo'] = nextProps.storeProductDetail.storeProductDetail.category.parents[1].id
          newState.form['categoryThree'] = nextProps.storeProductDetail.storeProductDetail.category.parents[2].id
          newState.form['category_id'] = nextProps.storeProductDetail.storeProductDetail.category.id
          newState.form['brand_id'] = nextProps.storeProductDetail.storeProductDetail.brand.id
          newState.form['description'] = nextProps.storeProductDetail.storeProductDetail.product.description
          newState.storeProductDetail = nextProps.storeProductDetail
          this.setState(newState)
          this.props.getSubCategory({ id: nextProps.storeProductDetail.storeProductDetail.category.parents[0].id })
          this.props.getSubCategory2({ id: nextProps.storeProductDetail.storeProductDetail.category.parents[1].id })
          this.props.getSubCategory3({ id: nextProps.storeProductDetail.storeProductDetail.category.parents[2].id })
          NProgress.done()
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, type: 'is-danger', message: storeProductDetail.message} })
          break
        default:
          break
      }
    }
    if (!isFetching(alterProducts) && this.submiting) {
      this.setState({ submiting: false, notification: validateResponseAlter(alterProducts, 'Berhasil memperbarui Photo', 'Gagal memperbarui Photo') })
    }
  }

  renderProductDetail () {
    const { storeProductDetail } = this.state
    if (storeProductDetail.isFound) {
      return (
        <li>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left is-bordered'>
                <figure className='image'>
                  <img src={storeProductDetail.storeProductDetail.images[0].file}
                    style={{width: '50px', height: '50px'}} alt='pict' />
                </figure>
              </div>
              <div className='media-content middle'>
                <div className='content'>
                  <p className='products-name'>
                    <strong>{storeProductDetail.storeProductDetail.product.name}</strong>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </li>
      )
    } else {
      return (
        <p style={{textAlign: 'center', paddingTop: '20px'}}>Product Tidak ada</p>
      )
    }
  }

  render () {
    console.log('state ', this.state)
    console.log('props ', this.props)
    const { form, category, subCategory, subCategory2, subCategory3, brands, error, notification } = this.state
    const styleError = {
      borderBottomColor: '#ef5656',
      color: '#ef5656'
    }
    let { includeBrand } = this.state
    let isBrandChecked = (includeBrand) || (form.brand_id !== undefined)

    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless'>
          <div className='profile-content rating'>
            <div className='profile-wrapp is-paddingless'>
              <ul className='detail-seller left-margin'>
                {this.renderProductDetail()}
              </ul>
            </div>
          </div>
          <div className='add-product'>
            <div className='form-product'>
              <div className='field' style={error === 'name' ? styleError : {}}>
                <label>Nama Produk *</label>
                <p className='control'>
                  <input onChange={(e) => this.formHandling(e)} name='name' type='text' className='input' style={error === 'name' ? styleError : {}} value={(form.name !== undefined) ? form.name : ''} />
                </p>
              </div>
              <div className='field'>
                <label style={error === 'categoryOne' ? styleError : {}}>Kategori</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.categoryOne !== undefined ? form.categoryOne : 'default'} name='categoryOne' style={error === 'categoryOne' ? styleError : {}}>
                      <option value='default'> Pilih</option>
                      {
                          category.isFound &&
                          category.categories.map((category) => {
                            return <option key={category.id} value={category.id}> {category.name} </option>
                          })
                        }
                    </select>
                  </span>
                </p>
              </div>
              <div className='field'>
                <label style={error === 'categoryTwo' ? styleError : {}}>Sub-Kategori 1</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.categoryTwo !== undefined ? form.categoryTwo : 'default'} name='categoryTwo' style={error === 'categoryTwo' ? styleError : {}}>
                      <option value='default'> Pilih</option>
                      {
                        subCategory.isFound &&
                        form.categoryOne !== undefined &&
                        subCategory.categories.sub_categories.map((sc) => {
                          return <option key={sc.id} value={sc.id}> {sc.name} </option>
                        })
                      }
                    </select>
                  </span>
                </p>
              </div>
              <div className='field'>
                <label style={error === 'categoryThree' ? styleError : {}}>Sub-Kategori 2</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.categoryThree !== undefined ? form.categoryThree : 'default'} name='categoryThree' style={error === 'categoryThree' ? styleError : {}}>
                      <option value='default'> Pilih</option>
                      {
                        subCategory2.isFound &&
                        form.categoryTwo !== undefined &&
                        subCategory2.categories.sub_categories.map((sc) => {
                          return <option key={sc.id} value={sc.id}>{ sc.name }</option>
                        })
                      }
                    </select>
                  </span>
                </p>
              </div>
              <div className='field'>
                <label style={error === 'category_id' ? styleError : {}}>Sub-Kategori 3</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.category_id !== undefined ? form.category_id : 'default'} name='category_id' style={error === 'category_id' ? styleError : {}}>
                      <option value='default'> Pilih</option>
                      {
                        subCategory3.isFound &&
                        form.categoryThree !== undefined &&
                        subCategory3.categories.sub_categories.map((sc) => {
                          return <option key={sc.id} value={sc.id}>{ sc.name }</option>
                        })
                      }
                    </select>
                  </span>
                </p>
              </div>
              <div className='filter-option active'>
                <div className='sort-list check-all middle'>
                  <label className='checkbox'>
                    <span className={`sort-text ${(isBrandChecked) ? 'active' : ''}`}>Sertakan Brand</span>
                    <span className={`input-wrapper ${(isBrandChecked) && 'checked'}`}>
                      <input type='checkbox' onClick={(e) => this.includeBrandPress(e, isBrandChecked)} />
                    </span>
                  </label>
                </div>
              </div>
              <div className='field effect-fadein' style={{ display: isBrandChecked ? 'block' : 'none' }}>
                <label>Brand</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.brand_id !== undefined ? form.brand_id : 'default'} name='brand_id'>
                      <option value='default'> Pilih</option>
                      {
                        brands.isFound &&
                        brands.brands.map((brand) => {
                          return <option key={brand.id} value={brand.id}>{ brand.name }</option>
                        })
                      }
                    </select>
                  </span>
                </p>
              </div>
              <div className='field'>
                <label>Deskripsi Produk</label>
                <p className='control'>
                  <textarea onChange={(e) => this.formHandling(e)} value={form.description !== undefined ? form.description : ''} name='description' className='textarea' rows='2' />
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <button onClick={() => !this.submiting && this.submit()} className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}>Simpan Perubahan</button>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

ProductUpdateNameCategory.defaultProps = {
  initForm: {
    name: '',
    category_id: 0,
    brand_id: 0,
    description: ''
  }
}

const mapStateToProps = (state) => ({
  brands: state.brands,
  category: state.category,
  subCategory: state.subCategory,
  subCategory2: state.subCategory2,
  subCategory3: state.subCategory3,
  storeProductDetail: state.storeProductDetail,
  alterProducts: state.alterProducts
})

const mapDispatchToProps = (dispatch) => ({
  getBrand: () => dispatch(brandActions.getBrand()),
  getCategory: () => dispatch(homeActions.categoryList()),
  getSubCategory: (params) => dispatch(homeActions.subCategory(params)),
  getSubCategory2: (params) => dispatch(homeActions.subCategory2(params)),
  getSubCategory3: (params) => dispatch(homeActions.subCategory3(params)),
  getStoreProductDetail: (params) => dispatch(storesActions.getStoreProductDetail(params)),
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdateNameCategory)
