export default (props: any) => {
  const { children, className, style } = props
  return (
    <section className={`section is-paddingless ${className}`} style={style}>
      { children }
    </section>
  )
}
