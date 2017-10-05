export default (props) => {
  return (
    <section className={`section is-paddingless has-shadow ${props.className ? props.className : ''}`}>
      <div className='seller-akun'>
        { props.title ? <Title {...props} /> : '' }
        <div className='profile-wrapp'>
          <ul>
            { props.children }
          </ul>
        </div>
      </div>
    </section>
  )
}

const Title = (props) => {
  return (
    <div className='container is-fluid'>
      <div className='title'>
        <h3>{ props.title }</h3>
      </div>
    </div>
  )
}
