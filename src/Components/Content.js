export default (props: any) => {
  const { children, className } = props
  return (
    <div className={className}>
      { children }
    </div>
  )
}
