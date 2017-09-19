// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import VerifyNoHp from '../src/Containers/VerifyNoHp'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <VerifyNoHp {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
