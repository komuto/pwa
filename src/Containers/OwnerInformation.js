// @flow
import React from 'react'
import { connect } from 'react-redux'
// components
import Link from 'next/link'

class OwnerInformation extends React.Component {

  render () {
    return (
      <div>
        <section className='section is-paddingless'>
          <div className='seller-bar'>
            <div className='seller-step active3'>
              <div className='step1'><span>1</span></div>
              <div className='step2'><span>2</span></div>
              <div className='step3'><span>3</span></div>
              <div className='step4'><span>4</span></div>
            </div>
          </div>
          <div className='form-seller info'>
            <div className='field'>
              <label>Nama Pemilik</label>
              <p className='control'>
                <strong>Dwinawan Hari Wijaya</strong>
              </p>
            </div>
            <div className='field'>
              <label>Alamat Email</label>
              <p className='control'>
                <strong>dwinawan@gmail.com</strong>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <input type='text' className='input' placeholder='No Identitas (KTP/SIM/Paspor)' />
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <input type='text' className='input' placeholder='Nama Ibu Kandung' />
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <Link href='address-info' as='ai'>
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

export default connect()(OwnerInformation)
