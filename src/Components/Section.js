export const SectionTitle = (props) => {
  const { title } = props
  return (
    <div className='container is-fluid'>
      <div className='title'>
        <h3> { title } </h3>
      </div>
    </div>
  )
}

export default (props: any) => {
  const { children, className, style } = props
  return (
    <section className={`section is-paddingless ${className}`} style={style}>
      { children }
    </section>
  )
}
