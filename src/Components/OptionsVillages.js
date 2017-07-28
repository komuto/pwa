const OptionsVillages = (props) => {
  return (
    <div className='sort-option' id='village' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Kelurahan</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data &&
                props.data.villages.map((village) => {
                  return (
                    <label key={village.id} className={`radio ${props.selected.id === village.id && 'checked'}`} onClick={() => props.villageSelected(village)}>
                      <input type='radio' name='desa' />
                      { village.name }
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

export default OptionsVillages
