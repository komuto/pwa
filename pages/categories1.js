// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories1 from '../src/Containers/Categories1'

const Index = (props) => {
  const { localize } = props
  const params = {
    style: 'categories bg-grey',
    header: {
      title: localize.category
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: localize.category
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Categories1 {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
