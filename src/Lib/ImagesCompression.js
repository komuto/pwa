/**
 * Safei Muslim
 * Yogyakarta , 13 desember 2017
 * PT Skyshi Digital Indonesa
 */

import ImageCompressor from '@xkeshi/image-compressor'

export default (file) => {
  return new ImageCompressor().compress(file, { quality: 0.4, maxWidth: 600 })
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    })
}
