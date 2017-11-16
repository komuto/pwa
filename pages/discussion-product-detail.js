// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DiscussionProductDetail from '../src/Containers/Discussion/ProductDetail'

const Index = (props) => {
  const params = {
    style: 'main user bg-white',
    header: {
      title: 'Diskusi Produk'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <DiscussionProductDetail {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
