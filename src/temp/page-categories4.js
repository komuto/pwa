// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Product from '../src/Containers/Product'

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Sneakers Pria'
  },
  navbar: {
    searchBoox: false,
    path: 'categories3',
    textPath: 'Sneakers Pria'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <Product />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
