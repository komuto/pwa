// @flow

export default (props:any) => (
  <div className='form-group'>
    <div className='login-icon'><span className='lnr lnr-lock' /></div>
    <input type='password'
      className='form-control'
      readOnly={props.editable}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  </div>)
