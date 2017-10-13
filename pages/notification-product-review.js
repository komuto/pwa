/** includes layout */
import DefaultLayout from '../src/Layout/DefaultLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes container */
import ProductReview from '../src/Containers/Notification/ProductReview'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-grey',
    header: {
      title: 'Review Produk'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Review Produk'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductReview {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
