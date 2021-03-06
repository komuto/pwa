// @flow
// import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductStockManage from '../src/Containers/Product/StockManage'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <ProductStockManage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
