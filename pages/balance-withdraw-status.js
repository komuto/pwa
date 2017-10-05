/** includes dependecies */
import Router from 'next/router'
/** includes layout */
import DefaultLayout from '../src/Layout/DefaultLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes container */
import WithdrawStatus from '../src/Containers/Balance/WithdrawStatus'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey saldo',
    header: {
      title: 'Status Penarikan Saldo'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/balance'),
      textPath: 'Status Penarikan Saldo'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <WithdrawStatus {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
