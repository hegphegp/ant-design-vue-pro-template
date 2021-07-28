<template>
  <a-card :bordered="false">
    <a-form layout="inline">
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="规则规则编号" :colon="false">
          <a-input v-model="queryParam.id" placeholder=""/>
        </a-form-item>
      </a-col>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.tableRef.refresh(true)">查询</a-button>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="danger" @click="batchDelete()">批量删除</a-button>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" icon="plus" @click="handleAdd()">新建</a-button>
    </a-form>

    <s-table
      ref="tableRef"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :showAlert="false"
      :alert="true"
      :rowSelection="rowSelection"
      :pagination="pagination"
      bordered>
      <span slot="action" slot-scope="text, record">
        <a-button size="small" @click="queryDetail(record.id)">详情</a-button>
        <a-button size="small" @click="handleEdit(record.id)">编辑</a-button>
        <a-button size="small" @click="handleDelete(record.id)">删除</a-button>
      </span>
    </s-table>
    <CreateForm ref="createForm" @refreshPage="refreshListPage"/>
  </a-card>
</template>

<script>
// import pick from 'lodash.pick'
import STable from '@/components/Table'
import moment from 'moment'
import { time2Long } from '@/utils/common'
import CreateForm from './components/CreateForm'

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
  { title: '标签', dataIndex: 'tags', scopedSlots: { customRender: 'tags' } },
  { title: '操作', scopedSlots: { customRender: 'action' } }
]

const listData = {
  pageSize: 10,
  pageNo: 1,
  totalCount: 5701,
  totalPage: 571,
  data: [
    { id: '0', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '1', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '2', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '4', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '5', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '6', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '7', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '8', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { id: '9', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] }
  ]
}

export default {
  name: 'TestList',
  components: {
    STable,
    CreateForm
  },
  data () {
    this.columns = columns
    return {
      pagination: {
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条数据`,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      loadData: this.queryTablePageData, // this.queryTablePageData方法默认自带parameter参数，我痛恨一切无中生有的参数，失败的设计，方法返回必须是new Promise类型
      queryParams: { }, // 查询参数
      selectedRowKeys: [ ],
      dataSource: {
        selectDatas: [ ] // 下拉框数据的对象
      },
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = []
          for (var i = 0; i < selectedRows.length; i++) {
            this.selectedRowKeys.push(selectedRows[i].id)
          }
        },
        onSelect: (record, selected, selectedRows) => { },
        onSelectAll: (selected, selectedRows, changeRows) => { },
        getCheckboxProps: (record) => {
          return {
            props: {
              defaultChecked: this.selectedRowKeys.includes(record.id) // record为当前行数据勾选
            },
            defaultChecked: this.selectedRowKeys.includes(record.id) // table列名的checkbox框
          }
        }
      }
    }
  },
  created () { // created 初始从后端加载下拉框数据
    this.initDataSources()
    this.initListQueryParams()
    this.$watch('queryParams', () => { // 当 queryParam 发生改变时，为表单设置值
      console.log(this.queryParams)
    })
  },
  methods: { // 添加加载下拉框数据的方法
    initDataSources () {
      new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = [ { code: 'ALL', name: '全部' }, { code: 'STATUS1', name: '状态1' }, { code: 'STATUS2', name: '状态2' }, { code: 'STATUS3', name: '状态3' } ]
        data.forEach((item) => {
          this.selectDatas.push({ value: item.code, text: item.name })
        })
        // this.queryParam.selectValue = 'STATUS1' 无效，可能是页面还没渲染，不能用this.queryParam.selectValue = 赋值
        this.$set(this.queryParam, 'selectValue', 'STATUS1')
        resolve(data)
      }).catch(err => {
        console.log(err)
      }).finally(() => { // finally是同步的
      })
    },
    initDefaultValues () {
      this.queryParam.field01 = moment(1596471447000)
      this.queryParam.field02 = moment(1591471447000)
    },
    disabledDate (current) {
      const yesterday = moment(new Date()).add(-1, 'days') // 限制不允许选择昨天
      return current && current < yesterday // return false
    },
    disabledRangeTime () {
      return {
        disabledHours: () => [-1, 24],
        disabledMinutes: () => [-1, 60],
        disabledSeconds: () => [-1, 60]
      }
    },
    // 很少用到的功能
    pressEnterFun (event) {
      console.log('==========>>>>>>>>>>>按下回车键<<<<<<<<<<===========')
    },
    changeFun (event) {
      console.log('==========>>>>>>>>>>>值发生改变<<<<<<<<<<===========')
    },
    async listInit () {
      this.queryParam.dateValue01 = moment(1596471447000)
      this.queryParam.dateValue02 = moment(1591471447000)
      await this.initSelectDatas()
    },
    queryTablePageData (parameter) { // 必须返回Promise对象
        const urlParameters = Object.assign({}, parameter, this.queryParam)
        // console.log(JSON.stringify(urlParameters))
        // 时间单独转换成毫秒级时间戳long类型
        urlParameters['yyyyMMddHHmmss1'] = time2Long(this.queryParam.yyyyMMddHHmmss1)
        urlParameters['dateValue01'] = time2Long(this.queryParam.dateValue01)
        urlParameters['dateValue02'] = time2Long(this.queryParam.dateValue02)
        // console.log(JSON.stringify(urlParameters))

        listData.pageNo = parameter.pageNo
        return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
          resolve(listData)
        }).then(data => {
          // console.log(JSON.stringify(data))
          return data
        }).catch(err => {
          console.log(err)
        })
    },
    batchDelete () {
      if (this.selectedRowKeys.length === 0) {
        this.$warning({ title: '提示', content: '请勾选数据' })
      } else {
        // 必须创建一个对象指向this，否则在new Promise里面使用this，会认为是new Promise本身的变量
        const outerObj = this
        this.$confirm({
            title: '确认提示',
            content: `确认删除吗？`,
            okType: 'danger',
            onOk () {
              return new Promise((resolve, reject) => {
                resolve({ 'code': 200, 'msg': 'success' })
              }).then(data => {
                console.log(JSON.stringify(data))
                if (data.code === 200) {
                  outerObj.$message.success('操作成功! ')
                  outerObj.$refs.tableRef.refresh(true)
                } else {
                  outerObj.$message.error('删除失败：' + data.data)
                }
              }).catch(err => {
                console.log(err)
                outerObj.$message.error('删除失败')
              })
            }
        })
      }
      // this.$warning({ title: ptitle, content: pcontent })
    },
    handleAdd () {
      this.resetform001()
      this.form001.visible = true
      this.form001.title = '新增'
    },
    handleEdit (record) {
      this.resetform001()
      this.form001.visible = true
      this.form001.title = '编辑'
    },
    queryDetail (record) {

    },
    handleDelete (id) {
      this.$refs.tableRef.refresh(true)
    }
  }
}
</script>
