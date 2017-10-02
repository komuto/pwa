const OptionsInsurance = (props) => {
  return (
    <div className='sort-option insuranceButton' id='province' style={{display: props.show && 'block'}} onClick={(e) => props.onClick(e)}>
      <div className='sort-list'>
        <p><strong>Pilih Asuransi</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option' style={{ height: '100px', overflow: 'scroll' }}>
              {
                props.data.map((data) => {
                  return (
                    <label key={data} className={`radio ${props.selected === data && 'checked'}`} onClick={(e) => props.insuranceSelected(e, data)}>
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
