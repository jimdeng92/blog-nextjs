
import CryptoJS from 'crypto-js'

// 加密
export const aesEncrypt = (content, secret) => {
  const srcs = CryptoJS.enc.Utf8.parse(content)
  const encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.MD5(secret), {
    iv: [],
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// aes ecb 128 解密
export const aesDecrypt = (content, secret) => {
  // content为密文，无需做处理即可
  const decrypt = CryptoJS.AES.decrypt(content, CryptoJS.MD5(secret), {
    iv: [],
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
