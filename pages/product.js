// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Product from '../src/Containers/Product/Product'

const Index = (props) => {
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
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <Product {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
