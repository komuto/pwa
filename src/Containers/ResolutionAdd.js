// @flow
import React from 'react'
import { connect } from 'react-redux'
import FlipMove from 'react-flip-move'
import winurl from 'winurl'
// components
import MyImage from '../Components/MyImage'
// import Notification from '../Components/Notification'
// actions
import * as actionTypes from '../actions/user'

let FormData = require('form-data')

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%'
}

class ResolutionAdd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imagesOrigin: [],
      images: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      submiting: false,
      uploading: false,
      form: {
        priority: '',
        topic: '',
        title: '',
        message: ''
      }
    }
  }

  handleInput (e) {
    const { value, name } = e.target
    const { form } = this.state
    const newState = { form }
    newState.form[name] = value
    this.setState(newState)
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

  componentWillReceiveProps (nextProps) {
  }

  render () {
    console.log('state', this.state)
    const { imagesOrigin, images, form } = this.state
    const concatImages = imagesOrigin.concat(images)
    return (
      <section className='section is-paddingless'>
        <form className='form edit'>
          <div className='edit-data-delivery bg-white'>
            <div className='field'>
              <label className='label'>Prioritas</label>
              <div className='filter-option active'>
                <div className='sort-list check-list left'>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.priority === '2' && 'active'}`}>High</span>
                    <span className={`input-wrapper ${form.priority === '2' && 'checked'}`}>
                      <input type='checkbox' name='priority'
                        value='2'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.priority === '1' && 'active'}`}>Medium</span>
                    <span className={`input-wrapper ${form.priority === '1' && 'checked'}`}>
                      <input type='checkbox' name='priority'
                        value='1'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.priority === '0' && 'checked'}`}>Low</span>
                    <span className={`input-wrapper ${form.priority === '0' && 'checked'}`}>
                      <input type='checkbox' name='priority'
                        value='0'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Topik Keluhan</label>
              <div className='filter-option active'>
                <div className='sort-list check-list left'>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.topic === '3' && 'checked'}`}>Umum</span>
                    <span className={`input-wrapper ${form.topic === '3' && 'checked'}`}>
                      <input type='checkbox' name='topic'
                        value='3'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.topic === '2' && 'checked'}`}>Info</span>
                    <span className={`input-wrapper ${form.topic === '2' && 'checked'}`}>
                      <input type='checkbox' name='topic'
                        value='2'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.topic === '1' && 'checked'}`}>Transaksi</span>
                    <span className={`input-wrapper ${form.topic === '1' && 'checked'}`}>
                      <input type='checkbox' name='topic'
                        value='1'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.topic === '0' && 'checked'}`}>Lainnya</span>
                    <span className={`input-wrapper ${form.topic === '0' && 'checked'}`}>
                      <input type='checkbox' name='topic'
                        value='0'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Judul Keluhan</label>
              <p className='control'>
                <input className='input' type='text' name='title'
                  value={form.title}
                  onChange={(e) => this.handleInput(e)} />
              </p>
            </div>
            <div className='field'>
              <label className='label'>Pesan Keluhan</label>
              <p className='control'>
                <textarea className='textarea sm' rows='1' name='message'
                  value={form.message}
                  onChange={(e) => this.handleInput(e)} />
              </p>
            </div>
            <div className='add-product'>
              <h3 className='title-content'>Upload Foto</h3>
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
            </div>
            <div className='field'>
              <a className='button is-primary is-large is-fullwidth'>Simpan Perubahan</a>
            </div>
          </div>
        </form>
      </section>
    )
  }
}

ResolutionAdd.defaultProps = {
  accept: 'accept=image/*',
  withLabel: true,
  label: 'Max file size: 5mb, accepted: jpg|gif|png|JPG',
  imgExtension: ['.jpg', '.JPG', '.png'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension'
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(actionTypes.getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResolutionAdd)
