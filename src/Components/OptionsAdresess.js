import Router from 'next/router'

const OptionsAdresess = (props) => {
  return (
    <div className='sort-option' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Alamat Pengiriman</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option change-address' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data.map((data) => {
                  return (
                    <label className={`radio ${data.id === props.selected.id && 'checked'}`} key={data.id} onClick={() => props.addressSelected(data)}>
                      <input type='radio' name='address' />
                      <strong>{ data.alias_address }</strong>
                      <p>{data.address} , {data.village.name}, {data.subDistrict.name}, {data.district.name}, {data.province.name}, Indonesia {data.postal_code}</p>
                    </label>
                  )
                })
              }
              <a
                className='add-new-address'
                onClick={() => Router.push(`/shipping-information?id=${props.id}`)}>
                + Tambah Alamat Baru
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OptionsAdresess
