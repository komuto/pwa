// @flow
// import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductStockManage from '../src/Containers/ProductStockManage'

const params = {
  style: 'main user',
  header: {
    title: 'Stock Barang'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Stock Barang'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ProductStockManage query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
