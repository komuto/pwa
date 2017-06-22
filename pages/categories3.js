// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories3 from '../src/Containers/Categories3'

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Sepatu Pria'
  },
  navbar: {
    searchBoox: false,
    path: 'categories2',
    textPath: 'Sepatu Pria'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <Categories3 />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
