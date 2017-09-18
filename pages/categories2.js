// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories2 from '../src/Containers/Categories2'

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
      <Categories2 {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
