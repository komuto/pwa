// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAdd from '../src/Containers/ProductAdd'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey',
    header: {
      title: 'Tambah Produk'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/product-list'),
      textPath: 'Tambah Produk'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductAdd {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
