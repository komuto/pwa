import React, { Component } from 'react'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
// component
import Notification from '../Components/Notification'
// actions
import * as productActions from '../actions/product'
import * as storesAction from '../actions/stores'
// services
import { Status, isFetching, validateResponseAlter } from '../Services/Status'

class ProductWholesaleManage extends Component {
  constructor (props) {
    super(props)
    let imagesOrigin = props.productDetail.isFound ? props.productDetail.detail.images : []

    this.state = {
      id: props.query.id || null,
      productDetail: props.productDetail || null,
      imagesOrigin,
      images: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      submiting: false,
      uploading: false,
      notification: {
        status: false,
        type: 'is-success',
        message: 'Error, default message.'
      }
    }
  }

  submit () {
    const { images, imagesOrigin } = this.state
    const isFilledImages = images.length > 0
    if (images.length > 0 || imagesOrigin.length > 0) {
      isFilledImages ? this.uploadImages() : this.updateImages()
    } else {
      this.setState({
        notification: {
          status: true,
          message: 'Foto produk wajib diisi!'
        }
      })
    }
  }

  async componentDidMount () {
    const { id, productDetail } = this.state
    if (!productDetail.isFound || (productDetail.isFound && String(productDetail.detail.product.id) !== String(id))) {
      NProgress.start()
      await this.props.getProduct({ id })
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { submiting, productDetail, images, uploading, imagesOrigin, id } = this.state
    const { alterProducts, upload } = nextProps
    const nextId = nextProps.query.id
    if (!nextProps.productDetail.isLoading) {
      switch (nextProps.productDetail.status) {
        case Status.SUCCESS :
          const newState = { productDetail, images }
          // add property preview & name
          let addPropPreview = nextProps.productDetail.detail.images.map(image => {
            const splitPhoto = image.file.split('/')
            const namePhoto = splitPhoto.pop() || splitPhoto.pop()
            image['preview'] = image.file
            image['name'] = namePhoto
            return image
          })
          newState.imagesOrigin = addPropPreview
          newState.productDetail = nextProps.productDetail
          this.setState(newState)

          if (String(nextProps.productDetail.detail.product.id) !== String(nextId)) {
            NProgress.start()
            await this.props.getProduct({ id: nextId })
          }
          NProgress.done()
          break
        case Status.OFFLINE :
        case Status.FAILED :
          this.setState({ notification: {status: true, message: productDetail.message} })
          break
        default:
          break
      }
    }
    if (!upload.isLoading && uploading) {
      this.setState({ uploading: false, submiting: true })
      const concatImages = imagesOrigin.concat(upload.payload.images)
      let newImage = concatImages.map(image => {
        let dataImages = {
          name: image.name
        }
        return dataImages
      })
      this.props.updateProduct({ images: newImage, id: id.split('.')[0] })
    }
    if (!isFetching(alterProducts) && submiting) {
      this.setState({ submiting: false, notification: validateResponseAlter(alterProducts, 'Berhasil memperbarui Photo', 'Gagal memperbarui Photo') })
    }
  }

  renderProductDetail () {
    const { productDetail } = this.state
    if (productDetail.isFound) {
      return (
        <li>
          <div className='box is-paddingless'>
            <article className='media'>
              <div className='media-left'>
                <figure className='image product-pict'>
                  <img src={productDetail.detail.images[0].file}
                    style={{width: '50px', height: '50px'}} alt='pict' />
                </figure>
              </div>
              <div className='media-content middle'>
                <div className='content'>
                  <p className='products-name'>
                    <strong>{productDetail.detail.product.name}</strong>
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
    const { notification } = this.state
    return (
      <div>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <section className='section is-paddingless has-shadow bg-white'>
          <ul className='product-view'>
            {this.renderProductDetail()}
          </ul>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  alterProducts: state.alterProducts
})

const mapDispatchToProps = (dispatch) => ({
  photoUpload: (params) => dispatch(storesAction.photoUpload({data: params})),
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductWholesaleManage)
