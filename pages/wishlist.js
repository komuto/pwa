// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Wishlist from '../src/Containers/Wishlist'

const params = {
  style: 'main wishlist',
  header: {
    title: 'Search'
  }
}

const Index = () => (
  <DynamicNavBarLayout params={params}>
    <Wishlist />
  </DynamicNavBarLayout>
)

export default ReduxPageWrapper(Index)
