export default (props) => {
  const { children } = props
  return (
    <div className='categories-wrapp'>
      <ul>
        { children }
      </ul>
    </div>
  )
}
