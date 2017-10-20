// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ComplainItems from '../src/Containers/Complaint/Seller'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Komplain Barang'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Komplain Barang'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ComplainItems {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
