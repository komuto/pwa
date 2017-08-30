// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageStore from '../src/Containers/ManageStore'

const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Toko Anda'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Toko Anda'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ManageStore />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
