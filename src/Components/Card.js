export default (props) => {
  const { title } = props
  return (
    <section className='section is-paddingless has-shadow'>
      <div className='seller-akun'>
        { !title ? <Title title /> : '' }
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
