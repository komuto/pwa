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
  defineASURL('/p/:slugparent/:slugsubparent/:slug', '/product')
  defineASURL('/p/:slugparent/:slug', '/product')
  defineASURL('/p/:slug', '/product')
  defineASURL('/p', '/product')
  defineASURL('/d/:slugparent/:slugsubparent/:slug', '/dropship')
  defineASURL('/d/:slugparent/:slug', '/dropship')
  defineASURL('/d/:slug', '/dropship')
  defineASURL('/d', '/dropship')
  defineASURL('/c/:slugparent/:slugsubparent/:slug/:id', '/product')
  defineASURL('/c/:slugparent/:slug/:id', '/categories3')
  defineASURL('/c/:slug/:id', '/categories2')
  defineASURL('/c', '/categories1')
  defineASURL('/transaction/:id', '/transaction-detail')
  defineASURL('/transaction/:id/:idInv', '/transaction-detail-status')
  defineASURL('/payment/:paymentType/:idT', '/payment')
  defineASURL('/transaction-confirmation/complaint', '/transaction-confirmation-complaint')
  defineASURL('/transaction-confirmation/review', '/transaction-confirmation-review')
  defineASURL('/product-detail/:id', '/product-detail')
  defineASURL('/balance', '/balance')
  defineASURL('/balance/:type', '/balance')
  defineASURL('/balance/:type/:status', '/balance')
  defineASURL('/balance/:type/:status/:id/:transType', '/balance')
  defineASURL('/complaint/:type', '/complaint')
  defineASURL('/complaint/:type/:id', '/complaint')
  defineASURL('/complaint/:type/:id/:sub', '/complaint')

  server.get('*', (req, res) => {
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
