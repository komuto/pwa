// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShippingInformation from '../src/Containers/ShippingInformation'

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

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <ShippingInformation query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
