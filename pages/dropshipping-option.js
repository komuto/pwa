// @flow
// import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DropshippingOption from '../src/Containers/DropshippingOption'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Opsi Dropshipping'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Opsi Dropshipping'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <DropshippingOption {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
