// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TermCondition from '../src/Containers/TermCondition'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Terms and Conditions'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/store-setting'),
      textPath: 'Terms and Conditions'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <TermCondition {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
