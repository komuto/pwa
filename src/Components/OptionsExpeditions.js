import MyImage from './MyImage'
const OptionsExpeditions = (props) => {
  return (
    <div className='sort-option' id='expedition' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Expedisi Pengiriman</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option kurir' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data.map((expedition) => {
                  return (
                    <label key={expedition.id} className={`radio ${props.selected.id === expedition.id && 'checked'}`} onClick={(e) => props.expeditionSelected(e, expedition)}>
                      <input type='radio' name='expedisi' />
                      <MyImage src={expedition.logo} />
                      { expedition.name }
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

export default OptionsExpeditions
