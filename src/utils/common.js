export function tableSelectedRowKeys (selectedRows) {
  var selectedRowKeys = []
  for (var i = 0; i < selectedRows.length; i++) {
    selectedRowKeys.push(selectedRows[i].key)
    console.log(selectedRows[i].key)
    console.log(selectedRows[i].id)
  }
  return selectedRowKeys
}
