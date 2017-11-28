
const Warning = () => {
  return (
    <span className='icon is-small is-right'>
      <i className='fa fa-warning' />
    </span>
  )
}

const Success = () => {
  return (
    <span className='icon is-small is-right'>
      <i className='fa fa-check' />
    </span>
  )
}

export const Input = ({ classInfo, text, hasIconsRight, name, type, placeholder, value, onChange, textHelp }) => {
  let alertList = ['is-success', 'is-danger']
  let iconList = [<Success />, <Warning />]

  let alertIndex = alertList.indexOf(classInfo)
  let icon = iconList[alertIndex]

  return (
    <div className='field'>
      <label className='label'>{text}</label>
      <p className={`control ${(hasIconsRight) ? 'has-icons-right' : ''}`}>
        <input
          name={name}
          type={type}
          className={`input ${classInfo}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete='off' />
        {icon}
      </p>
      <p className={`help ${classInfo}`}>{textHelp}</p>
    </div>
  )
}

export const InputRadio = ({ value, selected, name, onChange, text }) => {
  return (
    <label className={`radio ${(value === selected) ? 'checked' : ''} `}>
      <input type='radio' name={name} onChange={() => onChange(value)} />
      {text}
    </label>
  )
}
