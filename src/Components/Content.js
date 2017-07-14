export default (props: any) => {
  const { children, className, style } = props
  return (
    <div className={className} style={style}>
      { children }
    </div>
  )
}
