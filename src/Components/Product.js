// lib
import RupiahFormat from '../Lib/RupiahFormat'
// pin type: gross is grossir, disc is discount

export default (props:any) => {
  const {product, store, viewActive, imagesDefault} = props
  let pin = null
  if (product.is_discount) pin = <div className='pin disc'><span>{ `${product.discount}%` }</span></div>
  if (product.is_dropshipper) pin = <div className='pin'><span>Dropship</span></div>
  if (product.is_wholesaler) pin = <div className='pin'><span>Grossir</span></div>

  const thumb = imagesDefault
  // let thumb = images[0].file
  const priceBeforeDiscount = (product.discount > 0) ? <div className='discount'> Rp { RupiahFormat(product.price) } </div> : ''
  const priceAfterDiscount = (product.discount > 0) ? (product.price - (product.price * (product.discount / 100))) : product.price

  return (
    <div className={`column ${viewActive === 'grid' ? 'is-half' : ''}`}>
      <div className={`box ${viewActive}`} >
        <div className='media'>
          <div className='media-left'>
            <figure className='image'>
              <a><img src={thumb} alt='Image' /></a>
              { pin }
            </figure>
          </div>
          <div className='media-content'>
            <div className='content'>
              <h4>{product.name}</h4>
              <div className='detail'>
                <p>{store.name} { (store.is_verified) ? <span className='icon-verified' /> : '' }</p>
                { priceBeforeDiscount }
                <span className='price' style={{ width: '100%' }}>Rp { RupiahFormat(priceAfterDiscount) } </span>
                <span className='wish'><span className='icon-wishlist wishlisted' /> { product.count_like } </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
