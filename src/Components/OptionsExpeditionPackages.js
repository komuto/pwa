// lib
import RupiahFormat from '../Lib/RupiahFormat'

const OptionsExpeditionPackages = (props) => {
  let epFilterByExpeditions = props.expeditionsPackage.data.filter((data) => {
    return data.expedition_id === props.expeditions.selected.id
  })
  return (
    <div className='sort-option expeditionPackageButton' style={{display: props.expeditionsPackage.show && 'block'}} onClick={(e) => props.onClick(e)}>
      <div className='sort-list'>
        <p><strong>Pilih Paket Pengiriman dari {props.expeditions.selected.name} </strong></p>
        <form action='#' className='form'>
          <div className='field'>
            <div className='control popup-option package' style={{ height: '400px', overflow: 'scroll' }}>
              {
                epFilterByExpeditions.map((data) => {
                  let etd = ''
                  if (data.etd.includes('hari')) {
                    etd = data.etd
                  } else {
                    etd = `${data.etd} hari`
                  }
                  return (
                    <label className={`radio ${props.expeditionsPackage.selected.id === data.id && 'checked'}`} key={data.id} onClick={(e) => props.expeditionsPackageSelected(e, data)}>
                      <input type='radio' name='reguler' />
                      <span className='service-name'>{ data.full_name }</span>
                      <span>{etd}</span>
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
