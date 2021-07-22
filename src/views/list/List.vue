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
            placeholder="请输入更新日期"
            format="YYYY-MM-DD HH:mm:ss"
            show-time
            :disabled-date="disabledDate"
            :disabled-time="disabledRangeTime"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日" :colon="false">
          <a-date-picker v-model="list.queryParam.dateValue" style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日时分秒" :colon="false">
          <a-date-picker v-model="list.queryParam.dateValue" format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月" :colon="false">
          <a-month-picker v-model="list.queryParam.yearMonth" style="width: 100%" placeholder="请输入更新日期"/>
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
            <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-button style="margin-bottom: 8px; margin-left: 8px" @click="resetQueryParams()">重置</a-button>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.tableRef.refresh(true)">查询</a-button>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" icon="plus" @click="handleAdd()">新建</a-button>
    </a-form>

    <s-table
      ref="tableRef"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="list.loadData"
      :showAlert="false"
      :alert="true"
      :rowSelection="rowSelection"
      :pagination="list.pagination"
      bordered>
      <span slot="tags" slot-scope="text, record">
        <template>
          <span v-for="(item, i) in record.tags" :key="i">
            <span v-if="item == 'cool'">
              <a-button size="small" type="primary">cool</a-button>
            </span>
            <span v-if="item == 'teacher'">
              <a :href="'https://www.baidu.com'" target="_blank">百度</a>
            </span>
          </span>
        </template>
        {{ record.tags }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a-button size="small" @click="queryDetail(record.id)">详情</a-button>
          <a-button size="small" @click="handleEdit(record.id)">编辑</a-button>
          <a-button size="small" @click="handleDelete(record.id)">删除</a-button>
        </template>
      </span>
    </s-table>

    <template>
      <a-modal
        :title="form001.title"
        :width="1080"
        :visible="form001.visible"
        @cancel="handleCancel" >
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
                  <a-select
                    v-decorator="['field02', { rules: form001.rules.field02 }]"
                    allowClear
                    showSearch
                    placeholder="请选择"
                    :disabled="form001.disableds.field02"
                    @change="changeFun">
                    <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
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
                  <a-select
                    allowClear
                    showSearch
                    placeholder="请选择"
                    v-decorator="['field05', { rules: form001.rules.field05 }]"
                    @change="changeFun"
                    :disabled="form001.disableds.field05" >
                    <a-select-option v-for="item in form001.dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="form001.itemShow.field06" style="padding-right: 12px;">
                <a-form-item label="选择业务" :colon="false">
                  <a-cascader
                    v-decorator="['field06', { rules: form001.rules.field06 }]"
                    :options="form001.dataSource.cascaderSelectData"
                    placeholder="请选择业务"
                    :fieldNames="form001.fieldNames"
                    @change="cascaderChange"
                    :disabled="form001.disableds.field06"/>
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
import { notEmpty, dataLengthValid, fieldsCanEdit, fieldsCannotEdit, convertSelectData } from '@/utils/common'

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
        allFields: ['field01', 'field02', 'field03', 'field04', 'field05', 'field06'],
        canEditFields: ['field01', 'field02', 'field03', 'field04', 'field06'],
        rules: {
          field01: [notEmpty, dataLengthValid(0, 20)],
          field02: [notEmpty],
          field03: [],
          field04: [],
          field05: [],
          field06: []
        },
        itemShow: {
          field01: true,
          field02: true,
          field03: true,
          field04: true,
          field05: true,
          field06: true
        },
        disableds: { // 设置字段是否可以编辑
          field01: true,
          field02: true,
          field03: false,
          field04: false,
          field05: false,
          field06: false
        },
        initlValues: { // 每个字段的初始值
          field01: 'value1',
          field02: 'value2',
          field05: 'STATUS2',
          field06: ['zhejiang', 'hangzhou', 'xihu']
        },
        dataSource: {
          cascaderSelectData: [],
          selectData: []
        }
      },
      list: {
        pagination: {
          showTotal: total => `共 ${total} 条数据`,
          pageSizeOptions: ['10', '20', '50', '100']
        },
        loadData: this.queryList,
        data: listData,
        queryParam: {}, // 查询参数
        selectDefaultValue: null,
        defaultSearchTimeValue: null,
        selectedRowKeys: [],
        selectedRows: [],
        selectDatas: [] // 下拉框数据的对象
      },
      mdl: null
    }
  },
  created () { // created 初始从后端加载下拉框数据
    this.form001Init()
    this.listInit()
    // this.$watch('list.queryParam', () => { // 当 list.queryParam 发生改变时，为表单设置值
    //   this.queryParam && this.form001.form.setFieldsValue(pick(this.lisit.queryParam, fields))
    // })
  },
  methods: { // 添加加载下拉框数据的方法
    form001Init () {
      this.form001.form.resetFields()
      this.form001.allFields.forEach(v => this.form001.form.getFieldDecorator(v)) // 防止表单未注册
      /** ==================动态控制哪些字段可以编辑    开始================= */
      fieldsCannotEdit(this.form001.disableds, this.form001.allFields)
      fieldsCanEdit(this.form001.disableds, this.form001.canEditFields)
      /** ==================动态控制哪些字段可以编辑    结束================= */

      /** ==================动态控制哪些字段的校验规则    开始================= */
      this.form001.rules.field01 = [ notEmpty, dataLengthValid(0, 20) ]
      this.form001.rules.field02 = [ notEmpty, dataLengthValid(0, 20) ]
      this.form001.rules.field03 = []
      this.form001.rules.field04 = []
      this.form001.rules.field05 = [notEmpty]
      /** ==================动态控制哪些字段的校验规则    结束================= */

      /** ============初始化下拉框的数据源，以及默认选中项    开始================= */
      this.form001.initialValues.field05 = 'STATUS3'
      this.asyncInitApiData()
      console.log(JSON.stringify(this.form001.dataSource.selectDatas))
      /** ============初始化下拉框的数据源，以及默认选中项    结束================= */
    },
    async asyncInitApiData () {
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
      this.list.defaultSearchTimeValue = 1596471447000
      if (this.list.defaultSearchTimeValue != null && this.list.defaultSearchTimeValue !== undefined) {
        this.$set(this.list.queryParam, 'dateValue', moment(this.list.defaultSearchTimeValue))
      }
      await this.initSelectDatas()
    },
    initSelectDatas () {
      return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = [ { code: 'ALL', name: '全部' }, { code: 'STATUS1', name: '状态1' }, { code: 'STATUS2', name: '状态2' }, { code: 'STATUS3', name: '状态3' } ]
        data.forEach((item) => {
          this.selectDatas.push({ value: item.code, text: item.name })
        })
        this.selectDefaultValue = 'STATUS1'
        // this.queryParam.selectValue = this.selectDefaultValue
        this.$set(this.list.queryParam, 'selectValue', this.selectDefaultValue)
        console.log('000000000000000000000000')
        resolve(data)
      }).catch(err => {
        console.log(err)
      }).finally(() => { // finally是异步的，执行完new Promise()后，finally代码块与其他代码一起执行，线程有安全问题
        console.log('11111111111111111111111')
      })
    },
    queryList (parameter) { // 必须返回Promise对象
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log(JSON.stringify(requestParameters))
        // if (this.queryParam.yearMonthDay != null && this.queryParam.yearMonthDay !== undefined) {
        //   console.log(this.queryParam.yearMonthDay.valueOf())
        // }

        this.list.data.pageNo = parameter.pageNo
        return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
          resolve(this.list.data)
        }).then(data => { // console.log(JSON.stringify(data))
          return data
        }).catch(err => {
          console.log(err)
        })
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
      this.form001.visible = true
      this.form001.title = '详情'
      // this.form001.form.setFieldsValue({ // 不能直接使用 Warning: You cannot set a form field before rendering a field associated with the value. You can use `getFieldDecorator(id, options)` instead `v-decorator="[id, options]"` to register it before render
      //   description01: '设置值设置值设置值'
      // })
      this.$nextTick(() => { // 使用 this.$nextTick 设置控件取值，不能直接设置，否则抛render没加载完，不能初始化
        this.form001.form.setFieldsValue({ 'field05': '设置值设置值设置值' })
        this.form001.form.setFieldsValue(this.form001.initlValues)
      })
    },
    handleDelete (id) {
      this.$refs.tableRef.refresh(true)
    },
    handleOk () {
      this.form001.form.setFieldsValue(this.form001.initlValues)
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
    },
    resetQueryParams () {
      this.queryParam = {}
      if (this.list.selectDefaultValue != null && this.list.selectDefaultValue !== undefined) {
        this.$set(this.queryParam, 'selectValue', this.list.selectDefaultValue)
      }
      if (this.defaultSearchTimeValue != null && this.defaultSearchTimeValue !== undefined) {
        this.$set(this.queryParam, 'dateValue', moment(this.defaultSearchTimeValue))
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.list.selectedRowKeys,
        onChange: this.list.onSelectChange
      }
    }
  }
}
</script>
