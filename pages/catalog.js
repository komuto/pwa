// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Catalog from '../src/Containers/Catalog/Catalog'

const Index = (props) => {
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
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <Catalog {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
