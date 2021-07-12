export const notEmpty = { required: true, message: '不能为空！' }

export const dataLengthValid = (minLength, maxLength) => {
  if (minLength != null && minLength !== null && minLength !== '' && maxLength != null && maxLength !== null && maxLength !== '') {
    return { min: minLength, max: maxLength, message: '内容不能小于' + minLength + '个字符，大于' + maxLength + '个字符' }
  } else if (minLength != null && minLength !== null && minLength !== '') {
    return { min: minLength, message: '内容不能小于' + maxLength + '个字符' }
  } else if (maxLength != null && maxLength !== null && maxLength !== '') {
    return { max: maxLength, message: '内容不能大于' + maxLength + '个字符' }
  }
  return {}
}
