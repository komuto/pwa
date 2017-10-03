// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Balance from '../src/Containers/Balance'

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
