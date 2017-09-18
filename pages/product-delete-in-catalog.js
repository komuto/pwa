// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductDeleteInCatalog from '../src/Containers/ProductDeleteInCatalog'

const params = {
  style: 'main seller',
  header: {
    title: 'Hapus Barang'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Hapus Barang'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ProductDeleteInCatalog query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
