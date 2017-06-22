export default (props: any) => {
  const { children } = props
  return (
    <div className='categories-wrapp'>
      <ul>
        { children }
      </ul>
    </div>
  )
}
