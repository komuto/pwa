/** includes layout */
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
import DefaultLayout from '../src/Layout/DefaultLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes container */
import Buyer from '../src/Containers/Complaint/Buyer'
import BuyerDetail from '../src/Containers/Complaint/BuyerDetail'
import BuyerReview from '../src/Containers/Complaint/BuyerReview'
import BuyerConfirmation from '../src/Containers/Complaint/BuyerConfirmation'

const Index = (props) => {
  const { type, id, sub } = props.query
  if (type === 'buyer') {
    /** default page */
    if (!id && !sub) {
      const params = {
        style: 'main detail bg-grey disc',
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
        style: 'main detail bg-grey disc',
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

    /** review  complaint */
    if (id && sub === 'review') {
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
    /** confirmation complaint */
    if (id && sub === 'confirmation') {
      const params = {
        style: 'main detail bg-grey',
        header: {
          title: 'Konfirmasi Barang Diterima'
        },
        navbar: {
          searchBoox: false,
          path: '/',
          textPath: 'Konfirmasi Barang Diterima'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <BuyerConfirmation {...props} />
        </DefaultLayout>
      )
    }
  }
}

export default ReduxPageWrapper(Index)
