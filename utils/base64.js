/**
 * Encode File to Base64
 * @param {File} file File to Encode
 * @returns {Promise}
 */
export function encodeFile (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      return resolve(reader.result)
    })

    reader.addEventListener('error', (err) => {
      return reject(err)
    })
  })
}
