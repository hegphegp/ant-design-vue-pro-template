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
            <a-button style="margin-bottom: 8px; margin-left: 2px; padding: 0 2px;" type="primary" @click="leftListQueryAllSelected()">勾选的数据</a-button>
            <a-button style="margin-bottom: 8px; margin-left: 2px; padding: 0 2px;" type="primary">新建</a-button>
            <a-button style="margin-bottom: 8px; margin-left: 2px; padding: 0 2px;" type="primary">新建</a-button>
          </a-form>
        </div>

        <s-table
          ref="leftListTable"
          size="default"
          rowKey="key"
          :columns="leftList.columns"
          :data="leftList.data"
          :showAlert="false"
          :alert="true"
          :rowSelection="leftList.rowSelection"
          :pagination="leftList.pagination"
          :customRow="leftList.customRow"
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
        </s-table>
      </a-card>
    </a-col>

    <a-col :span="14" style="padding-left: 6px; padding-right: 6px;">
      <a-card :title="rightTreeList.title" :bordered="false" v-show="rightTreeList.visible">
        <div class="label-config">
          <a-form layout="inline">
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
          :columns="rightTreeList.columns"
          :data-source="rightTreeList.data"
          :row-selection="rightTreeList.rowSelection"
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
        <create-form ref="createModal" @refreshPage="leftListRefreshPage"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import CreateForm from '../simple/components/CreateForm'
import STable from '@/components/Table'

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

const rightTreeListData = []

// export default里面可以用this，表示当前的对象，export default外面的变量，例如leftListData和columns，在这两个变量里面用this，表示这两个表量，不表示当前对象
export default {
  components: {
    CreateForm,
    STable
  },
  data () {
    return {
      leftList: {
        columns: [
          { title: '名字', dataIndex: 'name', ellipsis: true },
          { title: '年龄', dataIndex: 'age' },
          { title: '地址', dataIndex: 'address', ellipsis: true }, // ellipsis: true表示不换行，使用省略号表示超出部分的内容
          { title: '操作', scopedSlots: { customRender: 'action' } }
        ],
        data: (parameter) => { // 加载数据方法 必须为 Promise 对象
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
        pagination: {
          showTotal: total => `共 ${total} 条`,
          pageSizeOptions: ['10', '20', '50', '100', '200', '300', '500']
        },
        selectedRowKeys: [],
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            this.leftList.selectedRowKeys = []
            for (var i = 0; i < selectedRows.length; i++) {
              this.leftList.selectedRowKeys.push(selectedRows[i].key)
            }
            console.log(JSON.stringify(this.leftList.selectedRowKeys))
          },
          onSelect: (record, selected, selectedRows) => {
            // console.log(record, selected, selectedRows)
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            // console.log(selected, selectedRows, changeRows)
          }
        },
        customRow (record, index) { // 自定义行
          return {
            on: { // 鼠标单击行
              click: (e) => {
                console.log(record)
                console.log(record.address)
                console.log(record.age)
                console.log(record.key)
                console.log(record.name)
                const oldList = document.querySelectorAll('.checked-td-of-add-table')
                if (oldList) {
                    for (let j = 0; j < oldList.length; j++) {
                        oldList[j].classList.remove('checked-td-of-add-table')
                    }
                }

                const children = e.target.parentNode.children
                for (let i = 0; i < children.length; i++) {
                    children[i].classList.add('checked-td-of-add-table')
                }
              },
              dblclick: (e) => {

              },
              contextMenu: (e) => {

              },
              mouseenter: (e) => {

              },
              mouseleave: (e) => {

              }
            }
          }
        }
      },
      rightTreeList: {
        title: 'aa分类',
        visible: false,
        columns: [
          { title: '名称', dataIndex: 'name' },
          { title: '编码', dataIndex: 'code', wkeyth: '12%' },
          { title: '操作', scopedSlots: { customRender: 'action' } }
        ],
        data: rightTreeListData,
        type: 'aa分类子项',
        selectedRowKeys: [],
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            this.rightTreeList.selectedRowKeys = []
            for (var i = 0; i < selectedRows.length; i++) {
              this.rightTreeList.selectedRowKeys.push(selectedRows[i].key)
            }
            console.log(JSON.stringify(this.rightTreeList.selectedRowKeys))
          },
          onSelect: (record, selected, selectedRows) => {
            // console.log(record, selected, selectedRows)
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            // console.log(selected, selectedRows, changeRows)
          }
        }
      }
    }
  },
  methods: {
    leftListQueryAllSelected () {
      console.log(this.selectedRowKeys)
    },
    leftListHandleAdd () {
      this.$refs.createModal.openFormModal('add')
    },
    leftListQueryDetail (record) {
      this.$refs.createModal.openFormModal('detail')
    },
    leftListHandleEdit (record) {
      this.$refs.createModal.openFormModal('edit')
    },
    leftListHandleDelete (id) {
      console.log(id)
    },
    leftListRefreshPage () {
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
/** 放弃点击table行时的样式
/deep/ .checked-td-of-add-table {
  background-color: rgba(24,144,255,0.5);
}
*/

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
        width: 48px;
        min-width: 48px;
        max-width: 48px;
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
