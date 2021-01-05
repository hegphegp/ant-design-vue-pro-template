export function tableSelectedRowKeys (selectedRows) {
  var selectedRowKeys = []
  for (var i = 0; i < selectedRows.length; i++) {
    selectedRowKeys.push(selectedRows[i].key)
  }
  return selectedRowKeys
}
