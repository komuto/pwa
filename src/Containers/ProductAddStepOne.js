import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import FlipMove from 'react-flip-move'
// component
import MyImage from '../Components/MyImage'
import Wizard from '../Components/Wizard'

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
      notAcceptedFileSize: []
    }
  }

  triggerFileUpload () {
    this.inputElement.click()
  }

  onDropFile (e) {
    const { pictures, notAcceptedFileType, notAcceptedFileSize } = this.state
    const files = e.target.files
    // Iterate over all uploaded files
    for (let i = 0; i < files.length; i++) {
      let f = files[i]
      // Check for file extension
      if (!this.hasExtension(f.name)) {
        notAcceptedFileType.push(f.name)
        this.setState({ notAcceptedFileType })
        continue
      }
      // Check for file size
      if (f.size > this.props.maxFileSize) {
        notAcceptedFileSize.push(f.name)
        this.setState({ notAcceptedFileSize })
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
    this.inputElement = input
  }
  hasExtension (fileName) {
    return (new RegExp('(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$')).test(fileName)
  }

  removeImage (picture) {
    const filteredAry = this.state.pictures.filter((e) => e !== picture)
    this.setState({pictures: filteredAry})
  }

  render () {
    const { pictures } = this.state
    return (
      <section className='section is-paddingless'>
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
                    ref={input => this.inputElement(input)}
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
  label: 'Max file size: 5mb, accepted: jpg|gif|png|gif',
  imgExtension: ['.jpg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: ' file size is too big',
  fileTypeError: ' is not supported file extension'
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddStepOne)
