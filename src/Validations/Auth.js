const loginConstraints = {
  email: {
    email: true,
    presence: true
  },
  password: {
    presence: true,
    length: {
      minimum: 5
    }
  }
}

export default {
  loginConstraints
}
