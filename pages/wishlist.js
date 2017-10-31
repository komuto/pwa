// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Wishlist from '../src/Containers/Wishlist'

const Index = (props) => {
  const params = {
    style: 'main wishlist is-padding-110',
    header: {
      title: 'Search'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <Wishlist {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
