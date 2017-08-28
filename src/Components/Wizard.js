const wizardStyle = {
  display: 'inline-block',
  backgroundColor: '#ffffff',
  fontSize: '13px',
  width: '30px',
  height: '30px',
  verticalAlign: 'middle',
  marginRight: '20px',
  position: 'relative',
  zIndex: 2
}
const bulletStyle = {
  width: '25px',
  height: '25px',
  borderRadius: '700px',
  display: 'block',
  margin: '2px auto',
  border: '0.5px solid #dedede',
  color: '#cccccc',
  textAlign: 'center',
  lineHeight: '25px'
}
const activeStyle = {
  ...bulletStyle,
  backgroundColor: '#ef5656',
  border: '0.5px solid #ef5656',
  color: '#ffffff',
  borderRadius: '700px'
}

const Wizard = (props) => {
  let items = []
  for (let i = 1; i <= props.total; i++) {
    items.push((
      <div key={i} style={wizardStyle}>
        <span style={i <= props.active ? activeStyle : bulletStyle}>{i}</span>
      </div>
    ))
  }
  return (
    <section className='section is-paddingless'>
      <div className='seller-bar'>
        <div className={`seller-step`} style={{textAlign: 'center', fontSize: 0}}>
          { items }
        </div>
      </div>
    </section>
  )
}

export default Wizard
