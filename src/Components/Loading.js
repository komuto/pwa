import React from 'react'
const Loading = (props) => {
  const color = props.color || '#fff'
  const size = props.size || '30'
  const style = props.style || {}
  const className = props.className || ''

  let comp = null
  switch (props.type) {
    case 'circles':
      comp = <Circles size={size} color={color} />
      break
    case 'ovals':
      comp = <Ovals size={size} color={color} />
      break
    default:
      comp = <ThreeDots size={size} color={color} />
      break
  }

  return (
    <div className={className} style={{ style, paddingBottom: 10, paddingTop: 10 }}>
      {comp}
    </div>
  )
}

export default Loading

function Ovals (props) {
  return (
    <svg width='38' height={props.size} viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' stroke={props.color}>
      <g fill='none' fillRule='evenodd'>
        <g transform='translate(1 1)' strokeWidth='2'>
          <circle strokeOpacity='.5' cx='18' cy='18' r='18' />
          <path d='M36 18c0-9.94-8.06-18-18-18'>
            <animateTransform
              attributeName='transform'
              type='rotate'
              from='0 18 18'
              to='360 18 18'
              dur='1s'
              repeatCount='indefinite' />
          </path>
        </g>
      </g>
    </svg>
  )
}

function ThreeDots (props) {
  return (
    <svg width='120' height={props.size} viewBox='0 0 120 30' xmlns='http://www.w3.org/2000/svg' fill={props.color}>
      <circle cx='15' cy='15' r='15'>
        <animate attributeName='r' from='15' to='15'
          begin='0s' dur='0.8s'
          values='15;9;15' calcMode='linear'
          repeatCount='indefinite' />
        <animate attributeName='fillOpacity' from='1' to='1'
          begin='0s' dur='0.8s'
          values='1;.5;1' calcMode='linear'
          repeatCount='indefinite' />
      </circle>
      <circle cx='60' cy='15' r='9' fillOpacity='0.3'>
        <animate attributeName='r' from='9' to='9'
          begin='0s' dur='0.8s'
          values='9;15;9' calcMode='linear'
          repeatCount='indefinite' />
        <animate attributeName='fillOpacity' from='0.5' to='0.5'
          begin='0s' dur='0.8s'
          values='.5;1;.5' calcMode='linear'
          repeatCount='indefinite' />
      </circle>
      <circle cx='105' cy='15' r='15'>
        <animate attributeName='r' from='15' to='15'
          begin='0s' dur='0.8s'
          values='15;9;15' calcMode='linear'
          repeatCount='indefinite' />
        <animate attributeName='fillOpacity' from='1' to='1'
          begin='0s' dur='0.8s'
          values='1;.5;1' calcMode='linear'
          repeatCount='indefinite' />
      </circle>
    </svg>
  )
}

function Circles (props) {
  return (
    <svg width='135' height={props.size} viewBox='0 0 135 135' xmlns='http://www.w3.org/2000/svg' fill={props.color}>
      <path d='M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'>
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 67 67'
          to='-360 67 67'
          dur='2.5s'
          repeatCount='indefinite' />
      </path>
      <path d='M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z'>
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 67 67'
          to='360 67 67'
          dur='8s'
          repeatCount='indefinite' />
      </path>
    </svg>
  )
}
