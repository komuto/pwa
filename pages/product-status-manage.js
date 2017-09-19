// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductStatusManage from '../src/Containers/ProductStatusManage'

const Index = (props) => {
  const params = {
    style: 'main main seller bg-grey',
    header: {
      title: 'Opsi Status'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Opsi Status'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductStatusManage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
