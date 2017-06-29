const RupiahFormat = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
export default RupiahFormat
