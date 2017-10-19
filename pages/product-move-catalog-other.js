// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductMoveCatalogOther from '../src/Containers/Product/MoveCatalogOther'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Pindahkan ke Katalog Lain'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Pindahkan ke Katalog Lain'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductMoveCatalogOther {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
