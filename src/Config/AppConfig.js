const midTrans = {
  production: {
    BASE_URL: 'https://app.midtrans.com/snap/snap.js',
    ACCESS_KEY: {
      MERCHANT_ID: 'M106891',
      CLIENT_KEY: 'VT-client-Y6pK1V-G7F4a1YgU',
      SERVER_KEY: 'VT-server-eSA2HQ1rSJOqGnIn4ow9wW6j'
    }
  },
  stagging: {
    BASE_URL: 'https://app.sandbox.midtrans.com/snap/snap.js',
    ACCESS_KEY: {
      MERCHANT_ID: 'M106891',
      CLIENT_KEY: 'VT-client-hH6v_I1Ycb8ph8O_',
      SERVER_KEY: 'VT-server-_wU53Pb9SBY_D3ARkrYr_5bD'
    }
  }
}

const AppConfig = {
  DEBUG: true,
  baseURL: 'http://localhost:8889/',
  apiURL: 'http://localhost:8889/',
  languages: 'ID', // ID , EN
  midTrans: process.env.NODE_ENV === 'development' ? midTrans.stagging : midTrans.production
}

export default AppConfig
