// @flow
// layout
// import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Profile from '../src/Containers/Profile'
// style custom

const Index = () => (
  <Profile />
)

export default ReduxPageWrapper(Index)