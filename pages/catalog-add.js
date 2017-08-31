// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddEditCatalog from '../src/Containers/AddEditCatalog'

const params = {
  style: 'main user',
  header: {
    title: 'Tambah Katalog'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Tambah Katalog'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <AddEditCatalog />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
