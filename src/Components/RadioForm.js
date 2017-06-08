// @flow

export default (props:any) => (
  <div className={`form-group ${props.classname}`}>
    <input type='radio' name={props.name} id={props.id} />
    <label htmlFor={props.id}>{props.label}</label>
  </div>)
