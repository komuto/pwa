// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// container
import { HOME } from '../src/Containers/Tabbar'
import Home from '../src/Containers/Home'

const params = {
  style: 'home bg-grey',
  header: {
    title: 'Komuto'
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
