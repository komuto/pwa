// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddStepOne from '../src/Containers/ProductAddStepOne'

const params = {
  style: 'main seller',
  header: {
    title: 'Upload Photo'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Upload Photo'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ProductAddStepOne />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
