import moment from 'moment'
import RupiahFormat from '../Lib/RupiahFormat'
import MyImage from '../Components/MyImage'
import Router from 'next/router'
let subTotal = 0

export default ({ newOrderDetail }) => (
  <div>
    <section className='section is-paddingless has-shadow'>
      <div className='info-purchase'>
        <div className='detail-rate is-purchase'>
          <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
            <div className='column is-half'>
              <div className='rating-content is-left'>
                <strong>No Invoice</strong>
              </div>
            </div>
            <div className='column is-half'>
              <div className='rating-content item-qty has-text-right'>
                <span className='has-text-left'>{newOrderDetail.orderDetail.invoice.invoice_number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='info-purchase'>
        <div className='detail-rate is-purchase'>
          <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
            <div className='column is-one-quarter'>
              <div className='rating-content is-left'>
                <strong>Tanggal Transaksi</strong>
              </div>
            </div>
            <div className='column'>
              <div className='rating-content item-qty has-text-right'>
                <span className='has-text-left'>{moment.unix(newOrderDetail.orderDetail.invoice.created_at).format('DD MMMM YYYY')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className='section is-paddingless has-shadow'>
      <div className='container is-fluid'>
        <div className='title'>
          <br />
          <h3>{newOrderDetail.orderDetail.invoice.type === 'seller' ? 'Info Reseller' : 'Info Pembeli'}</h3>
        </div>
      </div>
      <div className='payment-detail step-pay'>
        <ul>
          <li>
            <div className='columns is-mobile is-multiline no-margin-bottom'>
              <div className='column'>
                <div className='box'>
                  <div className='media'>
                    <div className='media-left is-full-bordered'>
                      <figure className='image list-transaction sm'>
                        <a><MyImage src={newOrderDetail.orderDetail.invoice.type === 'seller' ? newOrderDetail.orderDetail.reseller.store.logo : newOrderDetail.orderDetail.buyer.photo} alt='Image' /></a>
                      </figure>
                    </div>
                    <div className='media-content middle is-right-content'>
                      <div className='content'>
                        <h4>{newOrderDetail.orderDetail.invoice.type === 'seller' ? newOrderDetail.orderDetail.reseller.store.name : newOrderDetail.orderDetail.buyer.name}</h4>
                      </div>
                    </div>
                    <div className='right-top'>
                      {
                        newOrderDetail.orderDetail.invoice.type === 'seller'
                        ? <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message?id=${newOrderDetail.orderDetail.invoice.id}&type=reseller`)}>Kirim Pesan</a>
                        : <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message?id=${newOrderDetail.orderDetail.invoice.id}&type=buyer`)}>Kirim Pesan</a>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section className='section is-paddingless has-shadow'>
      <div className='container is-fluid'>
        <div className='title'>
          <br />
          <h3>Daftar Barang yang dibeli</h3>
        </div>
      </div>
      <ul className='list-trans-product'>
        { newOrderDetail.orderDetail.items.map((item, i) => {
          subTotal += item.total_price
          return (
            <li key={i}>
              <div className='box'>
                <div className='media'>
                  <div className='media-left is-bordered top'>
                    <figure className='image list-transaction lg'>
                      <a><MyImage src={item.product.image} alt='Image' /></a>
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <h4>{item.product.name} </h4>
                      <strong>Harga : Rp { RupiahFormat(item.product.price) } / item</strong>
                      <strong>Jumlah : {item.qty}</strong>
                      <span>{item.note !== '' && `"${item.note}"`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })
        }
      </ul>
    </section>
    <section className='section is-paddingless has-shadow'>
      <div className='container is-fluid'>
        <div className='title'>
          <h3>Informasi Pengiriman</h3>
        </div>
      </div>
      <div className='detail-purchase summary at-cart'>
        <div className='detail-result white'>
          <ul className='data-delivery'>
            <li>
              <div className='columns custom is-mobile'>
                <div className='column'>
                  <strong>Alamat Pengiriman</strong>
                  <span className='address'>
                    {newOrderDetail.orderDetail.buyer.name}<br />
                    {newOrderDetail.orderDetail.buyer.address.address}<br />
                    {newOrderDetail.orderDetail.buyer.address.village.name}, {newOrderDetail.orderDetail.buyer.address.subdistrict.name}, {newOrderDetail.orderDetail.buyer.address.district.name}<br />
                    {newOrderDetail.orderDetail.buyer.address.province.name}, {newOrderDetail.orderDetail.buyer.address.postal_code}<br />
                    Telp: {newOrderDetail.orderDetail.buyer.phone_number.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                  </span>
                  <div className='right-top topR'>
                    { newOrderDetail.orderDetail.invoice.type !== 'reseller' && <a className='button is-primary is-outlined'>Cetak Alamat</a> }
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {
        newOrderDetail.orderDetail.invoice.type === 'seller' && <div className='notif-inside'>
          <div className='notif-info'>
            <span>Barang ini terjual dari reseller. Sehingga nama toko reseller disertakan.</span>
          </div>
        </div>
      }
      { newOrderDetail.orderDetail.invoice.type === 'seller' || newOrderDetail.orderDetail.invoice.type === 'reseller'
        ? <ul className='list-trans-product'>
          <li>
            <div className='columns custom is-mobile'>
              <div className='column'>
                <strong>Info Alamat Penjual</strong><br />
                <span className='address'>
                  {newOrderDetail.orderDetail.seller.name} ({newOrderDetail.orderDetail.reseller.store.name})<br />
                  {newOrderDetail.orderDetail.seller.address.address}<br />
                  {newOrderDetail.orderDetail.seller.address.village.name}, {newOrderDetail.orderDetail.seller.address.subdistrict.name}, {newOrderDetail.orderDetail.seller.address.district.name}<br />
                  {newOrderDetail.orderDetail.seller.address.province.name}, {newOrderDetail.orderDetail.seller.address.postal_code}<br />
                </span>
                <div className='right-top topR'>
                  { newOrderDetail.orderDetail.invoice.type !== 'reseller' && <a className='button is-primary is-outlined'>Cetak Alamat</a> }
                </div>
              </div>
            </div>
          </li>
        </ul>
        : <ul className='list-trans-product'>
          <li>
            <div className='columns custom is-mobile'>
              <div className='column'>
                <strong>Info Alamat Penjual</strong><br />
                <span className='address'>
                  {newOrderDetail.orderDetail.seller.name}<br />
                  {newOrderDetail.orderDetail.seller.address.address}<br />
                  {newOrderDetail.orderDetail.seller.address.village.name}, {newOrderDetail.orderDetail.seller.address.subdistrict.name}, {newOrderDetail.orderDetail.seller.address.district.name}<br />
                  {newOrderDetail.orderDetail.seller.address.province.name}, {newOrderDetail.orderDetail.seller.address.postal_code}<br />
                </span>
                <div className='right-top topR'>
                  { newOrderDetail.orderDetail.invoice.type !== 'reseller' && <a className='button is-primary is-outlined'>Cetak Alamat</a> }
                </div>
              </div>
            </div>
          </li>
        </ul>
      }
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option'>Kurir Pengiriman <span className='kurir normal'>{newOrderDetail.orderDetail.invoice.expedition.expedition.name}</span></span>
        </div>
      </div>
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option'>Paket Pengiriman <span className='kurir normal'>{newOrderDetail.orderDetail.invoice.expedition.name}</span></span>
        </div>
      </div>
      <div className='column is-paddingless'>
        <div className='see-all'>
          <span className='link black js-option'>Asuransi <span className='kurir normal'>{newOrderDetail.orderDetail.invoice.is_insurance ? 'Ya' : 'Tidak'}</span></span>
        </div>
      </div>
    </section>
    <section className='section is-paddingless has-shadow'>
      <div className='container is-fluid'>
        <div className='title'>
          <h3>Detail Harga</h3>
        </div>
      </div>
      <div className='info-purchase'>
        <div className='detail-purchase summary trans-detail'>
          <div className='detail-result white'>
            <ul>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><strong>Subtotal</strong></div>
                  <div className='column is-half has-text-right'><span>Rp { RupiahFormat(subTotal) }</span></div>
                </div>
              </li>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><strong>Biaya Asuransi</strong></div>
                  <div className='column is-half has-text-right'><span>Rp { RupiahFormat(newOrderDetail.orderDetail.invoice.insurance_fee) }</span></div>
                </div>
              </li>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><strong>Ongkos Kirim</strong></div>
                  <div className='column is-half has-text-right'><span>Rp { RupiahFormat(newOrderDetail.orderDetail.invoice.delivery_cost) }</span></div>
                </div>
              </li>
            </ul>
            <ul className='total'>
              <li>
                <div className='columns custom is-mobile'>
                  <div className='column is-half'><strong>Total</strong></div>
                  <div className='column is-half has-text-right'><strong>Rp { RupiahFormat(newOrderDetail.orderDetail.invoice.total_bill) }</strong></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
)

// newOrderDetail.orderDetail.invoice.type === 'buyer' && <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message?id=${newOrderDetail.orderDetail.invoice.id}&type=buyer&onProcess=`)}>Kirim Pesan</a>
// newOrderDetail.orderDetail.invoice.type === 'seller' && <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message?id=${newOrderDetail.orderDetail.invoice.id}&type=seller&onProcess=`)}>Kirim Pesan</a>
// newOrderDetail.orderDetail.invoice.type === 'reseller' && <a className='button is-primary is-outlined' onClick={() => Router.push(`/send-message?id=${newOrderDetail.orderDetail.invoice.id}&type=reseller&onProcess=`)}>Kirim Pesan</a>
