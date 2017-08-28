import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import NProgress from 'nprogress'
// component
import Wizard from '../Components/Wizard'
// actions
import * as homeActions from '../actions/home'
// Utils
import { Status } from '../Services/Status'

class ProductAddStepTwo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allCategory: props.allCategory || null,
      subCategory: props.subCategory || null,
      form: {},
      error: null
    }
  }

  formHandling (e) {
    const { form } = this.state
    form[e.target.name] = e.target.value
    // fetch category level 3,4
    if (e.target.name === 'categoryTwo' || e.target.name === 'categoryThree') {
      this.props.getSubCategory({ id: e.target.value })
    }
    this.setState({ form })
  }

  async componentDidMount () {
    const { allCategory } = this.state.allCategory
    if (!allCategory.isFound) {
      NProgress.start()
      // fetch category level 1,2
      await this.props.getCategory()
    }
  }

  componentWillReceiveProps (nextProps) {
    const { allCategory, subCategory } = nextProps
    if (!allCategory.isLoading) {
      NProgress.done()
      if (allCategory.status === Status.SUCCESS) this.setState({ allCategory })
      if (allCategory.status === Status.OFFLINE || allCategory.status === Status.FAILED) this.setState({ notification: {status: true, message: allCategory.message} })
    }

    if (!subCategory.isLoading) {
      NProgress.done()
      if (subCategory.status === Status.SUCCESS) this.setState({ subCategory })
      if (subCategory.status === Status.OFFLINE || allCategory.status === Status.FAILED) this.setState({ notification: {status: true, message: subCategory.message} })
    }
  }

  render () {
    const { form, allCategory, subCategory } = this.state
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
                      allCategory.isFound &&
                      allCategory.allCategory.map((category) => {
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
                      allCategory.isFound &&
                      form.categoryOne !== undefined &&
                      allCategory.allCategory.filter((category) => {
                        return category.id === Number(form.categoryOne)
                      })[0].sub_categories.map((sc) => {
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
                    {
                      subCategory.isFound &&
                      form.categoryTwo !== undefined &&
                      subCategory.categories.sub_categories.map((sc) => {
                        return <option key={sc.id} value={sc.id}>{sc.id} { sc.name }</option>
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
                  {/* <select>
                    <option>Sneakers Pria</option>
                    <option>With options</option>
                  </select> */}
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
                  {/* <select>
                    <option>Nike</option>
                    <option>With options</option>
                  </select> */}
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
  allCategory: state.allCategory,
  subCategory: state.subCategory
})

const mapDispatchToProps = (dispatch) => ({
  getCategory: () => dispatch(homeActions.allCategory()),
  getSubCategory: (params) => dispatch(homeActions.subCategory(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepTwo)
