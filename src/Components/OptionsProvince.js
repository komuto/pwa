const OptionsProvince = (props) => {
  return (
    <div className='sort-option' id='province' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Provinsi</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data.provinces.map((province) => {
                  return (
                    <label key={province.id} className={`radio ${props.selected.id === province.id && 'checked'}`} onClick={() => props.provinceSelected(province)}>
                      <input type='radio' name='provinsi' />
                      { province.name }
                    </label>
                  )
                })
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OptionsProvince
