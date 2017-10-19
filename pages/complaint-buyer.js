/** includes layout */
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes container */
import Buyer from '../src/Containers/Complaint/Buyer'

const Index = (props) => {
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

export default ReduxPageWrapper(Index)
