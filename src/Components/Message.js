import MyImage from './MyImage'

export default ({ store, title, description, submit, show, submitting, showPress }) => {
  return (
    <div className={`modal modal-filter modal-dropship ${show ? 'is-active' : ''}`}>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head bg-red'>
          <p className='modal-card-title'>Kirim Pesan</p>
          <button onClick={() => showPress()} className='delete icon-close white' />
        </header>
        <section className='modal-card-body is-paddingless' style={{ marginBottom: 0 }}>
          <div className='profile-wrapp border-bottom'>
            <ul>
              <li>
                <div className='box is-paddingless'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image product-pict' style={{ width: 40 }}>
                        <MyImage src={store.logo} alt={store.name} />
                      </figure>
                    </div>
                    <div className='media-content'>
                      <div className='content'>
                        <p className='products-name'>
                          <strong>{ store.name }</strong>
                          <br />
                          <span>Jakarta Selatan, DKI Jakarta</span>
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            </ul>
          </div>
          <div className='add-discussion'>
            <div className='field'>
              <label>Judul Pesan</label>
              <p className='control'>
                <input name='title' onChange={(e) => title.onChange(e)} type='text' className='input' placeholder='Tulis Judul' />
              </p>
            </div>
            <div className='field'>
              <label>Pertanyaan Anda</label>
              <p className='control'>
                <textarea name='description' onChange={(e) => description.onChange(e)} className='textarea text-discus' placeholder='Tulis Pertanyaan' rows='1' />
              </p>
              <p className='control'>
                <button onClick={(e) => !submitting.message && submit(e)} className={`button is-primary is-large is-fullwidth ${submitting.message ? 'is-loading' : ''}`}>Kirim Pesan</button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
