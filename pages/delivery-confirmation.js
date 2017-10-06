// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DeliveryConfirmation from '../src/Containers/DeliveryConfirmation'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Konfirmasi Pengiriman'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/sales'),
      textPath: 'Konfirmasi Pengiriman'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <DeliveryConfirmation {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
