// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductHidden from '../src/Containers/Product/Hidden'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Sembunyikan Barang'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Sembunyikan Barang'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductHidden {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
