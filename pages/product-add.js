// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAdd from '../src/Containers/ProductAdd'

const toProductList = () => {
  Router.push('/product-list')
}

const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Tambah Produk'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toProductList(),
    textPath: 'Tambah Produk'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ProductAdd />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
