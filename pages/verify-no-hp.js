// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import VerifyNoHp from '../src/Containers/VerifyNoHp'
// style custom

const params = {
  style: 'main user bg-grey',
  header: {
    title: 'Verifikasi Nomor Handphone'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Verifikasi Nomor Handphone'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <VerifyNoHp />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
