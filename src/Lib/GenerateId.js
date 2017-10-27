export default ({ slug }) => {
  let tamId = slug.split('-')
  return tamId[tamId.length - 1]
}
