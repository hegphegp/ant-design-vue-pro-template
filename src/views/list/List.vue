<template>
  <a-card :bordered="false">
    <a-form layout="inline">
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="规则规则编号" :colon="false">
          <a-input v-model="list.queryParam.id" placeholder=""/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="使用状态" :colon="false">
          <a-select v-model="list.queryParam.status" placeholder="请选择" default-value="0">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">关闭</a-select-option>
            <a-select-option value="2">运行中</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="调用次数" :colon="false">
          <a-input-number v-model="list.queryParam.callNo" style="width: 100%"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日" :colon="false">
          <a-date-picker v-model="list.queryParam.yearMonthDay" style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日时分秒" :colon="false">
          <a-date-picker v-model="list.queryParam.yyyyMMddHHmmss" format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日时分秒" :colon="false">
          <a-date-picker
            v-model="list.queryParam.yyyyMMddHHmmss1"
            style="width: 100%"
            format="YYYY-MM-DD HH:mm:ss"
            show-time
            :disabled-date="disabledDate"
            :disabled-time="disabledRangeTime"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日" :colon="false">
          <a-date-picker v-model="list.queryParam.dateValue01" style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日时分秒" :colon="false">
          <a-date-picker v-model="list.queryParam.dateValue02" format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月" :colon="false">
          <a-month-picker v-model="list.queryParam.yearMonth01" style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="使用状态" :colon="false">
          <a-select v-model="list.queryParam.useStatus" placeholder="请选择" mode="multiple" allowClear>
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">关闭</a-select-option>
            <a-select-option value="2">运行中</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="下拉框默认值" :colon="false">
          <a-select v-model="list.queryParam.selectValue" showSearch placeholder="请选择" allowClear>
            <a-select-option v-for="item in list.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.tableRef.refresh(true)">查询</a-button>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="danger" @click="batchDelete()">删除</a-button>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" icon="plus" @click="handleAdd()">新建</a-button>
    </a-form>

    <s-table
      ref="tableRef"
      rowKey="id"
      :columns="columns"
      :data="list.loadData"
      :showAlert="false"
      :alert="true"
      :rowSelection="list.rowSelection"
      :pagination="list.pagination"
      bordered>
      <span slot="tags" slot-scope="text, record">
        <!-- v-for循环 -->
        <span v-for="(item, i) in record.tags" :key="i">
          <span v-if="item == 'cool'">
            <a-button size="small" type="primary">cool</a-button>
          </span>
          <span v-if="item == 'teacher'">
            <a :href="'https://www.baidu.com'" target="_blank">百度</a>
          </span>
        </span>
        {{ record.tags }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button size="small" @click="queryDetail(record.id)">详情</a-button>
        <a-button size="small" @click="handleEdit(record.id)">编辑</a-button>
        <a-button size="small" @click="handleDelete(record.id)">删除</a-button>
      </span>
    </s-table>

    <template>
      <a-modal :title="form001.title" :width="1080" :visible="form001.visible" @cancel="handleCancel">
        <div class="ant-form-item-config">
          <a-form :form="form001.form" layout="inline">
            <a-row>
              <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="form001.itemShow.field01" style="padding-right: 12px;">
                <a-form-item label="描述" :colon="false">
                  <a-input v-decorator="['field01', { rules: form001.rules.field01 }]" :disabled="form001.disableds.field01" @pressEnter="pressEnterFun" @change="changeFun"/>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="form001.itemShow.field02" style="padding-right: 12px;">
                <a-form-item label="下拉框默认值" :colon="false">
                  <a-select v-decorator="['field02', { rules: form001.rules.field02 }]" allowClear showSearch placeholder="请选择" :disabled="form001.disableds.field02" @change="changeFun">
                    <a-select-option v-for="item in form001.dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="form001.itemShow.field03" style="padding-right: 12px;">
                <a-form-item label="规则编号" :colon="false">
                  <a-input placeholder="" v-decorator="['field03', { rules: form001.rules.field03 }]" :disabled="form001.disableds.field03" @pressEnter="pressEnterFun" @change="changeFun"/>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="form001.itemShow.field04" style="padding-right: 12px;">
                <a-form-item label="描述" :colon="false">
                  <a-input v-decorator="['field04', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" :disabled="form001.disableds.field04" @pressEnter="pressEnterFun" @change="changeFun"/>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="form001.itemShow.field05" style="padding-right: 12px;">
                <a-form-item label="下拉框默认值" :colon="false">
                  <!-- a-select下拉框没有@pressEnter事件 -->
                  <a-select allowClear showSearch placeholder="请选择" v-decorator="['field05', { rules: form001.rules.field05 }]" @change="changeFun" :disabled="form001.disableds.field05" >
                    <a-select-option v-for="item in form001.dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="form001.itemShow.field06" style="padding-right: 12px;">
                <a-form-item label="选择业务" :colon="false">
                  <a-cascader v-decorator="['field06', { rules: form001.rules.field06 }]" :options="form001.dataSource.cascaderSelectData" :fieldNames="form001.fieldNames" @change="cascaderChange" :disabled="form001.disableds.field06" placeholder="请选择"/>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="form001.itemShow.field07" style="padding-right: 12px;">
                <a-form-item label="年月日时分秒" :colon="false">
                  <a-date-picker v-decorator="['field07', {rules: form001.rules.field07 }]" style="width: 100%" :disabled="form001.disableds.field07" @pressEnter="pressEnterFun" @change="changeFun"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <template slot="footer">
          <a-button type="primary" @click="handleOk" :disabled="form001.loading">新增</a-button>
          <a-button type="primary" @click="handleOk" :disabled="form001.loading">保存</a-button>
          <a-button type="primary" @click="handleCancel" :disabled="form001.loading">返回</a-button>
        </template>
      </a-modal>
    </template>
  </a-card>
</template>

<script>
// import pick from 'lodash.pick'
import STable from '@/components/Table'
import moment from 'moment'
import { listData, cascaderSelectData, selectData } from '@/data'
import { notEmpty, dataLengthValid, setFieldsCanEdit, setFieldsCannotEdit, convertSelectData, time2Long } from '@/utils/common'

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
  { title: '标签', dataIndex: 'tags', scopedSlots: { customRender: 'tags' } },
  { title: '操作', scopedSlots: { customRender: 'action' } }
]

