// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ResolutionDetail from '../src/Containers/ResolutionDetail'

const Index = (props) => {
  const params = {
    style: 'main detail resolusi bg-grey',
    header: {
      title: 'Detail Resolusi'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Detail Resolusi',
      callBack: () => Router.push('/resolution-center')
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ResolutionDetail {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
