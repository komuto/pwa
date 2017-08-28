// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddStepFour from '../src/Containers/ProductAddStepFour'

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

const Index = () => (
  <DefaultLayout params={params}>
    <ProductAddStepFour />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
