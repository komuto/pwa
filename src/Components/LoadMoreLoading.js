export default (props) => {
  return (
    <div className='is-fullwidth has-text-centered' style={{ paddingBottom: 10, paddingTop: 10 }}>
      <span className='tag is-white' style={{ color: '#727272' }}>{props.text}</span>
    </div>
  )
}
