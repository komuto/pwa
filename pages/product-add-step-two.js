// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddStepTwo from '../src/Containers/ProductAddStepTwo'

const params = {
  style: 'main seller',
  header: {
    title: 'Nama dan Kategori Produk'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Nama dan Kategori Produk'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ProductAddStepTwo />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
