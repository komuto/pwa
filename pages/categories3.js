// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories3 from '../src/Containers/Categories3'

const Index = (props) => {
  const { localize } = props
  const params = {
    style: 'categories bg-grey',
    header: {
      title: localize.category
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <Categories3 {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
