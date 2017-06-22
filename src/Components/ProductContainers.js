export default (props: any) => {
  const { children, className } = props
  return (
    <div className={`columns is-mobile is-multiline custom ${className}`}>
      { children }
    </div>
  )
}
