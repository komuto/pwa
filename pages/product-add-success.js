// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddSuccess from '../src/Containers/ProductAddSuccess'

const params = {
  style: 'main seller',
  header: {
    title: 'Produk berhasil ditambah'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ProductAddSuccess />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
