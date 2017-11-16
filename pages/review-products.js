// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ReviewProducts from '../src/Containers/Review/Products'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-grey',
    header: {
      title: 'Review'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Review'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ReviewProducts {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
