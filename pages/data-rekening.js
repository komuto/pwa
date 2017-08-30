// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DataRekening from '../src/Containers/DataRekening'

const toManageAccount = () => {
  Router.push('/manage-account')
}

const params = {
  style: 'main detail edit-data bg-grey',
  header: {
    title: 'Data Rekening'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toManageAccount(),
    textPath: 'Data Rekening'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <DataRekening query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
