import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import localforage from 'localforage'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '4',
  storeConfig: {
    storage: localforage,
    // blacklist: [], // reducer keys that you do NOT want stored to persistence here
    whitelist: ['auth'], // Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
