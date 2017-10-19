import Content from './Content'
// import Section from './Section'
import MyImage from './MyImage'
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
            <MyImage src={data.user.photo} alt='pict' />
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
export const New = ({ onChange, onEnter, value, submitting }) => (
  <div className='add-comment' style={{ position: 'fixed' }}>
    <div className='field'>
      <p className='control'>
        <span className={`${submitting && 'button self is-loading right'}`} />
        <input
          onChange={onChange}
          value={value}
          onKeyPress={onEnter}
          className='textarea'
          placeholder='Tulis Komentar'
          readOnly={submitting} />
      </p>
    </div>
  </div>
)
