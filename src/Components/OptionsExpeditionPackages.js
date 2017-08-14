// lib
import RupiahFormat from '../Lib/RupiahFormat'

const OptionsExpeditionPackages = (props) => {
  console.log('props', props)
  let epFilterByExpeditions = props.expeditionsPackage.data.filter((data) => {
    return data.expedition_id === props.expeditions.selected.id
  })
  console.log('epFilterByExpeditions', epFilterByExpeditions)
  return (
    <div className='sort-option' id='deliveryPackage' style={{display: props.expeditionsPackage.show && 'block'}}>
      <div className='sort-list'>
        <p><strong>Pilih Paket Pengiriman dari {props.expeditions.selected.name} </strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option package' style={{ height: '500px', overflow: 'scroll' }}>
              {
                epFilterByExpeditions.map((data) => {
                  return (
                    <label className={`radio ${props.expeditionsPackage.selected.id === data.id && 'checked'}`} key={data.id} onClick={(e) => props.expeditionsPackageSelected(e, data)}>
                      <input type='radio' name='reguler' />
                      <span className='service-name'>{ data.full_name }</span>
                      <span>{data.etd} Hari</span>
                      <span>Rp {RupiahFormat(data.cost)}</span>
                    </label>
                  )
                })
              }
              {
                epFilterByExpeditions.length < 1 &&
                <label className={`radio`}>
                  <input type='radio' name='reguler' />
                  <span className='service-name'>Service tidak ditemukan</span>
                </label>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OptionsExpeditionPackages
