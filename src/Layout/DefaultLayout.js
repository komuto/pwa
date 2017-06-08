// @flow

import Header from '../Containers/Header'
import Footer from '../Containers/Footer'

export default ({children}:Object) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
