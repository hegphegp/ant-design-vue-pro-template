<template>
  <a-card :bordered="false">
    <a-table
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      bordered
      defaultExpandAllRows>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="queryDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record.id)">删除</a>
        </template>
      </span>
    </a-table>
    <create-form
      ref="createModal"
      :visible="addEditVisible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk" />
  </a-card>
</template>
<script>
import CreateForm from './components/CreateForm'

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', width: '12%' },
  { title: 'Address', dataIndex: 'address', width: '30%' },
  { title: 'Action', scopedSlots: { customRender: 'action' } }
]

const data = [
  {
    key: 1,
    id: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        id: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park'
      }, {
        key: 12,
        id: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            id: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park'
          }
        ]
      }, {
        key: 13,
        id: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            id: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                id: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park'
              }, {
                key: 1312,
                id: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park'
              }
            ]
          }
        ]
      }
    ]
  }, {
    key: 2,
    id: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

export default {
  components: {
    CreateForm
  },
  data () {
    return {
      data,
      columns,
      rowSelection,
      mdl: null,
      confirmLoading: false,
      addEditVisible: false
    }
  },
  methods: {
    handleAdd () {
      this.mdl = null
      this.addEditVisible = true
    },
    queryDetail (record) {
      this.addEditVisible = true
      this.mdl = { ...record }
      console.log(this.mdl)
    },
    handleEdit (record) {
      this.addEditVisible = true
      this.mdl = { ...record }
      console.log(this.mdl)
    },
    handleDelete (id) {
      console.log(id)
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.addEditVisible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.addEditVisible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.addEditVisible = false
      // const form = this.$refs.createModal.form
      // form.resetFields() // 清理表单数据（可不做），不要做，因为点击取消按钮时，发现表单的值瞬间变了
    }
  }
}
</script>
