import Link from 'next/link'
export default (props:any) => (
  <div className='field'>
    <p>Dengan mendaftar Anda telah menyetujui <Link href='#'><a>Syarat dan Ketentuan</a></Link> dari {props.name}</p>
  </div>
)
