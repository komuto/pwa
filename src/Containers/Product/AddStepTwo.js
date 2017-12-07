import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
import { animateScroll } from 'react-scroll'
// component
import Wizard from '../../Components/Wizard'
// actions
import * as homeActions from '../../actions/home'
import * as brandActions from '../../actions/brand'
import * as productActions from '../../actions/product'

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
      validation: false,
      error: null
    }
    this.fetching = { storeProductDetail: false, brands: false, category: false, subCategory: false, subCategory2: false, subCategory3: false }
    this.submiting = false
  }

  /** reset scroll */
  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
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
    if (name !== 'name') {
      newState.form[name] = value
    }
    this.setState(newState)
    /**
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
      delete form.categoryTwo
      delete form.categoryThree
      delete form.category_id
      this.props.getSubCategory({ id: e.target.value })
    }
    // fetch category level 3
    if (e.target.name === 'categoryTwo') {
      delete form.categoryThree
      delete form.category_id
      this.props.getSubCategory2({ id: e.target.value })
    }
    // fetch category level 4
    if (e.target.name === 'categoryThree') {
      delete form.category_id
      this.props.getSubCategory3({ id: e.target.value })
    }
    this.setState({ form, error }) */
  }

  renderValidation (name, textFailed) {
    const { form, validation } = this.state
    let nameProduct = form.name ? form.name : ''
    let categoryId = form.category_id ? form.category_id : ''
    let categoryOne = form.categoryOne ? form.categoryOne : ''
    let categoryTwo = form.categoryTwo ? form.categoryTwo : ''
    let description = form.description ? form.description : ''
    let nameVal = name === 'name' && nameProduct.length >= 3 && nameProduct.length <= 30
    let categoryVal = name === 'category_id' && !!categoryId
    let categoryOneVal = name === 'categoryOne' && !!categoryOne
    let categoryTwoVal = name === 'categoryTwo' && !!categoryTwo
    // let categoryThreeVal = name === 'categoryThree' && !!form.categoryThree
    let descriptionVal = name === 'description' && description.length >= 30
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
    const { form, tempCreateProduct } = this.state
    // if (form.name === undefined || form.name === '') {
    //   // var top = this.inputNameYA.position().top
    //   // window.scrollTop(top)
    //   // this.inputNameYA.scrollIntoView()
    //   this.setState({ error: 'name' })
    // }

    // if (form.categoryOne === undefined) {
    //   this.setState({ error: 'categoryOne' })
    // }

    // if (form.categoryTwo === undefined) {
    //   this.setState({ error: 'categoryTwo' })
    // }

    // if (form.categoryThree === undefined) {
    //   this.setState({ error: 'categoryThree' })
    // }

    // if (subCategory3.isFound && subCategory3.categories.sub_categories.length > 1) {
    //   if (form.category_id === undefined) {
    //     this.setState({ error: 'category_id' })
    //   }
    // } else {
    //   form.category_id = form.categoryThree
    // }
    // if (form.description === undefined || form.description === '') {
    //   this.setState({ error: 'description' })
    // }

    let nameProduct = form.name ? form.name : ''
    let categoryId = form.category_id ? form.category_id : ''
    let categoryOne = form.categoryOne ? form.categoryOne : ''
    let categoryTwo = form.categoryTwo ? form.categoryTwo : ''
    let description = form.description ? form.description : ''
    let nameVal = nameProduct.length >= 3 && nameProduct.length <= 30
    let categoryVal = !!categoryId
    let categoryOneVal = !!categoryOne
    let categoryTwoVal = !!categoryTwo
    // let categoryThreeVal = name === 'categoryThree' && !!form.categoryThree
    let descriptionVal = description.length >= 30
    let isValid = nameVal && categoryVal && categoryOneVal && categoryTwoVal && descriptionVal
    if (isValid) {
      this.submiting = true
      this.props.setTempCreateProduct({
        ...tempCreateProduct,
        stepTwo: {
          ...form,
          isFound: true
        }
      })
    } else {
      this.setState({ validation: true })
    }
  }

  async componentDidMount () {
    this.scrollToTop()
    const { category, brands } = this.state
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
    const { category, subCategory, subCategory2, subCategory3, brands, tempCreateProduct } = nextProps
    const { isFetching, isFound, isError, notifError } = this.props
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

    if (this.submiting && tempCreateProduct.stepTwo.isFound) {
      this.submiting = false
      Router.push('/product-add-step-three', '/product/add/three')
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
                <input onChange={(e) => this.formHandling(e)} name='name' type='text' className='input' style={error === 'name' ? styleError : {}} value={(form.name) ? form.name : ''} />
                {this.renderValidation('name', 'Mohon isi nama produk 3-30 karakter')}
              </p>
            </div>
            <div className='field'>
              <label style={error === 'category_id' ? styleError : {}}>Kategori *</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.category_id ? form.category_id : ''} name='category_id' style={error === 'category_id' ? styleError : {}}>
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
              <label style={error === 'categoryOne' ? styleError : {}}>Sub-Kategori 1 *</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.categoryOne ? form.categoryOne : ''} name='categoryOne' style={error === 'categoryOne' ? styleError : {}}>
                    <option style={{display: 'none'}} disabled> Pilih</option>
                    {
                      subCategory.isFound &&
                      subCategory.categories && subCategory.categories.sub_categories.map((sc) => {
                        return <option key={sc.id} value={sc.id}> {sc.name} </option>
                      })
                    }
                  </select>
                </span>
                {this.renderValidation('categoryOne', 'Mohon isi Sub-Kategori 1')}
              </p>
            </div>
            <div className='field'>
              <label style={error === 'categoryTwo' ? styleError : {}}>Sub-Kategori 2 *</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.categoryTwo ? form.categoryTwo : ''} name='categoryTwo' style={error === 'categoryTwo' ? styleError : {}}>
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
              <label style={error === 'categoryThree' ? styleError : {}}>Sub-Kategori 3</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.categoryThree ? form.categoryThree : ''} name='categoryThree' style={error === 'categoryThree' ? styleError : {}}>
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
                  <select onChange={(e) => this.formHandling(e)} value={form.brand_id ? form.brand_id : ''} name='brand_id'>
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
              <label style={error === 'description' ? styleError : {}}>Deskripsi Produk *</label>
              <p className='control'>
                <textarea onChange={(e) => this.formHandling(e)} value={form.description ? form.description : ''} name='description' className='textarea' rows='2' />
                {this.renderValidation('description', 'Mohon isi deskripsi min 30 karakter')}
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
