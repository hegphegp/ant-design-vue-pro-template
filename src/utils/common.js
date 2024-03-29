// npm install crypto-js --save-dev
import CryptoJs from 'crypto-js'

export function tableSelectedRowKeys (selectedRows) {
  var selectedRowKeys = []
  for (var i = 0; i < selectedRows.length; i++) {
    selectedRowKeys.push(selectedRows[i].key)
    console.log(selectedRows[i].key)
    console.log(selectedRows[i].id)
  }
  return selectedRowKeys
}

export const notEmpty = { required: true, message: '不能为空！' }

export const dataLengthValid = (minLength, maxLength) => {
  if (minLength != null && minLength !== null && maxLength != null && maxLength !== null) {
    return { min: minLength, max: maxLength, message: '内容不能小于' + minLength + '个字符，大于' + maxLength + '个字符' }
  } else if (minLength != null && minLength !== null) {
    return { min: minLength, message: '内容不能小于' + minLength + '个字符' }
  } else if (maxLength != null && maxLength !== null) {
    return { max: maxLength, message: '内容不能大于' + maxLength + '个字符' }
  }
  return {}
}

export const dataMinLengthValid = (minLength) => {
  if (minLength != null && minLength !== null) {
    return { min: minLength, message: '内容不能小于' + minLength + '个字符' }
  }
  return {}
}

export const dataMaxLengthValid = (minLength, maxLength) => {
  if (maxLength != null && maxLength !== null) {
    return { max: maxLength, message: '内容不能大于' + maxLength + '个字符' }
  }
  return {}
}

export const time2Long = (time) => {
  if (time != null && time !== undefined) {
    return time.valueOf()
  }
  return null
}

// AES加解密
/**
 * const AESKey = '1234123412ABCDEF',
 * const AESIv = 'ABCDEF1234123412'
 * const str = '要加密的内容'
 * const encryptStr = encryptAESCBC(str, AESKey, AESIv)
 */
export function encryptAESCBC (needEncryptStr, key, iv) {
  var parseKey = CryptoJs.enc.Utf8.parse(key)
  var parseIv = CryptoJs.enc.Utf8.parse(iv)
  var content = CryptoJs.enc.Utf8.parse(needEncryptStr)
  var encrypted = CryptoJs.AES.encrypt(content, parseKey, { iv: parseIv, mode: CryptoJs.mode.CBC, padding: CryptoJs.pad.Pkcs7 })
  return encrypted.toString()
}

/**
 * const AESKey = '1234123412ABCDEF',
 * const AESIv = 'ABCDEF1234123412'
 * const encryptStr = '要解密的内容'
 * const originStr = decryptAESCBC(encryptStr, AESKey, AESIv)
 */
export function decryptAESCBC (needDecryptStr, key, iv) {
  var parseKey = CryptoJs.enc.Utf8.parse(key)
  var parseIv = CryptoJs.enc.Utf8.parse(iv)
  var decrypt = CryptoJs.AES.decrypt(needDecryptStr, parseKey, { iv: parseIv, mode: CryptoJs.mode.CBC, padding: CryptoJs.pad.Pkcs7 })
  return CryptoJs.enc.Utf8.stringify(decrypt).toString()
}

/**
 * 字段可以编辑
 * fieldsObj 是字段对象
 * fields 字段名数组
 */
export function setFieldsCanEdit (fieldsObj, fields) {
  fields.forEach((field) => {
    fieldsObj[field].disabled = false
  })
}

/**
 * 字段不可编辑
 * fieldsObj 是字段对象
 * fields 字段名数组
 */
export function setFieldsCannotEdit (fieldsObj, fields) {
  fields.forEach((field) => {
    fieldsObj[field].disabled = true
  })
}

/**
 * 设置字段取值为空
 * obj 是字段对象
 * fields 字段名数组
 */
export function setItemsNotShow (fieldsObj, fields) {
  fields.forEach((field) => {
    fieldsObj[field].itemShow = false
  })
}

/**
 * 设置字段取值为空
 * obj 是字段对象
 * fields 字段名数组
 */
export function setItemsShow (fieldsObj, fields) {
  fields.forEach((field) => {
    fieldsObj[field].itemShow = true
  })
}

/**
 * 设置所有字段disabled为false
 * obj 是字段对象
 * fields 字段名数组
 */
export function setFiledsCannotEdit (fieldsObj, fields) {
  fields.forEach((field) => {
    fieldsObj[field].disabled = true
  })
}

/**
 * 设置所有字段disabled为false
 * obj 是字段对象
 * fields 字段名数组
 */
export function setFiledsCanEdit (fieldsObj, fields) {
  fields.forEach((field) => {
    fieldsObj[field].disabled = false
  })
}

export function convertSelectData (data) {
  const returnData = []
  data.forEach((item) => {
    returnData.push({ value: item.code, text: item.name })
  })
  return returnData
}
