import ReduxPersist from '../Config/ReduxPersist'
import localforage from 'localforage'
import { persistStore } from 'redux-persist'
import StartupActions from '../Redux/StartupRedux'

const updateReducers = (store: Object, isServer:boolean) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig
  const startup = () => store.dispatch(StartupActions.startup())

  // Check to ensure latest reducer version
  localforage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      persistStore(store, config, startup).purge()
      localforage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, config, startup)
    }
  }).catch(() => {
    persistStore(store, config, startup)
    localforage.setItem('reducerVersion', reducerVersion)
  })
}

export default {updateReducers}
