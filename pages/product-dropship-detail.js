// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import CatalogAddProduct from '../src/Containers/CatalogAddProduct'

const Index = (props) => {
  const params = {
    style: 'main seller bg-grey',
    header: {
      title: 'Detail Barang Dropshipper'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Detail Barang Dropshipper'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <CatalogAddProduct {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
