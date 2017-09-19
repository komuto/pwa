// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import VerifyNoTelp from '../src/Containers/VerifyNoTelp'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <VerifyNoTelp {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
