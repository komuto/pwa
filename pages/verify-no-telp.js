// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import VerifyNoTelp from '../src/Containers/VerifyNoTelp'
// style custom

const params = {
  style: 'main user bg-grey',
  header: {
    title: 'Verifikasi Nomor Telepon'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Verifikasi Nomor Telepon'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <VerifyNoTelp />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
