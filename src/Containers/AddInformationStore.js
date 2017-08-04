// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Link from 'next/link'
import {Images} from '../Themes'

class AddInformationStore extends React.Component {

  render () {
    return (
      <div>
        <section className='section is-paddingless'>
          <div className='seller-bar'>
            <div className='seller-step active1'>
              <div className='step1'><span>1</span></div>
              <div className='step2'><span>2</span></div>
              <div className='step3'><span>3</span></div>
              <div className='step4'><span>4</span></div>
            </div>
          </div>

          <div className='upload-pict'>
            <div className='pict-wrapper'>
              <img src={Images.iconCamera} alt='' />
            </div>
            <p className='has-text-centered'><a>Upload Foto Profil Toko</a></p>
          </div>

          <div className='form-seller'>
            <div className='field'>
              <label>Nama Toko</label>
              <p className='control'>
                <input type='text' className='input' placeholder='Nama Toko' />
                <span>Nama toko tidak dapat diubah</span>
              </p>
            </div>
            <div className='field'>
              <label>Slogan</label>
              <p className='control'>
                <textarea className='textarea' placeholder='Tulis Pertanyaan' rows='1' />
                <span className='reg'>25 sisa karakter</span>
              </p>
            </div>
            <div className='field'>
              <label>Deskripsi Toko</label>
              <p className='control'>
                <textarea className='textarea' placeholder='Tulis Pertanyaan' rows='1' />
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <Link href='shipping-expedition' as='se'>
                  <button className='button is-primary is-large is-fullwidth'>Lanjutkan</button>
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default connect()(AddInformationStore)
