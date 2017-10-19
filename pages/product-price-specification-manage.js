// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductPriceSpecificationManage from '../src/Containers/Product/PriceSpecificationManage'

const Index = (props) => {
  const params = {
    style: 'main seller bg-grey',
    header: {
      title: 'Harga dan Spesifikasi'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Harga dan Spesifikasi'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductPriceSpecificationManage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
