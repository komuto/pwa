import Router from 'next/router'

export default ({onClick, className, title, url, as}) => (
  <li onClick={(e) => Router.push(url, as)}>
    <div className='box is-paddingless'>
      <article className='media'>
        <div className='media-left'>
          <figure className='image'>
            <span className={className} />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p>
              <strong>{ title }</strong><br />
            </p>
          </div>
        </div>
      </article>
    </div>
    <span className='icon-arrow-right' />
  </li>
)
