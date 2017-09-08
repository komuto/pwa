const express = require('express')
const next = require('next')
const path = require('path')
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

  // serve service worker
  server.get('/sw.js', (req, res) =>
    res.sendFile(path.resolve('./.next/sw.js'))
  )

  server.get('/p/:slugparent/:slugsubparent/:slug', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/product', params)
  })

  server.get('/p/:slugparent/:slug', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/product', params)
  })

  server.get('/p/:slug', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/product', params)
  })

  server.get('/p', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/product', params)
  })

  server.get('/d/:slugparent/:slugsubparent/:slug', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/dropship', params)
  })

  server.get('/d/:slugparent/:slug', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/dropship', params)
  })

  server.get('/d/:slug', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/dropship', params)
  })

  server.get('/d', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/dropship', params)
  })

  server.get('/c/:slugparent/:slugsubparent/:slug/:id', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/product', params)
  })

  server.get('/c/:slugparent/:slug/:id', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/categories3', params)
  })

  server.get('/c/:slug/:id', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/categories2', params)
  })

  server.get('/c', (req, res) => {
    const params = Object.assign(req.query, req.params)
    return app.render(req, res, '/categories1', params)
  })

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
