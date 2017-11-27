const RupiahFormat = (price, fixed = 2) => {
  const priceSplit = String(price.toFixed(fixed)).split('.')
  const firstPrice = priceSplit[0]
  const secondPrice = priceSplit[1]
  const priceReal = String(firstPrice).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  if (Number(secondPrice) > 0) {
    return `${priceReal},${secondPrice}`
  } else {
    return `${priceReal}`
  }
}
export default RupiahFormat
