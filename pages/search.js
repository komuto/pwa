// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import MySearch from '../src/Containers/MySearch'

const params = {
  style: 'main user bg-grey',
  header: {
    title: 'Search'
  }
}

const Index = () => (
  <DynamicNavBarLayout params={params}>
    <MySearch />
  </DynamicNavBarLayout>
)

export default ReduxPageWrapper(Index)
