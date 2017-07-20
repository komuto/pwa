import moment from 'moment'
import MyImage from '../Components/MyImage'
import MyRating from '../Components/MyRating'

export default (props) => {
  let reviewDate = moment.unix(props.created_at).format('MM/DD/YYYY')
  let longDay = moment().diff(reviewDate, 'days')

  return (
    <div className='review-content'>
      <div className='profile-content rating'>
        <div className='profile-wrapp is-paddingless'>
          <ul className='detail-seller'>
            <li>
              <div className='box is-paddingless'>
                <article className='media'>
                  <div className='media-left'>
                    <figure className='image user-pict'>
                      <MyImage src={props.user.photo} />
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <p className='user-name'>
                        <strong> {props.user.name} </strong>
                        <br />
                        <span>
                          { longDay > 30 ? reviewDate : longDay + ' hari yang lalu' }
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='columns detail-rating is-mobile is-multiline no-margin-bottom'>
        <div className='column is-half'>
          <div className='rating-content is-left'>
            <h3>Kualitas Produk</h3>
            <span className='value-rate' style={{ display: 'block' }}>{props.quality.toFixed(1) || 0}</span>
            <MyRating
              readonly
              initialRate={props.quality}
              start={0}
              stop={5} />
          </div>
        </div>
        <div className='column is-half'>
          <div className='rating-content is-left'>
            <h3>Akurasi Produk</h3>
            <span className='value-rate' style={{ display: 'block' }}>{props.accuracy.toFixed(1) || 0}</span>
            <MyRating
              readonly
              initialRate={props.accuracy}
              start={0}
              stop={5} />
          </div>
        </div>
        <div className='column'>
          <p className='desc'>{ props.review }</p>
        </div>
      </div>
    </div>
  )
}
