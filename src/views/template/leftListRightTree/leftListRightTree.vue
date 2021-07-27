<template>
  <a-row :gutter="48" style="margin-left: -6px; margin-right: -6px;">
    <a-col :span="10" style="padding-left: 6px; padding-right: 6px;">
      <a-card title="字典分类" :bordered="false">
        <div class="div-config">
          <a-form layout="inline">
            <a-col :span="8" style="padding-left: 6px; padding-right: 6px;">
              <a-form-item label="名称" :colon="false">
                <!-- <a-input @pressEnter="e => queryData(e)"/> -->
                <!-- @pressEnter="queryData"回车查询，queryData(event)函数在定义时有个event参数。 -->
                <a-input v-model="leftList.queryParam.name" @pressEnter="queryData"/>
              </a-form-item>
            </a-col>
            <a-col :span="8" style="padding-left: 6px; padding-right: 6px;">
              <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式 -->
              <a-form-item label="编码" :colon="true">
                <a-input v-model="leftList.queryParam.code" @pressEnter="queryData"/>
              </a-form-item>
            </a-col>
            <a-button style="margin-bottom: 8px; padding: 0 2px;" type="primary" @click="$refs.leftListTable.refresh(true)">查询</a-button>
            <a-button style="margin-bottom: 8px; margin-left: 2px; padding: 0 2px;" type="primary" @click="leftListQueryAllSelected()">勾选的数据</a-button>
            <a-button style="margin-bottom: 8px; margin-left: 2px; padding: 0 2px;" type="primary">新建</a-button>
            <a-button style="margin-bottom: 8px; margin-left: 2px; padding: 0 2px;" type="primary">新建</a-button>
          </a-form>
        </div>
        <!-- rowKey前面没冒号，指定table数据的key字段名称 -->
        <!-- :customRow给table每一行添加点击事件 -->
        <!-- :columns="leftList.columns"定义每一列 -->
        <!-- :data="leftList.data"定义数据 -->
        <!-- :pagination="leftList.pagination"定义分页插件 -->
        <!-- :rowSelection="leftList.rowSelection"定义table每一行复选框选中事件 -->
        <!-- :customRow="leftListCustomRow"点击每一行数据的编辑按钮也会触发table的每一行点击事件，脑阔疼 -->
        <!-- s-table标签的:data返回值必须是funtion，且function的返回值必须是new Promise -->
        <s-table
          ref="leftListTable"
          size="default"
          rowKey="id"
          :columns="leftList.columns"
          :data="leftList.listData"
          :showAlert="false"
          :alert="true"
          :rowSelection="leftList.rowSelection"
          :pagination="leftList.pagination"
          :customRow="leftListCustomRow"
          bordered>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="leftListQueryDetail(record.id)">详情</a>
              <a-divider type="vertical" />
              <a @click="leftListHandleEdit(record.id)">编辑</a>
              <a-divider type="vertical" />
              <a @click="leftListHandleDelete(record.id)">删除</a>
            </template>
          </span>
        </s-table>
        <CreateForm ref="leftListCreateModal" @refreshPage="leftListRefreshPage"/>
      </a-card>
    </a-col>

    <a-col :span="14" style="padding-left: 6px; padding-right: 6px;">
      <a-card :title="rightTreeList.title" :bordered="false" v-show="rightTreeList.visible">
        <div class="div-config">
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
        <!-- :defaultExpandAllRows="false" 树形表格的每一行是否展开 -->
        <a-table
          ref="table"
          rowKey="id"
          :pagination="false"
          :columns="rightTreeList.columns"
          :data-source="rightTreeList.listData"
          :row-selection="rightTreeList.rowSelection"
          bordered
          :defaultExpandAllRows="true">
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="queryDetail(record)">详情</a>
              <a-divider type="vertical" />
              <a @click="rightTreeListHandleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="rightTreeListHandleDelete(record.key)">删除</a>
            </template>
          </span>
        </a-table>
        <CreateForm ref="rightTreeListCreateModal" @refreshPage="rightTreeListRefreshPage"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import CreateForm from './components/CreateForm'
