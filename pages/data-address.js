// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DataAddress from '../src/Containers/DataAddress'

const toManageAccount = () => {
  Router.push('/manage-account')
}

const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Data Alamat'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toManageAccount(),
    textPath: 'Data Alamat'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <DataAddress query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
