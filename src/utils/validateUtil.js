export const notEmpty = { required: true, message: '不能为空！' }

export const dataMaxLength = (maxLength) => {
  return { max: maxLength, message: '内容不能超过' + maxLength + '个字符' }
}
