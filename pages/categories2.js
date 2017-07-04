// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories2 from '../src/Containers/Categories2'
// style custom
let params = {
  style: 'categories bg-grey',
  header: {
    title: 'Komuto'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <Categories2 query={props.query} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
