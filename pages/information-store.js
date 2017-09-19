// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import InformationStore from '../src/Containers/InformationStore'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Informasi Toko'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/profile'),
      textPath: 'Informasi Toko'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <InformationStore {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
