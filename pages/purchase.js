import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Purchase from '../src/Containers/Purchase'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Proses Pembelian'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <Purchase {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
