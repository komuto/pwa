// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PasswordResetVerification from '../src/Containers/PasswordResetVerification'

const params = {
  style: 'user',
  header: {
    title: 'Verifikasi Email'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <PasswordResetVerification />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
