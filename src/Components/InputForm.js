// @flow

export default (props:any) => (
  <div className='form-group'>
    <input
      type='text'
      className='form-control'
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </div>
)
