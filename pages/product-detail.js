// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductDetail from '../src/Containers/ProductDetail'

const params = {
  style: 'categories detail bg-grey',
  header: {
    title: 'Produk Detail'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Produk Detail'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <ProductDetail query={props.query} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
