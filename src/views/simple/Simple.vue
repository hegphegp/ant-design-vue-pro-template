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
    <create-form ref="createModal"/>
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
      rowSelection
    }
  },
  methods: {
    handleAdd () {
      this.$refs.createModal.openFormModal('add')
    },
    queryDetail (record) {
      this.$refs.createModal.openFormModal('detail')
    },
    handleEdit (record) {
      this.$refs.createModal.openFormModal('edit')
    },
    handleDelete (id) {
      console.log(id)
    }
  }
}
</script>