import STable from '@/components/Table'

const leftListData = {
  pageSize: 10,
  pageNo: 1,
  totalCount: 5701,
  totalPage: 571,
  data: [
    { id: '0', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '1', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '2', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '3', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '4', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '5', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '6', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '7', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '8', name: '姓名姓名', age: 32, address: '地址地址地址' }, { id: '9', name: '姓名姓名', age: 32, address: '地址地址地址' }
  ]
}

const rightTreeListData = [
  { id: '44', name: '广东省', code: '44', orderNo: 2, children: [{ id: '4403', name: '深圳市', code: '4403', orderNo: 2, parentId: '44', children: [{ id: '440306', name: '宝安区', code: '440306', orderNo: 2, parentId: '4403', children: [{ id: '440306006', name: '石岩街道', code: '440306006', orderNo: 1, parentId: '440306', children: [{ id: '440306006007', name: '塘头社区', code: '440306006007', orderNo: 1, parentId: '440306006', hasChild: false }, { id: '440306006008', name: '应人石社区', code: '440306006008', orderNo: 2, parentId: '440306006', hasChild: false }, { id: '440306006009', name: '石龙社区', code: '440306006009', orderNo: 3, parentId: '440306006', hasChild: false }, { id: '440306006010', name: '石岩龙腾社区', code: '440306006010', orderNo: 4, parentId: '440306006', hasChild: false }, { id: '440306006001', name: '官田社区', code: '440306006001', orderNo: 120, parentId: '440306006', hasChild: false }, { id: '440306006002', name: '浪心社区', code: '440306006002', orderNo: 121, parentId: '440306006', hasChild: false }, { id: '440306006003', name: '罗租社区', code: '440306006003', orderNo: 122, parentId: '440306006', hasChild: false }, { id: '440306006004', name: '上屋社区', code: '440306006004', orderNo: 123, parentId: '440306006', hasChild: false }, { id: '440306006006', name: '水田社区', code: '440306006006', orderNo: 124, parentId: '440306006', hasChild: false }, { id: '440306006011', name: '宝源社区', code: '440306006011', orderNo: 135, parentId: '440306006', hasChild: false }], hasChild: true }, { id: '440306011', name: '新安街道', code: '440306011', orderNo: 2, parentId: '440306', children: [{ id: '440306011001', name: '安乐社区', code: '440306011001', orderNo: 5, parentId: '440306011', hasChild: false }, { id: '440306011002', name: '宝民社区', code: '440306011002', orderNo: 6, parentId: '440306011', hasChild: false }, { id: '440306011003', name: '布心社区', code: '440306011003', orderNo: 7, parentId: '440306011', hasChild: false }, { id: '440306011004', name: '大浪社区', code: '440306011004', orderNo: 8, parentId: '440306011', hasChild: false }, { id: '440306011005', name: '翻身社区', code: '440306011005', orderNo: 9, parentId: '440306011', hasChild: false }, { id: '440306011006', name: '海富社区', code: '440306011006', orderNo: 10, parentId: '440306011', hasChild: false }, { id: '440306011007', name: '海华社区', code: '440306011007', orderNo: 11, parentId: '440306011', hasChild: false }, { id: '440306011008', name: '海乐社区', code: '440306011008', orderNo: 12, parentId: '440306011', hasChild: false }, { id: '440306011009', name: '海旺社区', code: '440306011009', orderNo: 13, parentId: '440306011', hasChild: false }, { id: '440306011010', name: '海裕社区', code: '440306011010', orderNo: 14, parentId: '440306011', hasChild: false }, { id: '440306011011', name: '洪浪社区', code: '440306011011', orderNo: 15, parentId: '440306011', hasChild: false }, { id: '440306011012', name: '甲岸社区', code: '440306011012', orderNo: 16, parentId: '440306011', hasChild: false }, { id: '440306011013', name: '建安社区', code: '440306011013', orderNo: 17, parentId: '440306011', hasChild: false }, { id: '440306011014', name: '灵芝园社区', code: '440306011014', orderNo: 18, parentId: '440306011', hasChild: false }, { id: '440306011015', name: '龙井社区', code: '440306011015', orderNo: 19, parentId: '440306011', hasChild: false }, { id: '440306011016', name: '上川社区', code: '440306011016', orderNo: 20, parentId: '440306011', hasChild: false }, { id: '440306011017', name: '上合社区', code: '440306011017', orderNo: 21, parentId: '440306011', hasChild: false }, { id: '440306011018', name: '文汇社区', code: '440306011018', orderNo: 22, parentId: '440306011', hasChild: false }, { id: '440306011019', name: '文雅社区', code: '440306011019', orderNo: 23, parentId: '440306011', hasChild: false }, { id: '440306011020', name: '新安湖社区', code: '440306011020', orderNo: 24, parentId: '440306011', hasChild: false }, { id: '440306011021', name: '新乐社区', code: '440306011021', orderNo: 25, parentId: '440306011', hasChild: false }, { id: '440306011022', name: '兴东社区', code: '440306011022', orderNo: 26, parentId: '440306011', hasChild: false }], hasChild: true }], hasChild: true }, { id: '440309', name: '光明区', code: '440311', orderNo: 136, parentId: '4403', hasChild: false }], hasChild: true }], hasChild: true }
]

