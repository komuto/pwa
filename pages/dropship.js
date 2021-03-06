// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddFromDropshipper from '../src/Containers/Product/AddFromDropshipper'

const Index = (props) => {
  const params = {
    style: 'main',
    header: {
      title: 'Pilih Barang dari Dropshipper'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductAddFromDropshipper {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
