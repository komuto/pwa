export default ({ image, borderRadius }) => (
  <div style={{ width: '100%', height: '100%', borderRadius, backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
)
