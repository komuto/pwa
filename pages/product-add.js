// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAdd from '../src/Containers/ProductAdd'

const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Tambah Produk'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Tambah Produk'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ProductAdd />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
