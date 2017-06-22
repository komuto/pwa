export default (props: any) => {
  const { children, className } = props
  return (
    <div className={`container is-fluid ${className}`}>
      { children }
    </div>
  )
}
