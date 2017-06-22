// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// container
import Home from '../src/Containers/Home'
// utils
import { HOME } from '../src/Utils/Constant'

const params = {
  style: 'home bg-grey',
  header: {
    title: 'Home'
  },
  navbar: {
    searchBoox: true,
    textPath: 'Galaksi Parabola'
  },
  tabbar: {
    active: HOME,
    isShow: true
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <Home />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
