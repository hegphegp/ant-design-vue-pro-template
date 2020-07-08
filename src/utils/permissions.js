export function actionToObject (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.error('%c ' + e, 'font-weight:bold; font-size:13px;')
    console.log('err', e.message)
  }
  return []
}
