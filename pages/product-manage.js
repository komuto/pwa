// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductManage from '../src/Containers/ProductManage'

const params = {
  style: 'main detail bg-grey',
  header: {
    title: 'Detail Barang'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ProductManage query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
