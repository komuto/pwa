import Content from './Content'
// import Section from './Section'
import moment from 'moment'
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

/** item list of discussion */
export const Item = ({ data }) => (
  <li>
    <div className='box is-paddingless'>
      <article className='media'>
        <div className='media-left top is-full-bordered'>
          <figure className='image list-transaction xs'>
            <div style={{ width: '100%', height: '100%', borderRadius: 20, backgroundImage: `url(${data.user.photo})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p className='user-name'>
              <strong>{ data.user.name }</strong>
              { data.content }
            </p>
          </div>
          <span className='time-discuss'>{moment.unix(data.created_at).format('Do MMMM YYYY')}</span>
        </div>
      </article>
    </div>
  </li>
)
/** add new discussion */
export const New = ({ onSubmit, onChange, value, submitting }) => {
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
          <textarea onChange={onChange} value={value} className='textarea' placeholder='Tulis pesan Anda disini' />
          <button onClick={() => isActive && onSubmit()} className={`icon-btn-send-inactive ${(isActive) ? 'active' : ''}`} />
        </p>
      </div>
    </div>
    // <div className='add-comment' style={{ position: 'fixed' }}>
    //   <div className='field'>
    //     <p className='control'>
    //       <span className={`${submitting && 'button self is-loading right'}`} />
    //       <input
    //         onChange={onChange}
    //         value={value}
    //         onKeyPress={onEnter}
    //         className='textarea'
    //         placeholder='Tulis Komentar'
    //         readOnly={submitting} />
    //     </p>
    //   </div>
    // </div>
  )
}
