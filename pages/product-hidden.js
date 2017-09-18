// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductHidden from '../src/Containers/ProductHidden'

const params = {
  style: 'main seller',
  header: {
    title: 'Sembunyikan Barang'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Sembunyikan Barang'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ProductHidden query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
