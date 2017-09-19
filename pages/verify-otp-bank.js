// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import VerifyOTPBank from '../src/Containers/VerifyOTPBank'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Verifikasi Kode OTP'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Verifikasi Kode OTP'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <VerifyOTPBank {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
