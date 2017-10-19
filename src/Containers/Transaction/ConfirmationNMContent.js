// components
import Content from '../../Components/Content'
import MyImage from '../../Components/MyImage'
import { FieldError } from '../../Components/Notification'
import FlipMove from 'react-flip-move'

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '100%'
}

const NotMatchingContent = (props) => {
  const { invoice, problems, solution, images, note, field, error, submiting } = props
  return (
    <Content>
      <section className='section is-paddingless has-shadow'>
        <div className='edit-data-delivery bg-white '>
          <form action='#' className='form edit '>
            <div className='field'>
              <label className='label'>Pilih barang yang bermasalah { error === field.productProblem ? <FieldError /> : '' } </label>
              <div className='filter-option active issue'>
                {
                invoice.items.map((item, index) => {
                  return <div className='sort-list middle' key={index} onClick={(e) => props.onCheckProducts(e, item)}>
                    <label className='checkbox'>
                      <div className='box is-paddingless'>
                        <article className='media'>
                          <div className='media-left is-bordered'>
                            <figure className='image'>
                              <MyImage src={item.product.image} alt={item.product.name} />
                            </figure>
                          </div>
                          <div className='media-content middle'>
                            <div className='content'>
                              <p>
                                <strong>{item.product.name}</strong>
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                      <span className={`input-wrapper ${item.selected !== undefined ? item.selected ? 'checked' : '' : ''}`}>
                        <input type='checkbox' value='' />
                      </span>
                    </label>
                  </div>
                })
              }
              </div>
            </div>
            <div className='field'>
              <label className='label'>Masalah yang terjadi { error === field.problems ? <FieldError /> : '' }</label>
              <div className='filter-option active'>
                {
                problems.map((p, index) => {
                  return <div className='sort-list middle' key={index} onClick={(e) => props.onCheckProblems(e, p)}>
                    <label className='checkbox'>
                      <span className='sort-text'>{p.name}</span>
                      <span className={`input-wrapper ${p.selected ? 'checked' : ''}`}>
                        <input type='checkbox' value='' />
                      </span>
                    </label>
                  </div>
                })
              }
              </div>
            </div>
            <div className='add-discussion report'>
              <div className='field'>
                <label className='label'>Solusi yang diinginkan { error === field.solution ? <FieldError /> : '' }</label>
                <p className='control'>
                  {
                  solution.data.map((d, index) => {
                    return <label className={`radio ${d === solution.selected ? 'checked' : ''}`} key={index} onClick={(e) => props.onSelectSolution(e, d)}>
                      <input type='radio' name='report' />
                      { d }
                    </label>
                  })
                }
                </p>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Upload Photo { error === field.photo ? <FieldError /> : '' }</label>
              <div className='add-product'>
                <ul className='add-photo-list'>
                  <FlipMove enterAnimation='fade' leaveAnimation='fade' style={styles}>
                    {
                  images.map((picture, index) => {
                    return (
                      <li key={index}>
                        <div className='photo-product'>
                          <a onClick={() => props.removeImage(picture)} className='del-photo'><span className='icon-cross-circle' /></a>
                          <div className='photo-wrapp'>
                            <MyImage src={picture.preview} alt='preview' />
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
                    <li>
                      <a onClick={() => props.triggerFileUpload()} className='add-photo'><span className='icon-add-big' /></a>
                      <input
                        style={{ display: 'none' }}
                        type='file'
                        ref={(input) => props.inputElement(input)}
                        name={props.name}
                        multiple='multiple'
                        onChange={(e) => props.onDropFile(e)}
                        accept={props.accept}
                        className={props.className} />
                    </li>
                  </FlipMove>
                </ul>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Keterangan</label>
              <p className='control'>
                <input className='input' type='text' value={note.complaint} onChange={(e) => props.onChangeNoteComplaint(e)} />
              </p>
            </div>
          </form>
        </div>
      </section>
      <section className='section is-paddingless'>
        <div className='container is-fluid'>
          <a onClick={() => !submiting.complaint && props.submitComplaint()} className={`button is-primary is-large is-fullwidth ${submiting.complaint && 'is-loading'}`}>Kirim Komplain</a>
        </div>
      </section>
    </Content>
  )
}

export default NotMatchingContent
