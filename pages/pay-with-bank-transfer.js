// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PayWithBankTransfer from '../src/Containers/PayWithBankTransfer'
// style custom
const params = {
  style: 'main detail bg-grey',
  header: {
    title: 'Transfer Bank'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Transfer Bank'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <PayWithBankTransfer />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
