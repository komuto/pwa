export default (props) => {
  let { promo, totalPayment } = props
  if (promo.type === 1) { // nominal
    return promo.nominal
  } else if (promo.type === 0) { // percentage
    return (totalPayment * (promo.percentage / 100))
  }
}
