// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddFromDropshipper from '../src/Containers/ProductAddFromDropshipper'

const toProductList = () => {
  Router.push('/product-list')
}

const params = {
  style: 'main',
  header: {
    title: 'Pilih Barang dari Dropshipper'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toProductList(),
    textPath: 'Pilih Barang dari Dropshipper'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ProductAddFromDropshipper query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
