const OptionsInsurance = (props) => {
  return (
    <div className='sort-option' id='province' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Provinsi</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data.map((data) => {
                  return (
                    <label key={data} className={`radio ${props.selected === data && 'checked'}`} onClick={() => props.insuranceSelected(data)}>
                      <input type='radio' name='insurance' />
                      { data }
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

export default OptionsInsurance
