import Content from './Content'
// import Section from './Section'
import moment from 'moment'
import MyImage from './MyImage'
import Images from '../Themes/Images'
moment.locale('id')

/** comment component */
export default (props) => (
  <Content>
    <List {...props} />
    <New {...props} />
  </Content>
)

/** list of discussion */
export const List = ({ data, messagesEnd }) => {
  if (data.length === 0) {
    return <EmptyDiscussion />
  } else {
    return (
      <section className='section is-paddingless bg-white'>
        <div className='discuss'>
          <ul className='notif-detail'>
            {
              data.map((data, index) => (
                <Item key={index} data={data} />
              ))
            }
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={(el) => { messagesEnd = el }} />
          </ul>
        </div>
      </section>
    )
  }
}

/** item list of discussion */
export const Item = ({ data }) => (
  <li>
    <div className='box is-paddingless'>
      <article className='media'>
        <div className='media-left top is-full-bordered'>
          <figure className='image user-pict'>
            <div style={{ width: '100%', height: '100%', borderRadius: 20, backgroundImage: `url(${data.user.photo})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
            {/* <MyImage src={data.user.photo} alt='pict' /> */}
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p className='user-name wrapword'>
              <strong>{ data.user.name }</strong>
              { data.content }
            </p>
          </div>
          <span className='time-discuss'>{moment.unix(data.created_at).format('DD MMMM YYYY - hh:mm')}</span>
        </div>
      </article>
    </div>
  </li>
)
/** add new discussion */
export const New = ({ onSubmit, onChange, value, submitting, placeHolder }) => {
  let isActive = false
  if (value !== '') {
    isActive = true
  }

  if (submitting) {
    isActive = false
  }
  return (
    <div className='add-comment'>
      <div className='field'>
        <p className='control'>
          <textarea onChange={onChange} value={submitting ? 'Loading...' : value} className='textarea' placeholder={`${placeHolder !== undefined ? placeHolder : 'Tulis Komentar'}`} readOnly={submitting} />
          <button onClick={() => isActive && onSubmit()} className={`icon-btn-send-inactive ${(isActive) ? 'active' : ''}`} />
        </p>
      </div>
    </div>
  )
}

const EmptyDiscussion = () => {
  return (
    <div className='content'>
      <div className='container is-fluid'>
        <div className='desc has-text-centered'>
          <MyImage src={Images.emptyStatesDiscussion} alt='komuto' />
          <br /><br />
          <p><strong className='bold'>Diskusi Anda Kosong</strong></p>
          <p>Anda belum pernah melakukan tanya jawab kepada penjual untuk menyelesaikan masalah</p>
        </div>
      </div>
    </div>
  )
}
