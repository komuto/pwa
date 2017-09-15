// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductStatusManage from '../src/Containers/ProductStatusManage'

const params = {
  style: 'main main seller bg-grey',
  header: {
    title: 'Opsi Status'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Opsi Status'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ProductStatusManage query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
