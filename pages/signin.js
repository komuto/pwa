// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SignIn from '../src/Containers/SignIn'

const params = {
  style: 'user login',
  header: {
    title: 'Login'
  },
  navbar: {
    searchBoox: false,
    path: '/profile',
    textPath: 'Login'
  },
  hero: {
    path: '/signup',
    textPath: 'Daftar Disini',
    textInfo: 'Belum punya akun ?'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <SignIn />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
