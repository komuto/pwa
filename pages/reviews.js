// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Reviews from '../src/Containers/Reviews'

const Index = (props) => {
  const params = {
    style: 'main user bg-grey',
    header: {
      title: 'Ulasan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Ulasan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Reviews {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
