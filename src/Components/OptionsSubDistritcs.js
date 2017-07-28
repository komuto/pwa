const OptionsSubDistritcs = (props) => {
  return (
    <div className='sort-option' id='province' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Kecamatan</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data &&
                props.data.subdistricts.map((subDistrict) => {
                  return (
                    <label key={subDistrict.id} className={`radio ${props.selected.id === subDistrict.id && 'checked'}`} onClick={() => props.subDistrictSelected(subDistrict)}>
                      <input type='radio' name='provinsi' />
                      { subDistrict.name }
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

export default OptionsSubDistritcs
