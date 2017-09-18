// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductChangeDropship from '../src/Containers/ProductChangeDropship'

const params = {
  style: 'main seller',
  header: {
    title: 'Jadikan Dropshipping'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Jadikan Dropshipping'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ProductChangeDropship query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
