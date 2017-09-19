// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import MySearch from '../src/Containers/MySearch'

const Index = (props) => {
  const params = {
    style: 'main user bg-grey',
    header: {
      title: 'Search'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <MySearch {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
