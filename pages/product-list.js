// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductList from '../src/Containers/ProductList'

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Daftar Produk'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Daftar Produk'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <ProductList query={props.query} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
