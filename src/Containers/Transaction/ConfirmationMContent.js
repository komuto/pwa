// components
import Content from '../../Components/Content'
import MyImage from '../../Components/MyImage'
import MyRating from '../../Components/MyRating'
import { FieldError } from '../../Components/Notification'

const MatchingContent = (props) => {
  const { invoice, submiting } = props
  return (
    <Content>
      <section className='section is-paddingless has-shadow'>
        <div className='mark'>
          <p>Silahkan memberi review untuk barang yang telah Anda terima</p>
        </div>
        <div className='edit-data-delivery bg-white'>
          {
            invoice.items && invoice.items.map((item, index) => {
              let itemQuality = item.quality !== undefined ? item.quality : 0
              let itemAccuracy = item.accuracy !== undefined ? item.accuracy : 0
              return <div key={index}>
                <div className='box'>
                  <div className='media'>
                    <div className='media-left is-bordered'>
                      <figure className='image list-transaction'>
                        <a><MyImage src={item.product.image} alt={item.product.name} /></a>
                      </figure>
                    </div>
                    <div className='media-content middle'>
                      <div className='content'>
                        <h4>{item.product.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='rating-content is-left'>
                      <h3>Kualitas Produk { item.error !== 'quality' ? '' : <FieldError /> }</h3>
                      <MyRating
                        onChange={(e) => props.onSelectQualityProduct(e, item)}
                        size={24}
                        initialRate={itemQuality}
                        start={0}
                        stop={5} />
                      <span className='review-result'>{props.typeRating(itemQuality)}</span>
                    </div>
                  </div>
                </div>
                <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
                  <div className='column'>
                    <div className='rating-content is-left'>
                      <h3>Akurasi Produk { item.error !== 'accuracy' ? '' : <FieldError /> }</h3>
                      <MyRating
                        onChange={(e) => props.onSelectAccuracyProduct(e, item)}
                        size={24}
                        initialRate={itemAccuracy}
                        start={0}
                        stop={5} />
                      <span className='review-result'>{props.typeRating(itemAccuracy)}</span>
                    </div>
                  </div>
                </div>
                <br />
                <div className='field'>
                  <p className='control'>
                    { item.error !== 'note' ? '' : <FieldError /> }
                    <input value={item.note !== undefined ? item.note : ''} onChange={(e) => props.onChangeNoteReview(e, item)} className='input' type='text' placeholder='Apa pendapat Anda tentang barang ini?' />
                  </p>
                </div>
              </div>
            })
          }
        </div>
      </section>
      <section className='section is-paddingless'>
        <div className='container is-fluid'>
          <a onClick={() => !submiting.review && props.submitReview()} className={`button is-primary is-large is-fullwidth ${submiting.review && 'is-loading'}`}>Kirim Ulasan</a>
        </div>
      </section>
    </Content>
  )
}

export default MatchingContent
