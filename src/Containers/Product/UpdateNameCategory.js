import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import Router from 'next/router'
// component
import Notification from '../../Components/Notification'
import MyImage from '../../Components/MyImage'
// actions
import * as homeActions from '../../actions/home'
import * as brandActions from '../../actions/brand'
import * as productActions from '../../actions/product'
import * as storesActions from '../../actions/stores'

class ProductUpdateNameCategory extends Component {
  constructor (props) {
    super(props)
    const isFound = props.storeProductDetail.isFound
    const { storeProductDetail } = props.storeProductDetail
    let name = isFound ? storeProductDetail.product.name : ''
    let categoryId = isFound ? storeProductDetail.category.id : ''
    let brandId = isFound ? storeProductDetail.brand ? storeProductDetail.brand.id : '' : ''
    let description = isFound ? storeProductDetail.product.description : ''
    // state
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
        categoryOne: '',
        categoryTwo: '',
        categoryThree: '',
        category_id: categoryId,
        brand_id: brandId,
        description
      },
      includeBrand: false,
      validation: false,
      notification: {
        status: false,
        type: 'is-success',
        message: 'Error, default message.'
      }
    }
    this.fetching = { storeProductDetail: false, brands: false, category: false, subCategory: false, subCategory2: false, subCategory3: false }
    this.submiting = false
  }

  formHandling (e) {
    let { form, subCategory2, subCategory3 } = this.state
    const { name, value } = e.target
    const newState = { form }
    if (name === 'name') {
      if (value.length <= 30) {
        newState.form[name] = value
      }
    }
    // fetch category level 1
    if (e.target.name === 'category_id') {
      let resetState = { subCategory2, subCategory3, form }
      resetState.subCategory2.categories['sub_categories'] = []
      resetState.subCategory3.categories['sub_categories'] = []
      resetState.form['categoryOne'] = ''
      resetState.form['categoryTwo'] = ''
      resetState.form['categoryThree'] = ''
      this.setState(resetState)
      this.fetching = { ...this.fetching, subCategory: true }
      this.props.getSubCategory({ id: e.target.value })
    }
    // fetch category level 2
    if (e.target.name === 'categoryOne') {
      let resetState = { subCategory3, form }
      resetState.subCategory3.categories['sub_categories'] = []
      resetState.form['categoryTwo'] = ''
      resetState.form['categoryThree'] = ''
      this.setState(resetState)
      this.fetching = { ...this.fetching, subCategory2: true }
      this.props.getSubCategory2({ id: e.target.value })
    }
    // fetch category level 3
    if (e.target.name === 'categoryTwo') {
      this.fetching = { ...this.fetching, subCategory3: true }
      this.props.getSubCategory3({ id: e.target.value })
    }
    newState.form[name] = value
    this.setState(newState)
  }

  renderValidation (name, textFailed) {
    const { form, validation } = this.state
    let nameVal = name === 'name' && form.name.length >= 3 && form.name.length <= 30
    let categoryVal = name === 'category_id' && !!form.category_id
    let categoryOneVal = name === 'categoryOne' && !!form.categoryOne
    let categoryTwoVal = name === 'categoryTwo' && !!form.categoryTwo
    // let categoryThreeVal = name === 'categoryThree' && !!form.categoryThree
    let descriptionVal = name === 'description' && form.description.length >= 30
    let result = nameVal || categoryVal || categoryOneVal || categoryTwoVal || descriptionVal
    let errorMsg = {
      fontSize: '12px',
      letterSpacing: '.2px',
      color: '#ef5656',
      paddingTop: '8px',
      display: validation ? 'block' : 'none'
    }
    return (
      <span className='error-msg' style={errorMsg}>
        {result ? '' : textFailed}
      </span>
    )
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
    let nameVal = form.name.length >= 3 && form.name.length <= 30
    let categoryVal = !!form.category_id
    let categoryOneVal = !!form.categoryOne
    let categoryTwoVal = !!form.categoryTwo
    // let categoryThreeVal = !!form.categoryThree
    let descriptionVal = form.description.length >= 30
    let isValid = nameVal && categoryVal && categoryOneVal && categoryTwoVal && descriptionVal
    if (isValid) {
      this.submiting = true
      const brandId = form.brand_id ? form.brand_id : 0
      let categoryId
      if (form.category_id) {
        categoryId = form.category_id
        if (form.categoryOne) {
          categoryId = form.categoryOne
          if (form.categoryTwo) {
            categoryId = form.categoryTwo
            if (form.categoryThree) {
              categoryId = form.categoryThree
            }
          }
        }
      }
      const params = {
        id: this.state.id,
        name: form.name,
        category_id: categoryId,
        brand_id: brandId,
        description: form.description
      }
      this.props.updateProduct(params)
    } else {
      this.setState({ validation: true })
    }
  }

  async componentDidMount () {
    const { category, brands, id } = this.state
    if (id) {
      NProgress.start()
      this.fetching = { ...this.fetching, storeProductDetail: true }
      await this.props.getStoreProductDetail({ id })
    }
    if (!category.isFound) {
      NProgress.start()
      // fetch category level 1
      this.fetching = { ...this.fetching, category: true }
      await this.props.getCategory()
    }
    if (!brands.isFound) {
      NProgress.start()
      this.fetching = { ...this.fetching, brands: true }
      await this.props.getBrand()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { storeProductDetail, form } = this.state
    const { alterProducts, category, subCategory, subCategory2, subCategory3, brands } = nextProps
    const { isFetching, isFound, isError, notifError, notifSuccess } = this.props
    if (!isFetching(category) && this.fetching.category) {
      NProgress.done()
      this.fetching = { ...this.fetching, category: false }
      if (isFound(category)) {
        this.setState({ category })
      }
      if (isError(category)) {
        this.setState({ notification: notifError(category.message) })
      }
    }
    if (!isFetching(subCategory) && this.fetching.subCategory) {
      NProgress.done()
      this.fetching = { ...this.fetching, subCategory: false }
      if (isFound(subCategory)) {
        this.setState({ subCategory })
      }
      if (isError(subCategory)) {
        this.setState({ notification: notifError(subCategory.message) })
      }
    }
    if (!isFetching(subCategory2) && this.fetching.subCategory2) {
      NProgress.done()
      this.fetching = { ...this.fetching, subCategory2: false }
      if (isFound(subCategory2)) {
        this.setState({ subCategory2 })
      }
      if (isError(subCategory2)) {
        this.setState({ notification: notifError(subCategory2.message) })
      }
    }
    if (!isFetching(subCategory3) && this.fetching.subCategory3) {
      NProgress.done()
      this.fetching = { ...this.fetching, subCategory3: false }
      if (isFound(subCategory3)) {
        this.setState({ subCategory3 })
      }
      if (isError(subCategory3)) {
        this.setState({ notification: notifError(subCategory3.message) })
      }
    }
    // if (isFetching(subCategory)) {
    //   const resetState = { subCategory2, subCategory3 }
    //   resetState.subCategory2.categories['sub_categories'] = []
    //   resetState.subCategory3.categories['sub_categories'] = []
    //   this.setState(resetState)
    // }
    // if (isFetching(nextProps.subCategory2)) {
    //   const resetState = { subCategory3 }
    //   resetState.subCategory3.categories['sub_categories'] = []
    //   this.setState(resetState)
    // }
    if (!isFetching(brands) && this.fetching.brands) {
      NProgress.done()
      this.fetching = { ...this.fetching, brands: false }
      if (isFound(brands)) {
        this.setState({ brands })
      }
      if (isError(brands)) {
        this.setState({ notification: notifError(brands.message) })
      }
    }

    if (!isFetching(nextProps.storeProductDetail) && this.fetching.storeProductDetail) {
      this.fetching = { ...this.fetching, storeProductDetail: false }
      NProgress.done()
      if (isFound(nextProps.storeProductDetail)) {
        const nextStoreProductDetail = nextProps.storeProductDetail.storeProductDetail
        const categoryParentsId = []
        if (nextStoreProductDetail.category) {
          nextStoreProductDetail.category.parents.map((data, i) => {
            categoryParentsId[i] = data.id
          })
          if (nextStoreProductDetail.category.parents.length === 2) {
            categoryParentsId.push(nextStoreProductDetail.category.id)
          }
        }
        const newState = { storeProductDetail, form }
        newState.form['name'] = nextStoreProductDetail.product.name
        newState.form['categoryOne'] = categoryParentsId[1]
        newState.form['categoryTwo'] = categoryParentsId[2]
        newState.form['categoryThree'] = nextStoreProductDetail.category.id
        newState.form['category_id'] = categoryParentsId[0]
        newState.form['brand_id'] = !nextStoreProductDetail.brand ? '' : nextStoreProductDetail.brand.id
        newState.form['description'] = nextStoreProductDetail.product.description
        newState.storeProductDetail = nextProps.storeProductDetail
        this.setState(newState)
        if (categoryParentsId[0]) {
          this.fetching = { ...this.fetching, subCategory: true }
          this.props.getSubCategory({ id: categoryParentsId[0] })
        }
        if (categoryParentsId[1]) {
          this.fetching = { ...this.fetching, subCategory2: true }
          this.props.getSubCategory2({ id: categoryParentsId[1] })
        }
        if (categoryParentsId[2]) {
          this.fetching = { ...this.fetching, subCategory3: true }
          this.props.getSubCategory3({ id: categoryParentsId[2] })
        }
      }
      if (isError(nextProps.storeProductDetail)) {
        this.setState({ notification: notifError(nextProps.storeProductDetail.message) })
      }
    }
    if (!isFetching(alterProducts) && this.submiting) {
      this.submiting = false
      if (isFound(alterProducts)) {
        this.setState({ notification: notifSuccess(alterProducts.message) })
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          Router.back()
        }, 3000)
      }
      if (isError(alterProducts)) {
        this.setState({ notification: notifError(alterProducts.message) })
      }
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
                  <MyImage src={storeProductDetail.storeProductDetail.images[0].file} alt='pict' />
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
    const { form, category, subCategory, subCategory2, subCategory3, brands, notification } = this.state
    let { includeBrand } = this.state
    let isBrandChecked = (includeBrand) || (!!form.brand_id)

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
              <div className='field'>
                <label>Nama Produk *</label>
                <p className='control'>
                  <input onChange={(e) => this.formHandling(e)} name='name' type='text' className='input' value={(form.name !== undefined) ? form.name : ''} />
                  {this.renderValidation('name', 'Mohon isi nama produk 3-30 karakter')}
                </p>
              </div>
              <div className='field'>
                <label>Kategori</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.category_id} name='category_id'>
                      <option style={{display: 'none'}} disabled> Pilih</option>
                      {
                        category.isFound &&
                        category.categories.map((category) => {
                          return <option key={category.id} value={category.id}> {category.name} </option>
                        })
                      }
                    </select>
                  </span>
                  {this.renderValidation('category_id', 'Mohon isi nama Kategori')}
                </p>
              </div>
              <div className='field'>
                <label>Sub-Kategori 1</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.categoryOne} name='categoryOne'>
                      <option style={{display: 'none'}} disabled> Pilih</option>
                      {
                        subCategory.isFound &&
                        subCategory.categories.sub_categories.map((sc) => {
                          return <option key={sc.id} value={sc.id}> {sc.name} </option>
                        })
                      }
                    </select>
                  </span>
                  {this.renderValidation('categoryOne', 'Mohon isi Sub-Kategori 1')}
                </p>
              </div>
              <div className='field'>
                <label>Sub-Kategori 2</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.categoryTwo} name='categoryTwo'>
                      <option style={{display: 'none'}} disabled> Pilih</option>
                      {
                        subCategory2.isFound &&
                        subCategory2.categories.sub_categories.map((sc) => {
                          return <option key={sc.id} value={sc.id}>{ sc.name }</option>
                        })
                      }
                    </select>
                  </span>
                  {this.renderValidation('categoryTwo', 'Mohon isi Sub-Kategori 2')}
                </p>
              </div>
              <div className='field'>
                <label>Sub-Kategori 3</label>
                <p className='control'>
                  <span className='select'>
                    <select onChange={(e) => this.formHandling(e)} value={form.categoryThree} name='categoryThree'>
                      <option style={{display: 'none'}} disabled> Pilih</option>
                      {
                        subCategory3.isFound &&
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
                    <select onChange={(e) => this.formHandling(e)} value={form.brand_id ? form.brand_id : 'default'} name='brand_id'>
                      <option style={{display: 'none'}} disabled> Pilih</option>
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
                  <textarea onChange={(e) => this.formHandling(e)} value={form.description ? form.description : ''} name='description' className='textarea' rows='2' />
                  {this.renderValidation('description', 'Mohon isi deskripsi min 30 karakter')}
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
