// @flow

const Warning = (props) => {
  return (
    <span className='icon is-small is-right'>
      <i className='fa fa-warning' />
    </span>
  )
}

const Success = (props) => {
  return (
    <span className='icon is-small is-right'>
      <i className='fa fa-check' />
    </span>
  )
}

export const Input = (props) => {
  let icon = ''
  switch (props.classInfo) {
    case 'is-success':
      icon = <Success />
      break
    case 'is-danger':
      icon = <Warning />
      break
    default:
      break
  }
  return (
    <div className='field'>
      <label className='label'>{props.text}</label>
      <p className={`control ${(props.hasIconsRight) ? 'has-icons-right' : ''}`}>
        <input
          name={props.name}
          type={props.type}
          className={`input ${props.classInfo}`}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange} />
        {icon}
      </p>
      <p className={`help ${props.classInfo}`}>{props.textHelp}</p>
    </div>
  )
}

export const InputRadio = (props) => {
  return (
    <label className={`radio ${(props.value === props.selected) ? 'checked' : ''} `}>
      <input type='radio' name={props.name} onChange={() => props.onChange(props.value)} />
      {props.text}
    </label>
  )
}
