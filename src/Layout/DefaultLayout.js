// @flow
// Containers
import Header from '../Containers/Header'
import { Navbar, Hero } from '../Containers/Navbar'
import Tabbar from '../Containers/Tabbar'

export default (props: any) => {
  const { children } = props
  const { style, header, navbar, hero, tabbar } = props.params
  return (
    <div>
      <Header params={header} />
      <div className={`main ${style}`}>
        { (navbar) ? <Navbar params={navbar} /> : null}
        { (hero) ? <Hero params={hero} /> : null}
        { children }
        { (tabbar) ? <Tabbar params={tabbar} /> : null }
      </div>
    </div>
  )
}
