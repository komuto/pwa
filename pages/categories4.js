// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories4 from '../src/Containers/Categories4'

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
    <Categories4 />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
