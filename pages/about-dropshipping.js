// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AboutDropshipping from '../src/Components/AboutDropshipping'

const params = {
  style: 'main seller',
  header: {
    title: 'Tentang Dropshipping'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Tentang Dropshipping'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <AboutDropshipping />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
