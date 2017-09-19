// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductManage from '../src/Containers/ProductManage'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Detail Barang'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductManage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
