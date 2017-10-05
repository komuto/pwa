import DefaultLayout from '../src/Layout/DefaultLayout'
/** includees wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includees containers */
import Balance from '../src/Containers/Balance/Balance'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey saldo',
    header: {
      title: 'Saldo'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Saldo'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Balance {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
