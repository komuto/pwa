// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SignUp from '../src/Containers/SignUp'
// style custom
const params = {
  style: 'user',
  header: {
    title: 'Register'
  },
  navbar: {
    searchBoox: false,
    path: '/profile',
    textPath: 'Register'
  },
  hero: {
    path: '/signin',
    textPath: 'Login Disini',
    textInfo: 'Sudah punya akun?'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <SignUp />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
