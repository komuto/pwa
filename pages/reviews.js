// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Reviews from '../src/Containers/Reviews'

const params = {
  style: 'main user bg-white',
  header: {
    title: 'Ulasan'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Ulasan'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <Reviews query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
