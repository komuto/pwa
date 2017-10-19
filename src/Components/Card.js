/**
 * Safei Muslim
 * Yogyakarta , 2017
 * PT Skyshi Digital Indonesa
 */

/** card component */
export default ({ className, title, children }) => {
  return (
    <section className={`section is-paddingless has-shadow ${className}`}>
      <div className='seller-akun'>
        { title ? <Title title={title} /> : '' }
        { children }
      </div>
    </section>
  )
}

/** wrapper for list component */
export const WrapperList = ({ className, children }) => (
  <div className={`profile-wrapp ${className}`}>
    <ul>
      { children }
    </ul>
  </div>
)

/** wrapper for media component */
export const WrapperMedia = ({ className, children }) => (
  <div className={`info-purchase space-left ${className}`}>
    <div className='box'>
      <div className='media'>
        {children}
      </div>
    </div>
  </div>
)

/** wrapper for media component */
export const WrapperMediaColoumn = ({ className, children }) => (
  <div className='payment-detail step-pay'>
    <ul>
      <li>
        <div className='columns is-mobile is-multiline no-margin-bottom'>
          <div className='column'>
            <div className='box'>
              <div className='media list-item middle'>
                { children }
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
)

/** wrapper for info component */
export const WrapperInfo = ({ className, children }) => (
  <div className='info-purchase'>
    <div className='detail-rate is-purchase'>
      <div className='columns total-items is-mobile is-multiline no-margin-bottom'>
        <div className='column'>
          <div className='rating-content is-left'>
            { children }
          </div>
        </div>
      </div>
    </div>
  </div>
)

/** title for card component */
const Title = ({ title }) => {
  return (
    <div className='container is-fluid'>
      <div className='title'>
        <h3>{ title }</h3>
      </div>
    </div>
  )
}
