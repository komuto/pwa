// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductChangeDropship from '../src/Containers/ProductChangeDropship'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Jadikan Dropshipping'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Jadikan Dropshipping'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductChangeDropship {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
