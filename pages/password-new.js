// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PasswordNew from '../src/Containers/PasswordNew'
// style custom
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

const Index = () => (
  <DefaultLayout params={params}>
    <PasswordNew />
  </DefaultLayout>
)
export default ReduxPageWrapper(Index)
