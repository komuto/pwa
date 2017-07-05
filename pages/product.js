// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Product from '../src/Containers/Product'

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Produk Terbaru'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Produk Terbaru'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <Product query={props.query} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
