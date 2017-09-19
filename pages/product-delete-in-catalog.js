// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductDeleteInCatalog from '../src/Containers/ProductDeleteInCatalog'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <ProductDeleteInCatalog {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
