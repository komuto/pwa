import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// component
import Wizard from '../Components/Wizard'
// actions
import * as homeActions from '../actions/home'
import * as brandActions from '../actions/brand'
// Utils
import { Status } from '../Services/Status'

class ProductAddStepTwo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      brands: props.brands || null,
      category: props.category || null,
      subCategory: props.subCategory || null,
      subCategory2: props.subCategory2 || null,
      subCategory3: props.subCategory3 || null,
      form: {},
      error: null
    }
  }

  formHandling (e) {
    const { form } = this.state
    form[e.target.name] = e.target.value
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
    this.setState({ form })
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
    const { category, subCategory, subCategory2, subCategory3, brands } = nextProps
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
  }

  render () {
    const { form, category, subCategory, subCategory2, subCategory3, brands } = this.state
    console.log(brands)
    return (
      <section className='section is-paddingless'>
        <Wizard total={4} active={2} />
        <div className='add-product'>
          <div className='form-product'>
            <div className='field'>
              <label>Nama Produk</label>
              <p className='control'>
                <input onChange={(e) => this.formHandling(e)} name='name' type='text' className='input' value={(form.name !== undefined) ? form.name : ''} />
              </p>
            </div>
            <div className='field'>
              <label>Kategori</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.categoryOne !== undefined ? form.categoryOne : 'default'} name='categoryOne'>
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
              <label>Sub-Kategori 1</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.categoryTwo !== undefined ? form.categoryTwo : 'default'} name='categoryTwo'>
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
              <label>Sub-Kategori 2</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.categoryThree !== undefined ? form.categoryThree : 'default'} name='categoryThree'>
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
              <label>Sub-Kategori 3</label>
              <p className='control'>
                <span className='select'>
                  <select onChange={(e) => this.formHandling(e)} value={form.category_id !== undefined ? form.category_id : 'default'} name='category_id'>
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
                  <span className='sort-text'>Sertakan Brand</span>
                  <span className='input-wrapper'>
                    <input type='checkbox' />
                  </span>
                </label>
              </div>
            </div>
            <div className='field'>
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
                <button onClick={() => Router.push('/product-add-step-three')} className='button is-primary is-large is-fullwidth'>Lanjutkan</button>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  brands: state.brands,
  category: state.category,
  subCategory: state.subCategory,
  subCategory2: state.subCategory2,
  subCategory3: state.subCategory3
})

const mapDispatchToProps = (dispatch) => ({
  getBrand: () => dispatch(brandActions.getBrand()),
  getCategory: () => dispatch(homeActions.categoryList()),
  getSubCategory: (params) => dispatch(homeActions.subCategory(params)),
  getSubCategory2: (params) => dispatch(homeActions.subCategory2(params)),
  getSubCategory3: (params) => dispatch(homeActions.subCategory3(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepTwo)
