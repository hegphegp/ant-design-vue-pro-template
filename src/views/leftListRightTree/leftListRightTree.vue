<template>
  <a-row :gutter="48" style="margin-left: -6px; margin-right: -6px;">
    <a-col :span="10" style="padding-left: 6px; padding-right: 6px;">
      <a-card title="字典分类" :bordered="false">
        <div class="label-config">
          <a-form layout="inline">
            <a-col :span="8" style="padding-left: 6px; padding-right: 6px;">
              <a-form-item label="名称" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :span="8" style="padding-left: 6px; padding-right: 6px;">
              <a-form-item label="编码" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-button style="margin-bottom: 8px; padding: 0 2px;" type="primary" @click="$refs.leftListTable.refresh(true)">查询</a-button>
            <a-button style="margin-bottom: 8px; margin-left: 2px; padding: 0 2px;" type="primary">新建</a-button>
            <a-button style="margin-bottom: 8px; margin-left: 2px; padding: 0 2px;" type="primary">新建</a-button>
          </a-form>
        </div>

        <s-table
          ref="leftListTable"
          size="default"
          rowKey="key"
          :columns="leftListColumns"
          :data="leftListData"
          :showAlert="false"
          :alert="true"
          :rowSelection="rowSelection"
          :pagination="pagination"
          :customRow="customRow"
          bordered>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="queryDetail(record.id)">详情</a>
              <a-divider type="vertical" />
              <a @click="handleEdit(record.id)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleDelete(record.id)">删除</a>
            </template>
          </span>
        </s-table></a-card>
    </a-col>

    <a-col :span="14" style="padding-left: 6px; padding-right: 6px;">
      <a-card :title="type" :bordered="false">
        <div class="label-config">
          <a-form layout="inline" v-show="visible">
            <a-col :span="9" style="padding-left: 6px; padding-right: 6px;">
              <a-form-item label="名称" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :span="9" style="padding-left: 6px; padding-right: 6px;">
              <a-form-item label="编码" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-button style="margin-bottom: 8px; padding: 0 6px;" type="primary" @click="$refs.leftListTable.refresh(true)">查询</a-button>
            <a-button style="margin-bottom: 8px; margin-left: 8px; padding: 0 6px;" type="primary">新建</a-button>
          </a-form>
        </div>
        <a-table
          ref="table"
          :pagination="false"
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
              <a @click="handleDelete(record.key)">删除</a>
            </template>
          </span>
        </a-table>
        <create-form ref="createModal" @refreshPage="refreshPage"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import CreateForm from '../simple/components/CreateForm'
import STable from '@/components/Table'

// 表单字段
// const fields = ['description', 'id']

const leftListColumns = [
  { title: 'name', dataIndex: 'name', ellipsis: true },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address', ellipsis: true },
  { title: 'Action' }
]

const leftListData = {
  pageSize: 10,
  pageNo: 1,
  totalCount: 5701,
  totalPage: 571,
  data: [
    { key: '0', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '1', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '2', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '3', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '4', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '5', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '6', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '7', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '8', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' },
    { key: '9', name: '姓名姓名姓名', age: 32, address: '地址地址地址地址地址地址' }
  ]
}

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '编码', dataIndex: 'code', wkeyth: '12%' },
  { title: '操作', scopedSlots: { customRender: 'action' } }
]

const data = []

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
    CreateForm,
    STable
  },
  data () {
    return {
      leftListColumns,
      data,
      columns,
      visible: true,
      type: 'aa分类子项',
      rowSelection,
      selectedRowKeys: [],
      selectedRows: [],
      pagination: {
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      leftListData: parameter => { // 加载数据方法 必须为 Promise 对象
        // const requestParameters = Object.assign({}, parameter, this.queryParam)
        // console.log(JSON.stringify(requestParameters))
        // if (this.queryParam.yearMonthDay != null && this.queryParam.yearMonthDay !== undefined) {
        //   console.log(this.queryParam.yearMonthDay.valueOf())
        // }
        leftListData.pageNo = parameter.pageNo
        return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
          resolve(leftListData)
        }).then(data => { // console.log(JSON.stringify(data))
          return data
        }).catch(err => {
          console.log(err)
        })
      },
      // 自定义行
      customRow (record, index) {
        return {
          on: { // 鼠标单击行
            click: event => {
              console.log(record)
            }
          }
        }
      }
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
    },
    refreshPage () {
      setTimeout(() => {
        const item = {
          key: new Date().getTime(),
          id: new Date().getTime(),
          name: '人名',
          age: 32,
          address: '地址'
        }
        this.data.push(item)
        // this.data = [...data, item]
        console.log('Simple.vue refreshPage()')
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>

/deep/ .ant-card-body {
  padding: 10px;
}

/deep/ .label-config {
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 8px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 2px;
        width: 30px;
        min-width: 30px;
        max-width: 30px;
        white-space: inherit;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }
}
</style>
