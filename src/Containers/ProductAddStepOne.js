import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import FlipMove from 'react-flip-move'
// component
import MyImage from '../Components/MyImage'
import Wizard from '../Components/Wizard'
import Notification from '../Components/Notification'

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
    this.state = {
      pictures: [],
      notAcceptedFileType: [],
      notAcceptedFileSize: [],
      notification: {
        status: false,
        message: 'Error, default message.'
      }
    }
  }

  triggerFileUpload () {
    this.inputElementPress.click()
  }

  onDropFile (e) {
    let files = e.target.files
    let { pictures, notAcceptedFileType, notAcceptedFileSize, notification } = this.state
    notification = {
      status: false,
      message: 'Error, default message.'
    }
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
      const reader = new FileReader()
      reader.onload = (e) => {
        pictures.push(e.target.result)
        this.setState({ pictures })
      }
      reader.readAsDataURL(f)
    }
  }

  inputElement (input) {
    this.inputElementPress = input
  }

  hasExtension (fileName) {
    return (new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$')).test(fileName)
  }

  removeImage (picture) {
    const filteredAry = this.state.pictures.filter((e) => e !== picture)
    this.setState({pictures: filteredAry})
  }

  render () {
    const { pictures, notification } = this.state
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
                  pictures.map((picture, index) => {
                    return (
                      <li key={index}>
                        <div className='photo-product'>
                          <a onClick={() => this.removeImage(picture)} className='del-photo'><span className='icon-cross-circle' /></a>
                          <div className='photo-wrapp'>
                            <MyImage src={picture} alt='' />
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
                <button onClick={() => Router.push('/product-add-step-two')} className='button is-primary is-large is-fullwidth'>Lanjutkan</button>
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

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepOne)
