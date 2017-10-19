// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddStepFour from '../src/Containers/Product/AddStepFour'

const Index = (props) => {
  const params = {
    style: 'main seller bg-grey',
    header: {
      title: 'Expedisi Pengiriman'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Expedisi Pengiriman'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductAddStepFour {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
