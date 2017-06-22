// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories2 from '../src/Containers/Categories2'
// style custom

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Fashion Pria'
  },
  navbar: {
    searchBoox: false,
    path: 'categories1',
    textPath: 'Fashion Pria'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <Categories2 />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
