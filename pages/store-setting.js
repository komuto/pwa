// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import StoreSetting from '../src/Containers/StoreSetting'

const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Kelola Toko'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Kelola Toko'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <StoreSetting />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
