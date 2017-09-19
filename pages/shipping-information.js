// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShippingInformation from '../src/Containers/ShippingInformation'

const Index = (props) => {
  const params = {
    style: 'main detail edit-data bg-grey',
    header: {
      title: 'Isi Informasi Data Pengiriman'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Isi Informasi Data Pengiriman'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ShippingInformation {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
