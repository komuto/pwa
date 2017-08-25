// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ChangePassword from '../src/Containers/ChangePassword'

const params = {
  style: 'main user',
  header: {
    title: 'Ganti Password'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Ganti Password'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ChangePassword />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
