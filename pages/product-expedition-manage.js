// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductExpeditionManage from '../src/Containers/ProductExpeditionManage'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Ekspedisi Pengiriman'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Ekspedisi Pengiriman'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductExpeditionManage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
