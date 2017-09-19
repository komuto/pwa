// @flow
import Router from 'next/router'
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductList from '../src/Containers/ProductList'

const Index = (props) => {
  const params = {
    style: 'categories bg-grey',
    header: {
      title: 'Daftar Produk'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-store'),
      textPath: 'Daftar Produk'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <ProductList {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
