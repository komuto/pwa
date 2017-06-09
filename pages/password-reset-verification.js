// @flow
// layout
// import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PasswordResetVerification from '../src/Containers/PasswordResetVerification'
// style custom

const Index = () => (
  <PasswordResetVerification />
)

export default ReduxPageWrapper(Index)
