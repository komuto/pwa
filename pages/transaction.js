// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Transaction from '../src/Containers/Transaction'
// config
import Menu from '../src/Config/Menu'

const Index = (props) => {
  const { localize } = props
  const params = {
    style: 'main transaction-page bg-grey',
    header: {
      title: localize.transaction
    },
    navbar: {
      searchBoox: false,
      textPath: localize.transaction
    },
    tabbar: {
      active: Menu.TRANSACTION,
      isShow: true
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Transaction {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
