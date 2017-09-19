// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddStepTwo from '../src/Containers/ProductAddStepTwo'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Nama dan Kategori Produk'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Nama dan Kategori Produk'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductAddStepTwo {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
