import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import FlipMove from 'react-flip-move'
import winurl from 'winurl'
import { animateScroll } from 'react-scroll'
// component
import MyImage from '../../Components/MyImage'
import Wizard from '../../Components/Wizard'
import Notification from '../../Components/Notification'
// actions
import * as productActions from '../../actions/product'

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%'
}

class ProductAddStepOne extends Component {
  constructor (props) {
    super(props)
    let { stepOne } = props.tempCreateProduct
    let images = []
    if (stepOne) {
      if (stepOne.isFound) {
        images = stepOne.images
      }
    }

    this.state = {
      tempCreateProduct: props.tempCreateProduct || null,
      images,
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }

    this.submiting = false
  }

  /** reset scroll */
  scrollToTop () {
    animateScroll.scrollTo(0, {duration: 0})
  }

  componentDidMount () {
    this.scrollToTop()
  }

  triggerFileUpload () {
    this.inputElementPress.click()
  }

  onDropFile (e) {
    e.preventDefault()
    let files = e.target.files
    let { images, notAcceptedFileType, notAcceptedFileSize, notification } = this.state
    notification = {
      status: false,
      message: 'Error, default message.'
    }
    // console.log(files)
    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let f = files[i]
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
      this.setState({ images, imageValue: f.name })
      // const reader = new FileReader()
      // reader.onload = (e) => {
      //   images.push(e.target.result)
      //   this.setState({ images })
      // }
      // reader.readAsDataURL(f)
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
    this.inputElementPress.value = ''
    this.setState({images: filteredAry})
  }

  submit () {
    const { images, tempCreateProduct } = this.state
    if (images.length > 0) {
      this.submiting = true
      this.props.setTempCreateProduct({ ...tempCreateProduct, stepOne: { isFound: true, images } })
    } else {
      this.setState({
        notification: {
          status: true,
          message: 'Foto produk wajib diisi!'
        }
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { tempCreateProduct } = nextProps
    if (this.submiting && tempCreateProduct && tempCreateProduct.stepOne.isFound) {
      Router.push('/product-add-step-two', '/product/add/two')
    }
  }

  render () {
    const { images, notification } = this.state
    return (
      <section className='section is-paddingless'>
        <Notification
          type='is-danger'
          isShow={notification.status}
          activeClose
          onClose={() => this.setState({notification: {status: false, message: ''}})}
          message={notification.message} />
        <Wizard total={4} active={1} />
        <div className='add-product'>
          <div className='container is-fluid'>
            <p>Masukkan Gambar Produk minimal satu foto. Gunakan 4 foto terbaik untuk gambar produk anda.</p>
            <ul className='add-photo-list'>
              <FlipMove enterAnimation='fade' leaveAnimation='fade' style={styles}>
                {
                  images.map((picture, index) => {
                    return (
                      <li key={index} style={{ marginBottom: 5 }}>
                        <div className='photo-product'>
                          <a onClick={() => this.removeImage(picture)} className='del-photo'><span className='icon-cross-circle' /></a>
                          <div className='photo-wrapp'>
                            <MyImage src={picture.preview} alt='preview' />
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
                    value=''
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
                <button onClick={() => !this.submiting && this.submit()} className={`button is-primary is-large is-fullwidth ${this.submiting && 'is-loading'}`}>Lanjutkan</button>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ProductAddStepOne.defaultProps = {
  accept: 'accept=image/*',
  withLabel: true,
  label: 'Max file size: 5mb, accepted: jpg|gif|png|JPG',
  imgExtension: ['.jpg', '.JPG', '.png'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension'
}

const mapStateToProps = (state) => ({
  tempCreateProduct: state.tempCreateProduct
})

const mapDispatchToProps = (dispatch) => ({
  setTempCreateProduct: (params) => dispatch(productActions.tempCreateProduct(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepOne)
