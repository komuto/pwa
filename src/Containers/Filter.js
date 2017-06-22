// @flow
import React from 'react'

const Filter = (props) => {
  const { isShow } = props
  return (
    <div className={`modal modal-filter ${isShow ? 'is-active' : ''}`} id='modal-filter'>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Filter</p>
          <button onClick={() => props.filterClose()} className='delete icon-close' />
        </header>
        <section className='modal-card-body'>
          <div className='fiter-side'>
            <div className='tabs'>
              <ul>
                <li className='is-active'><a data-target='#kondisi'>Kondisi</a></li>
                <li><a data-target='#jasa'>Jasa Pngiriman</a></li>
                <li><a data-target='#harga'>Rentang Harga</a></li>
                <li><a data-target='#dikirim'>Dikirim Dari</a></li>
                <li><a data-target='#brand'>Brand</a></li>
                <li><a data-target='#lainnya'>Lainnya</a></li>
              </ul>
            </div>
          </div>
          <div className='filter-option active' id='kondisi'>
            <div className='sort-list'>
              <label className='checkbox' htmlFor='#semuaKondisi'>
                <span className='sort-text'>Semua Kondisi</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='semuaKondisi' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#baru'>
                <span className='sort-text'>Termurah</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='baru' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#bekas'>
                <span className='sort-text'>Termahal</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='bekas' />
                </span>
              </label>
            </div>
          </div>
          <div className='filter-option' id='jasa'>
            <div className='sort-list'>
              <label className='checkbox' htmlFor='#semuaEkspedisi'>
                <span className='sort-text'>Semua Ekspedisi</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='semuaEkspedisi' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#reguler'>
                <span className='sort-text'>JNE Reguler</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='reguler' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#oke'>
                <span className='sort-text'>JNE Yes</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='oke' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#popbox'>
                <span className='sort-text'>JNE Popbox</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='popbox' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#ctc'>
                <span className='sort-text'>JNE CTC</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='ctc' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#ctcOke'>
                <span className='sort-text'>JNE CTC OKE</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='ctcOke' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#ctcYes'>
                <span className='sort-text'>JNE CTC YES</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='ctcYes' />
                </span>
              </label>
            </div>
          </div>
          <div className='filter-option' id='harga'>
            <div className='sort-list'>
              <label className='checkbox' htmlFor='#hargaMinimal'>
                <span className='label'>Harga Minimal</span>
                <span className='sort-text'>Rp 100.000</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='hargaMinimal' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#hargaMaksimal'>
                <span className='label'>Harga Maksimal</span>
                <span className='sort-text'>Rp 250.000</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='hargaMaksimal' />
                </span>
              </label>
            </div>
          </div>
          <div className='filter-option' id='dikirim'>
            <div className='sort-list'>
              <label className='checkbox' htmlFor='#'>
                <span className='label'>Harga Minimal</span>
                <div className='field'>
                  <p className='control'>
                    <span className='select'>
                      <select>
                        <option>DKI Jakarta</option>
                        <option>With options</option>
                      </select>
                    </span>
                  </p>
                </div>
              </label>
              <label className='checkbox' htmlFor='#'>
                <span className='label'>Kota</span>
                <div className='field'>
                  <p className='control'>
                    <span className='select'>
                      <select>
                        <option>Jakarta Barat</option>
                        <option>With options</option>
                      </select>
                    </span>
                  </p>
                </div>
              </label>
            </div>
          </div>
          <div className='filter-option' id='brand'>
            <div className='sort-list'>
              <label className='checkbox' htmlFor='#allBrand'>
                <span className='sort-text'>Semua Brand</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='allBrand' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#brand1'>
                <span className='sort-text'>Adidas</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='brand1' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#brand2'>
                <span className='sort-text'>Nike</span>
                <span className='input-wrapper'>
                  <input className='checkbox' id='brand2' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#brand3'>
                <span className='sort-text'>New Balance</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='brand3' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#brand4'>
                <span className='sort-text'>Diadora</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='brand4' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#brand5'>
                <span className='sort-text'>Rebook</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='brand35' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#brand6'>
                <span className='sort-text'>Umbro</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='brand6' />
                </span>
              </label>
            </div>
          </div>
          <div className='filter-option' id='lainnya'>
            <div className='sort-list'>
              <label className='checkbox' htmlFor='#diskon'>
                <span className='sort-text'>Diskon</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='diskon' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#terverifikasi'>
                <span className='sort-text'>Seller Terverifikasi</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='terverifikasi' />
                </span>
              </label>
              <label className='checkbox' htmlFor='#grosir'>
                <span className='sort-text'>Grosir</span>
                <span className='input-wrapper'>
                  <input type='checkbox' id='grosir' />
                </span>
              </label>
            </div>
          </div>
        </section>
        <footer className='modal-card-foot'>
          <div className='columns is-mobile'>
            <div className='column'>
              <a className='button is-large is-fullwidth is-outlined'>Reset Filter</a>
            </div>
            <div className='column'>
              <a className='button is-primary is-large is-fullwidth'>Terapkan Filter</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Filter
