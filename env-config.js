const dev = process.env.NODE_ENV !== 'production'
const ver = process.env.APP_VER || null

module.exports = {
  'APP_VER': dev ? ver : null
}
