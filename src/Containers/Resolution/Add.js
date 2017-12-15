// @flow
import React from 'react'
import { connect } from 'react-redux'
import FlipMove from 'react-flip-move'
import winurl from 'winurl'
import Router from 'next/router'
// components
import MyImage from '../../Components/MyImage'
// actions
import * as userActions from '../../actions/user'
import * as storesAction from '../../actions/stores'

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
      images: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      form: {
        priority: '',
        topic: '',
        title: '',
        message: ''
      },
      validation: false,
      submiting: false,
      uploading: false
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

  async onDropFile (e) {
    e.preventDefault()

    const imageCompressor = require('../../Lib/ImagesCompression')

    let files = e.target.files
    let { images, notAcceptedFileType, notAcceptedFileSize, notification } = this.state
    notification = {
      status: false,
      message: 'Error, default message.'
    }
    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let f = await imageCompressor.compress(files[i])
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
    this.setState({images: filteredAry})
  }

  renderValidation (name, textFailed) {
    const { form, images, validation } = this.state
    let priorityValid = name === 'priority' && form.priority !== ''
    let topicValid = name === 'topic' && form.topic !== ''
    let titleValid = name === 'title' && form.title !== ''
    let messageValid = name === 'message' && form.message !== ''
    let imagesValid = name === 'images' && images.length > 0
    let result = priorityValid || topicValid || titleValid || messageValid || imagesValid
    return (
      <span className='error-msg' style={{display: validation ? 'block' : 'none'}}>
        {result ? '' : textFailed}
      </span>
    )
  }

  submit () {
    const { form, images } = this.state
    let priorityValid = form.priority !== ''
    let topicValid = form.topic !== ''
    let titleValid = form.title !== ''
    let messageValid = form.message !== ''
    let imagesValid = images.length > 0
    let isValid = priorityValid && topicValid && titleValid && messageValid && imagesValid
    if (isValid) {
      this.setState({ uploading: true })
      this.uploadImages()
    } else {
      this.setState({ validation: true })
    }
  }

  uploadImages () {
    const images = new FormData()
    this.state.images.map((image) => {
      images.append('images', image)
    })
    images.append('type', 'product')
    if (images) {
      this.uploading = true
      this.props.photoUpload(images)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { upload, createResolution } = nextProps
    const { uploading, submiting, form } = this.state
    const { isFetching, isFound, isError, notifError } = this.props

    if (!isFetching(upload) && uploading) {
      this.setState({ uploading: false, submiting: true })
      if (isFound(upload)) {
        let newImage = upload.payload.images.map(image => {
          let dataImages = {
            name: image.name
          }
          return dataImages
        })
        let params = {
          priority: Number.parseInt(form.priority),
          topic: Number.parseInt(form.topic),
          title: form.title,
          message: form.message,
          images: newImage
        }
        this.props.addResolution(params)
      }
      if (isError(upload)) {
        this.setState({ notification: notifError(upload.message) })
      }
    }
    if (!isFetching(createResolution) && submiting) {
      this.setState({ submiting: false })
      Router.push(`/resolution-center?create=${createResolution.resolution.id}`)
    }
  }

  render () {
    const { images, form, validation, submiting, uploading } = this.state
    return (
      <section className='section is-paddingless'>
        <form className='form edit'>
          <div className='edit-data-delivery bg-white'>
            <div className='field'>
              <label className='label'>Prioritas</label>
              <div className='filter-option active'>
                <div className='sort-list check-list left'>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.priority === '3' && 'active'}`}>High</span>
                    <span className={`input-wrapper ${form.priority === '3' && 'checked'}`}>
                      <input type='checkbox' name='priority'
                        value='3'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.priority === '2' && 'active'}`}>Medium</span>
                    <span className={`input-wrapper ${form.priority === '2' && 'checked'}`}>
                      <input type='checkbox' name='priority'
                        value='2'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.priority === '1' && 'checked'}`}>Low</span>
                    <span className={`input-wrapper ${form.priority === '1' && 'checked'}`}>
                      <input type='checkbox' name='priority'
                        value='1'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                </div>
              </div>
              { validation && this.renderValidation('priority', 'Mohon pilih nama prioritas')}
            </div>
            <div className='field'>
              <label className='label'>Topik Keluhan</label>
              <div className='filter-option active'>
                <div className='sort-list check-list left'>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.topic === '1' && 'active'}`}>Umum</span>
                    <span className={`input-wrapper ${form.topic === '1' && 'checked'}`}>
                      <input type='checkbox' name='topic'
                        value='1'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.topic === '2' && 'active'}`}>Info</span>
                    <span className={`input-wrapper ${form.topic === '2' && 'checked'}`}>
                      <input type='checkbox' name='topic'
                        value='2'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.topic === '3' && 'active'}`}>Transaksi</span>
                    <span className={`input-wrapper ${form.topic === '3' && 'checked'}`}>
                      <input type='checkbox' name='topic'
                        value='3'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                  <label className='checkbox'>
                    <span className={`sort-text ${form.topic === '4' && 'active'}`}>Lainnya</span>
                    <span className={`input-wrapper ${form.topic === '4' && 'checked'}`}>
                      <input type='checkbox' name='topic'
                        value='4'
                        onChange={(e) => this.handleInput(e)} />
                    </span>
                  </label>
                </div>
              </div>
              { validation && this.renderValidation('topic', 'Mohon pilih nama Topik')}
            </div>
            <div className='field'>
              <label className='label'>Judul Keluhan</label>
              <p className='control'>
                <input className='input' type='text' name='title'
                  value={form.title}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              { validation && this.renderValidation('title', 'Mohon isi judul keluhan')}
            </div>
            <div className='field'>
              <label className='label'>Pesan Keluhan</label>
              <p className='control'>
                <textarea className='textarea sm' rows='1' name='message'
                  value={form.message}
                  onChange={(e) => this.handleInput(e)} />
              </p>
              { validation && this.renderValidation('message', 'Mohon isi pesan keluhan')}
            </div>
            <div className='add-product'>
              <h3 className='title-content'>Upload Foto</h3>
              <ul className='add-photo-list'>
                <FlipMove enterAnimation='fade' leaveAnimation='fade' style={styles}>
                  {
                    images.map((picture, index) => {
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
              { validation && this.renderValidation('images', 'Mohon upload foto')}
            </div>
            <div className='field'>
              <a className={`button is-primary is-large is-fullwidth ${(submiting || uploading) && 'is-loading'}`}
                onClick={() => this.submit()}>Simpan Perubahan
              </a>
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
    createResolution: state.createResolution,
    upload: state.upload
  }
}

const mapDispatchToProps = dispatch => ({
  addResolution: (params) => dispatch(userActions.createResolution(params)),
  photoUpload: (params) => dispatch(storesAction.photoUpload({data: params}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResolutionAdd)
