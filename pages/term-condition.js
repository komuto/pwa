// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TermCondition from '../src/Containers/TermCondition'

const params = {
  style: 'main user',
  header: {
    title: 'Terms and Conditions'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Terms and Conditions'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <TermCondition />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
