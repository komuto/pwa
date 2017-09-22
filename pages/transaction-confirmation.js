// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TransactionConfirmation from '../src/Containers/TransactionConfirmation'

const Index = (props) => {
  const params = {
    style: 'main detail transaction-page bg-grey',
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
      <TransactionConfirmation {...props} />
    </DefaultLayout>
  )
}
export default ReduxPageWrapper(Index)
