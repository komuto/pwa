// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShoppingCart from '../src/Containers/Cart/Cart'

const Index = (props) => {
  const { localize } = props
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: localize.shopping_cart
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: localize.shopping_cart
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ShoppingCart {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
