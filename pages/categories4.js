// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories4 from '../src/Containers/Categories/Level4'

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
      <Categories4 {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
