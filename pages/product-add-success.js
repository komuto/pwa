// @flow
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddSuccess from '../src/Containers/Product/AddSuccess'

const Index = (props) => {
  // const params = {
  //   style: 'main seller',
  //   header: {
  //     title: 'Produk berhasil ditambah'
  //   }
  // }
  return <ProductAddSuccess {...props} />
}

export default ReduxPageWrapper(Index)
