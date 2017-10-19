// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddSuccess from '../src/Containers/Product/AddSuccess'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Produk berhasil ditambah'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductAddSuccess {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
