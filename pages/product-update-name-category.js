// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductUpdateNameCategory from '../src/Containers/ProductUpdateNameCategory'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <ProductUpdateNameCategory {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
