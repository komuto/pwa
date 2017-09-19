// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShoppingCart from '../src/Containers/ShoppingCart'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Keranjang Belanja'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Karanjang Belanja'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ShoppingCart {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
