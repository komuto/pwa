const OptionsDistritcs = (props) => {
  return (
    <div className='sort-option' id='province' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Kabupaten</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data &&
                props.data.districts.map((district) => {
                  return (
                    <label key={district.id} className={`radio ${props.selected.id === district.id && 'checked'}`} onClick={() => props.districtSelected(district)}>
                      <input type='radio' name='provinsi' />
                      { district.name }
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

export default OptionsDistritcs
