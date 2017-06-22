
// pin type: gross is grossir, disc is discount

export default (props:any) => {
  const {viewActive, images, pin, name, store, discount, price, wish} = props
  return (
    <div className={`column ${viewActive === 'grid' ? 'is-half' : ''}`}>
      <div className={`box ${viewActive}`} >
        <div className='media'>
          <div className='media-left'>
            <figure className='image'>
              <a><img src={images} alt='Image' /></a>
              {
                (pin.type === 'gross')
                ? <div className='pin'><span>{ pin.value }</span></div>
                : <div className='pin disc'><span>{ pin.value }</span></div>
              }
            </figure>
          </div>
          <div className='media-content'>
            <div className='content'>
              <h4>{name}</h4>
              <div className='detail'>
                <p>{store} <span className='icon-verified' /></p>
                <div className='discount'> { discount } </div>
                <span className='price'> { price } </span>
                <span className='wish'><span className='icon-wishlist wishlisted' /> { wish } </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
