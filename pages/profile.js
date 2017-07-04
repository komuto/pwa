// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Profile from '../src/Containers/Profile'
// utils
import { PROFILE } from '../src/Utils/Constant'

const params = {
  style: 'main user bg-grey',
  header: {
    title: 'Profile'
  },
  navbar: {
    searchBoox: false,
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
