import validate from 'validate.js'

validate.formatters.custom = function (errors) {
  return errors.map(function (err, index, arr) {
    return err.error
  })
}

export default validate
