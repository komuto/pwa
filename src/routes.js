const predefinedRoutes = [
  '/',
  '/add-address-shipping',
  '/add-address',
  '/promo',
  '/thankyou',
  '/review-order',
  '/checkout',
  '/select-pickup',
  '/shipping-address',
  '/reset-password',
  '/inspiration',
  '/my-account',
  '/my-address',
  '/my-orders',
  '/my-payment',
  '/guest-delivery',
  '/guest-pickup',
  '/forgot-password-message',
  '/edit-profile',
  '/change-password'
]
const staticRoutes = [
  '/about.html',
  '/contact.html',
  '/career.html',
  '/customer-service.html',
  '/faq.html',
  '/how-to-buy.html',
  '/how-to-pay.html',
  '/how-to-return.html',
  '/privacy.html',
  '/returning.html',
  '/terms-and-condition.html'
]
const nextRoutes = [
  '/favicon.ico',
  '/_next/*',
  '/static/*'
]
module.exports = {
  predefinedRoutes,
  nextRoutes,
  staticRoutes
}
