/** includes layout */
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
import DefaultLayout from '../src/Layout/DefaultLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes container */
import Buyer from '../src/Containers/Complaint/Buyer'
import BuyerDetail from '../src/Containers/Complaint/BuyerDetail'
import BuyerReview from '../src/Containers/Complaint/BuyerReview'

const Index = (props) => {
  const { type, id, sub } = props.query
  if (type === 'buyer') {
    /** default page */
    if (!id && !sub) {
      const params = {
        style: 'main detail bg-grey',
        header: {
          title: 'Komplain Barang'
        }
      }
      return (
        <DynamicNavBarLayout {...params} {...props}>
          <Buyer {...props} />
        </DynamicNavBarLayout>
      )
    }
    /** detail page */
    if (id && !sub) {
      const params = {
        style: 'main detail bg-grey',
        header: {
          title: 'Detail Komplain Barang'
        }
      }
      return (
        <DynamicNavBarLayout {...params} {...props}>
          <BuyerDetail {...props} />
        </DynamicNavBarLayout>
      )
    }

    /** detail sub page */
    if (id && sub) {
      const params = {
        style: 'main detail bg-grey',
        header: {
          title: 'Memberi Review'
        },
        navbar: {
          searchBoox: false,
          path: '/',
          textPath: 'Memberi Review'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <BuyerReview {...props} />
        </DefaultLayout>
      )
    }
  }
}

export default ReduxPageWrapper(Index)
