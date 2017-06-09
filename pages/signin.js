// @flow
// layout
// import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SignIn from '../src/Containers/SignIn'
// style custom

const Index = () => (
  <SignIn />
)

export default ReduxPageWrapper(Index)
