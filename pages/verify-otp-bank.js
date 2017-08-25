// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import VerifyOTPBank from '../src/Containers/VerifyOTPBank'
// style custom

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

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <VerifyOTPBank query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