// export default里面可以用this，表示当前的对象，export default外面的变量，例如leftListData和columns，在这两个变量里面用this，表示这两个表量，不表示当前对象
export default {
  components: {
    CreateForm,
    STable
  },
  data () {
    return {
      leftList: {
        queryParam: {
          name: null,
          code: null
        },
        columns: [
          { title: '名字', dataIndex: 'name', ellipsis: true },
          { title: '年龄', dataIndex: 'age' },
          { title: '地址', dataIndex: 'address', ellipsis: true }, // ellipsis: true表示不换行，使用省略号表示超出部分的内容
          { title: '操作', scopedSlots: { customRender: 'action' } }
        ],
        listData: (parameter) => { // 加载数据方法 必须返回 new Promise 对象，否则数据不加载出来
          // 每次调用 this.$refs.leftListTable.refresh(true) 都会进入该方法
          // 每次点击分页的页码时，或者在分页的跳转输入框输入数字按回车跳转时都会进入该方法
          const requestParameters = Object.assign({}, parameter, this.leftList.queryParam)
          console.log(JSON.stringify(requestParameters))
          // if (this.queryParam.yearMonthDay != null && this.queryParam.yearMonthDay !== undefined) {
          //   console.log(this.queryParam.yearMonthDay.valueOf())
          // }
          return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
            leftListData.data.forEach(item => {
              item.name = '姓名姓名'
            })
            resolve(leftListData)
          }).then(data => { // console.log(JSON.stringify(data))
            return data
          }).catch(err => {
            console.log(err)
          })
        },
        pagination: {
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
          pageSizeOptions: ['10', '20', '50', '100', '200', '300', '500']
          // onChange: (pageNumber) => {
          //   console.log('Page: ', pageNumber)
          //   // this.$refs.leftListTable.refresh(true)
          // }
        },
        selectedRowKeys: ['0', '1', '2', '3', '4'],
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            this.leftList.selectedRowKeys = []
            for (var i = 0; i < selectedRows.length; i++) {
              // selectedRowKeysTemp.push(selectedRows[i].keyName) // 已手动设置table的rowKey="id"，此时不能用selectedRows[i].keyName，要用selectedRows[i].id
              this.leftList.selectedRowKeys.push(selectedRows[i]['id'])
            }
          },
          onSelect: (record, selected, selectedRows) => {
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
          },
          getCheckboxProps: (record) => {
            return {
              props: {
                defaultChecked: this.leftList.selectedRowKeys.includes(record['id']) // record为当前行数据勾选
              },
              defaultChecked: this.leftList.selectedRowKeys.includes(record['id']) // table列名的checkbox框
            }
          }
        }
      },
      rightTreeList: {
        title: 'aa分类',
        visible: true,
        columns: [
          { title: '名字', dataIndex: 'name', ellipsis: true },
          { title: '编码', dataIndex: 'code', ellipsis: true }, // ellipsis: true表示不换行，使用省略号表示超出部分的内容
          { title: '操作', scopedSlots: { customRender: 'action' } }
        ],
        listData: rightTreeListData,
        type: 'aa分类子项',
        selectedRowKeys: [],
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            this.rightTreeList.selectedRowKeys = []
            for (var i = 0; i < selectedRows.length; i++) {
              this.rightTreeList.selectedRowKeys.push(selectedRows[i]['id'])
            }
            // console.log(JSON.stringify(this.rightTreeList.selectedRowKeys))
          },
          onSelect: (record, selected, selectedRows) => {
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
          },
          getCheckboxProps: (record) => {
            return {
              props: {
                defaultChecked: this.rightTreeList.selectedRowKeys.includes(record['id']) // record为当前行数据勾选
              },
              defaultChecked: this.rightTreeList.selectedRowKeys.includes(record['id']) // table列名的checkbox框
            }
          }
        }
      }
    }
  },
  methods: {
    // 查询后台数据
    queryData (event) {
      this.$refs.leftListTable.refresh(true)
    },
    leftListCustomRow (record, index) { // 自定义行
      return {
        on: { // 不想用鼠标单击行，鼠标单击的误操作比较大
          dblclick: (e) => {
            this.rightTreeList.visible = !this.rightTreeList.visible
          },
          click: (e) => { },
          contextMenu: (e) => { },
          mouseenter: (e) => { },
          mouseleave: (e) => { }
        }
      }
    },
    leftListQueryAllSelected () {
      console.log(this.leftList.selectedRowKeys)
    },
    leftListHandleAdd () {
      this.$refs.leftListCreateModal.openFormModal('add')
    },
    leftListQueryDetail (record) {
      console.log(record.id)
      const params = { type: 'detail', id: '0000' }
      console.log(JSON.stringify(params))
      this.$refs.leftListCreateModal.openFormModal(params)
    },
    leftListHandleEdit (record) {
      this.$refs.leftListCreateModal.openFormModal('edit')
    },
    leftListHandleDelete (id) {
      console.log(id)
    },
    leftListRefreshPage (params) {
      setTimeout(() => {
        const item = {
          key: new Date().getTime(),
          id: new Date().getTime(),
          name: '人名',
          age: 32,
          address: '地址'
        }
        leftListData.data.push(item)
        // this.data = [...data, item]
        console.log('Simple.vue refreshPage()')
      }, 1000)
    },
    rightTreeListQueryAllSelected () {
      console.log(this.rightTreeList.selectedRowKeys)
    },
    rightTreeListHandleAdd () {
      this.$refs.rightTreeListCreateModal.openFormModal('add')
    },
    rightTreeListQueryDetail (record) {
      this.$refs.rightTreeListCreateModal.openFormModal('detail')
    },
    rightTreeListHandleEdit (record) {
      this.$refs.rightTreeListCreateModal.openFormModal('edit')
    },
    rightTreeListHandleDelete (id) {
      console.log(id)
    },
    rightTreeListRefreshPage () {
      setTimeout(() => {
        const item = {
          key: new Date().getTime(),
          id: new Date().getTime(),
          name: '人名',
          age: 32,
          address: '地址'
        }
        this.data.push(item)
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

/deep/ .div-config {
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
