// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PasswordNew from '../src/Containers/Password/New'
import PasswordReset from '../src/Containers/Password/Reset'
import {Images} from '..//src/Themes'
import { NotificationPage } from '../src/Components/Notification'

const Index = (props) => {
  const { type, status } = props.query
  if (type === 'new' || !type) {
    if (status === 'success') {
      return (
        <NotificationPage
          icon={Images.password}
          title='Password berhasil diubah'
          subTitle='Password Anda telah berhasil diubah. Kini Anda bisa login menggunakan password Anda yang baru.'
          path='/signin'
          text='Ke Halaman Login' />
      )
    } else {
      const params = {
        style: 'user login',
        header: {
          title: 'Password Baru'
        },
        navbar: {
          searchBoox: false,
          path: '/',
          textPath: 'Password Baru'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <PasswordNew {...props} />
        </DefaultLayout>
      )
    }
  }

  if (type === 'reset') {
    if (status === 'verification') {
      const params = {
        style: 'user',
        header: {
          title: 'Verifikasi Email'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <NotificationPage
            icon={Images.regSuccess}
            title='Link Reset Password telah terkirim'
            subTitle={`Kami telah mengirim link reset password ke ${props.query.email}. Silahkan periksa inbox Anda, dan ikuti petunjuk di email tersebut.`}
            path='/signin'
            text='Ke Halaman Login' />
        </DefaultLayout>
      )
    } else {
      const params = {
        style: 'user',
        header: {
          title: 'Lupa Password'
        },
        navbar: {
          searchBoox: false,
          path: '/signin',
          textPath: 'Lupa Password'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <PasswordReset {...props} />
        </DefaultLayout>
      )
    }
  }
}

export default ReduxPageWrapper(Index)
