<template>
  <a-card :bordered="false">
    <a-form layout="inline">
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="规则规则编号" :colon="false">
          <a-input v-model="queryParams.field01" placeholder=""/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="下拉框默认值" :colon="false">
          <a-select v-model="queryParams.field02" showSearch placeholder="请选择" allowClear>
            <a-select-option v-for="item in dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日时分秒" :colon="false">
          <a-date-picker v-model="queryParams.field03" format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%" placeholder="请输入更新日期"/>
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
        <a-button size="small" @click="queryDetail(record)">详情</a-button>
        <a-button size="small" @click="handleEdit(record)">编辑</a-button>
        <a-button size="small" @click="handleDelete(record.id)">删除</a-button>
      </span>
    </s-table>
    <Form01 ref="form01" @refreshPage="refreshListPage"/>
  </a-card>
</template>

<script>
// import pick from 'lodash.pick'
import STable from '@/components/Table'
import moment from 'moment'
import { time2Long } from '@/utils/common'
import Form01 from './components/Form01'
import { listData } from '@/data'

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
  { title: '操作', scopedSlots: { customRender: 'action' } }
]

export default {
  name: 'TestList',
  components: {
    STable,
    Form01
  },
  data () {
    this.columns = columns
    return {
      pagination: {
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条数据`,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      loadData: this.queryTablePageData, // this.queryTablePageData方法默认自带parameter参数
      queryParams: { // 在v-model绑定参数，且必须把所有查询参数列在这里，否则点击下拉框右上角的删除按钮时，下拉框的值还会显示
        field01: null,
        field02: null,
        field03: null
      },
      selectedRowKeys: [ ],
      dataSource: {
        selectDatas: [ ]
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
  created () {
    this.initDataSources()
    this.initQueryParamDefaultValues()
    this.$watch('queryParams', () => { // 当 queryParam 发生改变时，为表单设置值
      console.log(this.queryParams)
    })
  },
  methods: {
    initDataSources () {
      new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = [ { value: 'ALL', text: '全部' }, { value: 'STATUS1', text: '状态1' }, { value: 'STATUS2', text: '状态2' } ]
        resolve(data)
      }).then((data) => {
        this.dataSource.selectDatas = data
      }).catch(err => {
        console.log(err)
      }).finally(() => { })
    },
    initQueryParamDefaultValues () {
      this.queryParams.field02 = 'STATUS1'
      this.queryParams.field03 = moment(1591471447000)
    },
    queryTablePageData (parameter) { // 必须返回Promise对象
      const urlParameters = Object.assign({}, parameter, this.queryParams)
      // 时间单独转换成毫秒级时间戳long类型
      urlParameters['field03'] = time2Long(this.queryParams.field03)
      console.log(JSON.stringify(urlParameters))

      listData.pageNo = parameter.pageNo
      return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        resolve(listData)
      }).then(data => {
        return data
      }).catch(err => {
        console.log(err)
      })
    },
    refreshListPage (params) {
      this.$refs.tableRef.refresh(true)
    },
    handleAdd () {
      const params = { formType: 'add' }
      this.$refs.form01.openFormModal(params)
    },
    handleEdit (record) {
      const params = { ...record, formType: 'edit' }
      this.$refs.form01.openFormModal(params)
    },
    queryDetail (record) {
      const params = { ...record, formType: 'detail' }
      this.$refs.form01.openFormModal(params)
    },
    handleDelete (id) {
      // 必须创建一个对象指向this，否则在new Promise里面使用this，会认为是new Promise本身的变量
      const outerObj = this
      this.$confirm({
        title: '确认提示',
        content: '确认删除吗？',
        okType: 'danger',
        onOk: function () {
          return new Promise((resolve, reject) => {
            resolve({ code: 200, msg: 'success' })
          }).then(data => {
            if (data.code === 200) {
              outerObj.$message.success('操作成功! ', 2)
              outerObj.$refs.tableRef.refresh(true)
            } else {
              outerObj.$message.error('删除失败：' + data.mgs, 2)
            }
          }).catch(err => {
            console.log(err)
            outerObj.$message.error('删除失败', 2)
          })
        }
      })
    },
    batchDelete () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('请勾选数据', 2)
      } else {
        // 必须创建一个对象指向this，否则在new Promise里面使用this，会认为是new Promise本身的变量
        const outerObj = this
        this.$confirm({
          title: '确认提示',
          content: '确认删除吗？',
          okType: 'danger',
          onOk: function () {
            return new Promise((resolve, reject) => {
              resolve({ code: 200, msg: 'success' })
            }).then(data => {
              if (data.code === 200) {
                outerObj.$message.success('操作成功! ')
                outerObj.$refs.tableRef.refresh(true)
              } else {
                outerObj.$message.error('删除失败：' + data.msg)
              }
            }).catch(err => {
              console.log(err)
              outerObj.$message.error('删除失败')
            })
          }
        })
      }
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
    }
  }
}
</script>
