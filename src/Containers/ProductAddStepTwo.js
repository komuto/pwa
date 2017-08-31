import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// component
import Wizard from '../Components/Wizard'
// actions
import * as homeActions from '../actions/home'
import * as brandActions from '../actions/brand'
import * as productActions from '../actions/product'
// Utils
import { Status } from '../Services/Status'

class ProductAddStepTwo extends Component {
  constructor (props) {
    super(props)
    let { stepTwo } = props.tempCreateProduct
    this.state = {
      brands: props.brands || null,
      category: props.category || null,
      subCategory: props.subCategory || null,
      subCategory2: props.subCategory2 || null,
      subCategory3: props.subCategory3 || null,
      tempCreateProduct: props.tempCreateProduct || null,
      form: {
        ...stepTwo
      },
      includeBrand: false,
      error: null
    }
    this.submiting = false
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
    const { form, tempCreateProduct } = this.state

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
    this.props.setTempCreateProduct({
      ...tempCreateProduct,
      stepTwo: {
        ...form,
        isFound: true
      }
    })
  }

  async componentDidMount () {
    const { category, brands } = this.state
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
    const { category, subCategory, subCategory2, subCategory3, brands, tempCreateProduct } = nextProps

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
  }

  render () {
    const { form, category, subCategory, subCategory2, subCategory3, brands, error } = this.state
    const styleError = {
      borderBottomColor: '#ef5656',
      color: '#ef5656'
    }
    let { includeBrand } = this.state
    let isBrandChecked = (includeBrand) || (form.brand_id !== undefined)

    return (
      <section className='section is-paddingless'>
        <Wizard total={4} active={2} />
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
                <button onClick={() => !this.submiting && this.submit()} className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}>Lanjutkan</button>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ProductAddStepTwo.defaultProps = {
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
  tempCreateProduct: state.tempCreateProduct
})

const mapDispatchToProps = (dispatch) => ({
  getBrand: () => dispatch(brandActions.getBrand()),
  getCategory: () => dispatch(homeActions.categoryList()),
  getSubCategory: (params) => dispatch(homeActions.subCategory(params)),
  getSubCategory2: (params) => dispatch(homeActions.subCategory2(params)),
  getSubCategory3: (params) => dispatch(homeActions.subCategory3(params)),
  setTempCreateProduct: (params) => dispatch(productActions.tempCreateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepTwo)
