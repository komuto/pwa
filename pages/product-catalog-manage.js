// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductCatalogManage from '../src/Containers/ProductCatalogManage'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Ubah Katalog'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Ubah Katalog'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductCatalogManage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
