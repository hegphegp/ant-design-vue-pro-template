import CryptoJs from 'crypto-js'

export default {

  encryptAESCBC (needEncryptStr, key, iv) {
    var parseKey = CryptoJs.enc.Utf8.parse(key)
    var parseIv = CryptoJs.enc.Utf8.parse(iv)
    var content = CryptoJs.enc.Utf8.parse(needEncryptStr)
    var encrypted = CryptoJs.AES.encrypt(content, parseKey, { iv: parseIv, mode: CryptoJs.mode.CBC, padding: CryptoJs.pad.Pkcs7 })
    return encrypted.toString()
  },

  decryptAESCBC (needDecryptStr, key, iv) {
    var parseKey = CryptoJs.enc.Utf8.parse(key)
    var parseIv = CryptoJs.enc.Utf8.parse(iv)
    var decrypt = CryptoJs.AES.decrypt(needDecryptStr, parseKey, { iv: parseIv, mode: CryptoJs.mode.CBC, padding: CryptoJs.pad.Pkcs7 })
    return CryptoJs.enc.Utf8.stringify(decrypt).toString()
  }

}
