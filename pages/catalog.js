// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Catalog from '../src/Containers/Catalog'

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Katalog'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Katalog'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <Catalog query={props.query} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
