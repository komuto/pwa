// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import InputShipmentNumber from '../src/Containers/InputShipmentNumber'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey lg',
    header: {
      title: 'Masukkan Informasi Pengiriman'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/delivery-confirmation'),
      textPath: 'Masukkan Informasi Pengiriman'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <InputShipmentNumber {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
