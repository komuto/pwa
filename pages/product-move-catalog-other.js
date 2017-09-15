// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductMoveCatalogOther from '../src/Containers/ProductMoveCatalogOther'

const params = {
  style: 'main seller',
  header: {
    title: 'Pindahkan ke Katalog Lain'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Pindahkan ke Katalog Lain'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ProductMoveCatalogOther query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
