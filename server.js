const express = require('express')
const next = require('next')
const path = require('path')
// const compression = require('compression')
require('dotenv').config()

// front end
const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 8889
const quiet = !dev

const appDir = './'
const app = next({ dev, dir: appDir, quiet })
const handle = app.getRequestHandler()

app.prepare().then(_ => {
  const server = express()
  const defineASURL = (as, url) => (
    server.get(as, (req, res) => {
      const params = Object.assign(req.query, req.params)
      return app.render(req, res, url, params)
    })
  )

  // serve service worker
  server.get('/sw.js', (req, res) =>
    res.sendFile(path.resolve('./.next/sw.js'))
  )

  defineASURL('/review/products', '/review-products')
  defineASURL('/discussion/product', '/discussion-product')
  defineASURL('/messages', '/messages')
  defineASURL('/resolution/center', '/resolution-center')
  // product
  defineASURL('/p/:slugparent/:slugsubparent/:slug', '/product')
  defineASURL('/p/:slugparent/:slug', '/product')
  defineASURL('/p/:slug', '/product')
  defineASURL('/p', '/product')
  // manage product
  defineASURL('/product/add', '/product-add')
  defineASURL('/product/list', '/product-list')
  defineASURL('/product/add/one', '/product-add-step-one')
  defineASURL('/product/add/two', '/product-add-step-two')
  defineASURL('/product/add/three', '/product-add-step-three')
  defineASURL('/product/add/four', '/product-add-step-four')
  defineASURL('/product/add/success', '/product-add-success')
  // product detail
  defineASURL('/detail/:store/:slug', '/product-detail')
  // dropship
  defineASURL('/d/:slugparent/:slugsubparent/:slug', '/dropship')
  defineASURL('/d/:slugparent/:slug', '/dropship')
  defineASURL('/d/:slug', '/dropship')
  defineASURL('/d', '/dropship')
  // categories
  defineASURL('/c/:slugparent/:slugsubparent/:slug/:id', '/product')
  defineASURL('/c/:slugparent/:slug/:id', '/categories3')
  defineASURL('/c/:slug/:id', '/categories2')
  defineASURL('/c', '/categories1')
  defineASURL('/transaction/:id', '/transaction-detail')
  defineASURL('/transaction/:id/:idInv', '/transaction-detail-status')
  defineASURL('/payment/:paymentType/:idT', '/payment')
  defineASURL('/transaction-confirmation/complaint', '/transaction-confirmation-complaint')
  defineASURL('/transaction-confirmation/review', '/transaction-confirmation-review')
  // balance
  defineASURL('/balance', '/balance')
  defineASURL('/balance/:type', '/balance')
  defineASURL('/balance/:type/:status', '/balance')
  defineASURL('/balance/:type/:status/:id/:transType', '/balance')
  // complaint
  defineASURL('/complaint/:type', '/complaint')
  defineASURL('/complaint/:type/:id', '/complaint')
  defineASURL('/complaint/:type/:id/:sub', '/complaint')
  // password
  defineASURL('/password/:type', '/password')
  defineASURL('/password/:type/:status', '/password')
  defineASURL('/password/:type/:status/:email', '/password')
  // signup
  defineASURL('/signup/:type', '/signup')
  // disscussion
  defineASURL('/discussion/:type', '/discussion')
  // store verification
  defineASURL('/store/verification', '/store-verification')
  defineASURL('/store/manage', '/manage-store')

  server.get('*', (req, res) => {
    global.hostNameServer = req.headers.host

    console.log('global.hostNameServer: ', global.hostNameServer)

    return handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err

    console.log(String.raw`

      ███████╗██╗  ██╗██╗   ██╗███████╗██╗  ██╗██╗
      ██╔════╝██║ ██╔╝╚██╗ ██╔╝██╔════╝██║  ██║██║
      ███████╗█████╔╝  ╚████╔╝ ███████╗███████║██║
      ╚════██║██╔═██╗   ╚██╔╝  ╚════██║██╔══██║██║
      ███████║██║  ██╗   ██║   ███████║██║  ██║██║
      ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝

    `)
    console.log(`:fire:> App Steady on http://localhost:${PORT}`)
  })
})
