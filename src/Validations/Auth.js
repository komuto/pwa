export const classInfo = {
  danger: 'is-danger',
  success: 'is-success'
}
export const loginConstraints = {
  nama: {
    alert: {
      empty: 'Nama tidak boleh kosong',
      min: 'Mohon isi nama min 3 karakter',
      valid: 'Nama anda tidak valid'
    }
  },
  handphone: {
    regex: /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g,
    alert: {
      empty: 'No handphone tidak boleh kosong',
      minMax0: 'Mohon isi no handphone min 8 - 13 digit',
      minMaxPlus: 'Mohon isi no handphone min 10 - 15 digit',
      minMax62: 'Mohon isi no handphone min 9 - 14 digit',
      valid: 'No handphone anda tidak valid'
    }
  },
  email: {
    email: true,
    presence: true,
    alert: {
      empty: 'Email tidak boleh kosong',
      valid: 'Format email anda tidak tepat'
    }
  },
  password: {
    presence: true,
    alert: {
      empty: 'Password tidak boleh kosong',
      valid: 'Password tidak kuat'
    },
    length: {
      minimum: 5
    }
  },
  retypePassword: {
    presence: true,
    alert: {
      empty: 'Konfirmasi Password tidak boleh kosong',
      valid: 'Konfirmasi password salah'
    }
  },
  genderGroup: {
    presence: true,
    alert: {
      empty: 'Jenis kelamin harus di pilih',
      valid: 'Jenis kelamin tidak valid'
    }
  }
}
