// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Sales from '../src/Containers/Sales/Sales'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Penjualan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-store'),
      textPath: 'Penjualan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Sales {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