export default {
  name: 'TestList',
  components: {
    STable
  },
  data () {
    this.columns = columns
    return {
      form001: {
        form: this.$form.createForm(this),
        loading: false,
        visible: false,
        title: '',
        fieldNames: { 'value': 'value', 'label': 'label', 'children': 'children' },
        allFields: ['field01', 'field02', 'field03', 'field04', 'field05', 'field06', 'field07'],
        canEditFields: ['field01', 'field02', 'field03', 'field04', 'field06', 'field07'],
        fields: {
          field01: { rules: [notEmpty, dataLengthValid(0, 20)], itemShow: false, disableds: false, defaultValue: null },
          field02: true,
          field03: true,
          field04: true,
          field05: true,
          field06: true,
          field07: true
        },
        rules: {
          field01: [notEmpty, dataLengthValid(0, 20)],
          field02: [notEmpty],
          field03: [],
          field04: [],
          field05: [],
          field06: [],
          field07: []
        },
        itemShow: {
          field01: true,
          field02: true,
          field03: true,
          field04: true,
          field05: true,
          field06: true,
          field07: true
        },
        disableds: { // 设置字段是否可以编辑
          field01: true,
          field02: true,
          field03: false,
          field04: false,
          field05: false,
          field06: false,
          field07: false
        },
        defaultValues: { // 每个字段的初始值
          field01: 'value1',
          field02: 'STATUS1',
          field05: 'STATUS2',
          field06: ['zhejiang', 'hangzhou', 'xihu'],
          field07: null
        },
        dataSource: {
          cascaderSelectData: [],
          selectDatas: []
        }
      },
      list: {
        pagination: {
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条数据`,
          pageSizeOptions: ['10', '20', '50', '100']
        },
        loadData: this.queryTablePageData, // this.queryTablePageData方法默认自带parameter参数，我痛恨一切无中生有的参数，失败的设计，方法返回必须是new Promise类型
        queryParam: {}, // 查询参数
        selectedRowKeys: ['0', '1', '2'],
        selectDatas: [], // 下拉框数据的对象
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            this.list.selectedRowKeys = []
            for (var i = 0; i < selectedRows.length; i++) {
              // selectedRowKeysTemp.push(selectedRows[i].keyName) // 已手动设置table的rowKey="id"，此时不能用selectedRows[i].keyName，要用selectedRows[i].id
              this.list.selectedRowKeys.push(selectedRows[i]['id'])
            }
            // console.log('选中行的ID===>>>>' + JSON.stringify(this.list.selectedRowKeys))
          },
          onSelect: (record, selected, selectedRows) => {
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
          },
          getCheckboxProps: (record) => {
            return {
              props: {
                defaultChecked: this.list.selectedRowKeys.includes(record['id']) // record为当前行数据勾选
              },
              defaultChecked: this.list.selectedRowKeys.includes(record['id']) // table列名的checkbox框
            }
          }
        }
      }
    }
  },
  created () { // created 初始从后端加载下拉框数据
    this.form001Init()
    this.listInit()
    this.$watch('list.queryParam', () => { // 当 list.queryParam 发生改变时，为表单设置值
      console.log(this.list.queryParam)
    })
  },
  methods: { // 添加加载下拉框数据的方法
    form001Init () {
      this.form001.allFields.forEach(v => this.form001.form.getFieldDecorator(v)) // 防止表单未注册
      this.form001.form.resetFields()
      /** ==================动态控制哪些字段可以编辑    开始================= */
      // this.form001.disableds字段前缀
      // this.form001.disableds字段前缀
      setFieldsCannotEdit(this.form001.disableds, this.form001.allFields)
      setFieldsCanEdit(this.form001.disableds, this.form001.canEditFields)
      /** ==================动态控制哪些字段可以编辑    结束================= */

      /** ==================动态控制哪些字段的校验规则    开始================= */
      this.form001.rules.field01 = [ notEmpty, dataLengthValid(0, 20) ]
      this.form001.rules.field02 = [ notEmpty, dataLengthValid(0, 20) ]
      this.form001.rules.field03 = []
      this.form001.rules.field04 = []
      this.form001.rules.field05 = [ notEmpty ]
      this.form001.rules.field07 = [ notEmpty ]
      /** ==================动态控制哪些字段的校验规则    结束================= */

      /** ============初始化下拉框的数据源，以及默认选中项    开始================= */
      this.form001InitDefaultValues()
      this.asyncForm001InitApiData()
      /** ============初始化下拉框的数据源，以及默认选中项    结束================= */
    },
    // 初始化默认值
    form001InitDefaultValues () {
      this.form001.defaultValues.field05 = 'STATUS3'
    },
    async asyncForm001InitApiData () {
      await new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        resolve(convertSelectData(selectData))
      }).then((data) => {
        this.form001.dataSource.selectDatas = data
      }).catch(err => {
        console.log(err)
      })
      await this.promiseFun().then((data) => {
        this.form001.dataSource.selectDatas = data
      }).catch(err => {
        console.log(err)
      })
      new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        resolve(cascaderSelectData)
      }).then((data) => {
        this.form001.dataSource.cascaderSelectData = data
      }).catch(err => {
        console.log(err)
      })
    },
    promiseFun () {
      return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        resolve(convertSelectData(selectData))
      })
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
    cascaderChange (value) {
      console.log(value)
    },
    // 很少用到的功能
    pressEnterFun (event) {
      console.log('==========>>>>>>>>>>>按下回车键<<<<<<<<<<===========')
    },
    changeFun (event) {
      console.log('==========>>>>>>>>>>>值发生改变<<<<<<<<<<===========')
    },
    async listInit () {
      this.list.queryParam.dateValue01 = moment(1596471447000)
      this.list.queryParam.dateValue02 = moment(1591471447000)
      await this.initSelectDatas()
    },
    initSelectDatas () {
      return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = [ { code: 'ALL', name: '全部' }, { code: 'STATUS1', name: '状态1' }, { code: 'STATUS2', name: '状态2' }, { code: 'STATUS3', name: '状态3' } ]
        data.forEach((item) => {
          this.list.selectDatas.push({ value: item.code, text: item.name })
        })
        // this.queryParam.selectValue = 'STATUS1' 无效，可能是页面还没渲染，不能用this.queryParam.selectValue = 赋值
        this.$set(this.list.queryParam, 'selectValue', 'STATUS1')
        resolve(data)
      }).catch(err => {
        console.log(err)
      }).finally(() => { // finally是同步的
      })
    },
    queryTablePageData (parameter) { // 必须返回Promise对象
        const urlParameters = Object.assign({}, parameter, this.list.queryParam)
        // console.log(JSON.stringify(urlParameters))
        // 时间单独转换成毫秒级时间戳long类型
        urlParameters['yyyyMMddHHmmss1'] = time2Long(this.list.queryParam.yyyyMMddHHmmss1)
        urlParameters['dateValue01'] = time2Long(this.list.queryParam.dateValue01)
        urlParameters['dateValue02'] = time2Long(this.list.queryParam.dateValue02)
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
      if (this.list.selectedRowKeys.length === 0) {
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
    handleCancel () {
      this.form001.visible = false
    },
    handleEdit () {
      this.resetform001()
      this.form001.visible = true
      this.form001.title = '编辑'
    },
    queryDetail (id) {
      this.resetform001()
      this.form001.loading = false
      this.form001.visible = true
      this.form001.title = '详情'
      // this.form001.form.setFieldsValue({ // 不能直接使用 Warning: You cannot set a form field before rendering a field associated with the value. You can use `getFieldDecorator(id, options)` instead `v-decorator="[id, options]"` to register it before render
      //   description01: '设置值设置值设置值'
      // })
      new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据，显示祥情
        // 查询祥情
        resolve({})
      }).then(data => {
        this.$nextTick(() => { // 使用 this.$nextTick 设置控件取值，不能直接设置，否则抛render没加载完，不能初始化
          this.form001.form.setFieldsValue({ 'field05': '设置值设置值设置值' })
          // 初始化
          this.form001.defaultValues.field07 = moment(1591471447000)
          this.form001.form.setFieldsValue(this.form001.defaultValues)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete (id) {
      this.$refs.tableRef.refresh(true)
    },
    handleOk () {
      this.form001.loading = true
      const validateFields = this.form001.allFields
      this.form001.form.validateFields(validateFields, { force: true }, (err, values) => {
        if (!err) {
          this.form001.visible = false
        } else {
          this.form001.loading = false
        }
      })
      // this.form001.visible = false
    },
    resetform001 () {
      this.form001Init()
    }
  }
}
</script>
