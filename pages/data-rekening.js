// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DataRekening from '../src/Containers/DataRekening'

const Index = (props) => {
  const params = {
    style: 'main detail edit-data bg-grey',
    header: {
      title: 'Data Rekening'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-account'),
      textPath: 'Data Rekening'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <DataRekening {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
