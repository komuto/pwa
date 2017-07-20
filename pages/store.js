// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Store from '../src/Containers/Store'

const params = {
  style: 'main seller-info bg-grey',
  header: {
    title: 'Komuto'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <Store query={props.query} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
