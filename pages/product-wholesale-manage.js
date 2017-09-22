// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductWholesaleManage from '../src/Containers/ProductWholesaleManage'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Harga Grosir'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Harga Grosir'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductWholesaleManage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
