// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShoppingCart from '../src/Containers/ShoppingCart'

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

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <ShoppingCart query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
