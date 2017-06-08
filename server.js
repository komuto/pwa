const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')
require('dotenv').config()

// front end
const dev = process.env.NODE_ENV !== 'production'
const quiet = !dev

const appDir = './'
const app = next({ dev, dir: appDir, quiet })
const appHandle = app.getRequestHandler()

const route = pathMatch()
const match = route([
  '/category/:category'
])

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    const params = match(pathname)
    if (params.category) {
      app.render(req, res, '/category', params)
      return
    }

    if (pathname === '/') {
      app.render(req, res, '/', query)
    } else {
      appHandle(req, res, parsedUrl)
    }
  })
  .listen(3001, (err) => {
    if (err) throw err
    console.log(String.raw`

      ███████╗██╗  ██╗██╗   ██╗███████╗██╗  ██╗██╗
      ██╔════╝██║ ██╔╝╚██╗ ██╔╝██╔════╝██║  ██║██║
      ███████╗█████╔╝  ╚████╔╝ ███████╗███████║██║
      ╚════██║██╔═██╗   ╚██╔╝  ╚════██║██╔══██║██║
      ███████║██║  ██╗   ██║   ███████║██║  ██║██║
      ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝

    `)
    console.log(':fire:> App Steady on http://localhost:3001')
  })
})
