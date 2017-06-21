// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
import { PROFILE } from '../src/Containers/Tabbar'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Profile from '../src/Containers/Profile'
// style custom

const params = {
  header: {
    title: 'Komuto'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Profile'
  },
  tabbar: {
    active: PROFILE,
    isShow: true
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <Profile />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
