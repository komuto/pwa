// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Verification from '../src/Containers/Store/Verification'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Verifikasi Toko'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Verifikasi Toko'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Verification {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
