// @flow

export default (props:any) => (<div className='form-group'>
  <textarea
    className='form-control'
    rows={props.rows || 8}
    placeholder={props.placeholder}
    onChange={props.onChange}
    value={props.value} />
</div>)
