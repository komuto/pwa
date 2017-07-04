// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories3 from '../src/Containers/Categories3'

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Komuto'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <Categories3 query={props.query} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
