// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ComplainItemDetail from '../src/Containers/ComplainItemDetail'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Detail Komplain Barang'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Detail Komplain Barang'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ComplainItemDetail {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
