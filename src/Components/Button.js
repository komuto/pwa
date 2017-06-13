
export const ButtonFullWidth = (props) => {
  return (
    <button
      type='button'
      className='button is-primary is-large is-fullwidth'
      onClick={props.onClick}>
      {props.text}
    </button>
  )
}
