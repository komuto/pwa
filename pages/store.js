// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Store from '../src/Containers/Store'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-grey',
    header: {
      title: 'Komuto'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <Store {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
