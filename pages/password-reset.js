// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PasswordReset from '../src/Containers/PasswordReset'
// style custom
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

const Index = () => (
  <DefaultLayout params={params}>
    <PasswordReset />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
