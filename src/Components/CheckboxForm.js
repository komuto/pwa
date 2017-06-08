// @flow

export default (props:any) => (
  <div className='checkbox sorting-rr' >
    <input type='checkbox' id={props.id} />
    <label htmlFor={props.id}>{props.label}</label>
  </div>)
