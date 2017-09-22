import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlipMove from 'react-flip-move'
import winurl from 'winurl'
import NProgress from 'nprogress'
// component
import MyImage from '../Components/MyImage'
import Notification from '../Components/Notification'
// actions
import * as productActions from '../actions/product'
import * as storesAction from '../actions/stores'
// services
import { Status, isFetching, validateResponseAlter } from '../Services/Status'

let FormData = require('form-data')

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%'
}

class ProductPhotoManage extends Component {
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

  triggerFileUpload () {
    this.inputElementPress.click()
  }

  onDropFile (e) {
    let files = e.target.files
    let { images, notAcceptedFileType, notAcceptedFileSize, notification } = this.state
    notification = {
      status: false,
      message: 'Error, default message.'
    }
    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let f = files[i]
      console.log(f)
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        notAcceptedFileType.push(f.name)
        notification = {
          status: true,
          message: this.props.fileTypeError + ' ' + this.props.label
        }
        this.setState({ notAcceptedFileType, notification })
        continue
      }
      // Check for file size
      if (f.size > this.props.maxFileSize) {
        notAcceptedFileSize.push(f.name)
        notification = {
          status: true,
          message: this.props.fileSizeError + ' ' + this.props.label
        }
        this.setState({ notAcceptedFileSize, notification })
        continue
      }
      f['preview'] = winurl.createObjectURL(f)
      images.push(f)
      this.setState({ images })
    }
  }

  inputElement (input) {
    this.inputElementPress = input
  }

  hasExtension (fileName) {
    return (new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$')).test(fileName)
  }

  removeImage (picture) {
    const filteredAry = this.state.images.filter((e) => e !== picture)
    const filteredImageOrigin = this.state.imagesOrigin.filter((e) => e !== picture)
    this.setState({images: filteredAry})
    this.setState({imagesOrigin: filteredImageOrigin})
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

  uploadImages () {
    const images = new FormData()
    this.state.images.map((image) => {
      images.append('images', image)
    })
    images.append('type', 'product')
    if (images) {
      this.setState({ uploading: true })
      this.props.photoUpload(images)
    }
  }

  updateImages () {
    const { imagesOrigin, id } = this.state
    let newImage = imagesOrigin.map(image => {
      let dataImages = {
        name: image.name
      }
      return dataImages
    })
    this.setState({ submiting: true }, () => {
      if (this.state.submiting) {
        this.props.updateProduct({ images: newImage, id: id.split('.')[0] })
      }
    })
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

  render () {
    const { imagesOrigin, images, notification, submiting, uploading } = this.state
    const concatImages = imagesOrigin.concat(images)
    return (
      <section className='section is-paddingless'>
        <Notification
          type={notification.type}
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <div className='add-product'>
          <div className='container is-fluid'>
            <p>Masukkan Gambar Produk minimal satu foto. Gunakan 4 foto terbaik untuk gambar produk anda.</p>
            <ul className='add-photo-list'>
              <FlipMove enterAnimation='fade' leaveAnimation='fade' style={styles}>
                {
                  concatImages.map((picture, index) => {
                    return (
                      <li key={index}>
                        <div className='photo-product'>
                          <a onClick={() => this.removeImage(picture)} className='del-photo'><span className='icon-cross-circle' /></a>
                          <div className='photo-wrapp'>
                            <MyImage src={picture.preview} alt={picture.name} />
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
                <li>
                  <a onClick={() => this.triggerFileUpload()} className='add-photo'><span className='icon-add-big' /></a>
                  <input
                    style={{ display: 'none' }}
                    type='file'
                    ref={(input) => this.inputElement(input)}
                    name={this.props.name}
                    multiple='multiple'
                    onChange={(e) => this.onDropFile(e)}
                    accept={this.props.accept}
                    className={this.props.className} />
                </li>
              </FlipMove>
            </ul>
            <div className='field'>
              <p className='control'>
                <button onClick={() => this.submit()}
                  className={`button is-primary is-large is-fullwidth ${submiting || uploading ? 'is-loading' : ''}`}>
                  Lanjutkan
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ProductPhotoManage.defaultProps = {
  accept: 'accept=image/*',
  withLabel: true,
  label: 'Max file size: 5mb, accepted: jpg|gif|png|JPG',
  imgExtension: ['.jpg', '.JPG', '.png'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension'
}

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  alterProducts: state.alterProducts,
  upload: state.upload
})

const mapDispatchToProps = (dispatch) => ({
  photoUpload: (params) => dispatch(storesAction.photoUpload({data: params})),
  getProduct: (params) => dispatch(productActions.getProduct(params)),
  updateProduct: (params) => dispatch(productActions.updateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPhotoManage)
