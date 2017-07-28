// lib
import RupiahFormat from '../Lib/RupiahFormat'

const OptionsExpeditionPackages = (props) => {
  return (
    <div className='sort-option' id='deliveryPackage' style={{display: props.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Paket Pengiriman dari JNE</strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option package' style={{ height: '500px', overflow: 'scroll' }}>
              {
                props.data.map((data) => {
                  return (
                    <label className={`radio ${props.selected.id === data.id && 'checked'}`} key={data.id} onClick={() => props.expeditionsPackageSelected(data)}>
                      <input type='radio' name='reguler' />
                      <span className='service-name'>{ data.full_name }</span>
                      <span>{data.etd} Hari</span>
                      <span>Rp {RupiahFormat(data.cost)}</span>
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

export default OptionsExpeditionPackages
