<template>
  <a-modal :title="title" :width="1080" :visible="visible" @cancel="handleCancel" :confirmLoading="loading">
    <a-spin :spinning="loading">
      <a-form :form="form" layout="inline">
        <a-row>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="itemShow.field01" style="padding-right: 12px;">
            <a-form-item label="描述" :colon="false">
              <a-input v-decorator="['field01', { rules: rules.field01 }]" :disabled="disableds.field01" @pressEnter="pressEnterFun" @change="changeFun"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="itemShow.field02" style="padding-right: 12px;">
            <a-form-item label="下拉框默认值" :colon="false">
              <a-select v-decorator="['field02', { rules: rules.field02 }]" allowClear showSearch placeholder="请选择" :disabled="disableds.field02" @change="changeFun">
                <a-select-option v-for="item in dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="itemShow.field03" style="padding-right: 12px;">
            <a-form-item label="规则编号" :colon="false">
              <a-input placeholder="" v-decorator="['field03', { rules: rules.field03 }]" :disabled="disableds.field03" @pressEnter="pressEnterFun" @change="changeFun"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="itemShow.field04" style="padding-right: 12px;">
            <a-form-item label="描述" :colon="false">
              <a-input v-decorator="['field04', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" :disabled="disableds.field04" @pressEnter="pressEnterFun" @change="changeFun"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="itemShow.field05" style="padding-right: 12px;">
            <a-form-item label="下拉框默认值" :colon="false">
              <!-- a-select下拉框没有@pressEnter事件 -->
              <a-select allowClear showSearch placeholder="请选择" v-decorator="['field05', { rules: rules.field05 }]" @change="changeFun" :disabled="disableds.field05" >
                <a-select-option v-for="item in dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="itemShow.field06" style="padding-right: 12px;">
            <a-form-item label="选择业务" :colon="false">
              <a-cascader v-decorator="['field06', { rules: rules.field06 }]" :options="dataSource.cascaderSelectData" :fieldNames="fieldNames" @change="cascaderChange" :disabled="disableds.field06" placeholder="请选择"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="itemShow.field07" style="padding-right: 12px;">
            <a-form-item label="年月日时分秒" :colon="false">
              <a-date-picker v-decorator="['field07', {rules: rules.field07 }]" style="width: 100%" :disabled="disableds.field07" @pressEnter="pressEnterFun" @change="changeFun"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button type="primary" @click="handleOk" :disabled="loading">新增11</a-button>
      <a-button type="primary" @click="handleOk" :disabled="loading">保存</a-button>
      <a-button type="primary" @click="handleCancel" :disabled="loading">返回</a-button>
    </template>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { cascaderSelectData, selectData } from '@/data'
import { notEmpty, dataLengthValid, fieldsCanEdit, fieldsCannotEdit, convertSelectData, time2Long } from '@/utils/common'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false,
      visible: false,
      title: '',
      fieldNames: { 'value': 'value', 'label': 'label', 'children': 'children' },
      allFields: ['field01', 'field02', 'field03', 'field04', 'field05', 'field06', 'field07'],
      canEditFields: ['field01', 'field02', 'field03', 'field04', 'field05', 'field06', 'field07'],
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
    }
  },
  created () {
    this.formInit()
  },
  methods: {
    formInit () {
      this.allFields.forEach(v => this.form.getFieldDecorator(v)) // 防止表单未注册
      this.form.resetFields()
      /** ==================动态控制哪些字段可以编辑    开始================= */
      // this.disableds字段前缀
      // this.disableds字段前缀
      fieldsCannotEdit(this.disableds, this.allFields)
      fieldsCanEdit(this.disableds, this.canEditFields)
      /** ==================动态控制哪些字段可以编辑    结束================= */

      /** ==================动态控制哪些字段的校验规则    开始================= */
      this.rules.field01 = [ notEmpty, dataLengthValid(0, 20) ]
      this.rules.field02 = [ notEmpty, dataLengthValid(0, 20) ]
      this.rules.field03 = []
      this.rules.field04 = []
      this.rules.field05 = [ notEmpty ]
      this.rules.field07 = [ notEmpty ]
      /** ==================动态控制哪些字段的校验规则    结束================= */

      /** ============初始化下拉框的数据源，以及默认选中项    开始================= */
      this.initDefaultValues()
      this.asyncFormInitApiData()
      this.defaultValues.field07 = moment(1591471447000)
      this.form.setFieldsValue(this.defaultValues)
      /** ============初始化下拉框的数据源，以及默认选中项    结束================= */
    },
    // 初始化默认值
    initDefaultValues () {
      this.defaultValues.field05 = 'STATUS3'
    },
    async asyncFormInitApiData () {
      await new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        resolve(convertSelectData(selectData))
      }).then((data) => {
        this.dataSource.selectDatas = data
      }).catch(err => {
        console.log(err)
      })
      await this.promiseFun().then((data) => {
        this.dataSource.selectDatas = data
      }).catch(err => {
        console.log(err)
      })
      new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        resolve(cascaderSelectData)
      }).then((data) => {
        this.dataSource.cascaderSelectData = data
      }).catch(err => {
        console.log(err)
      })
    },
    promiseFun () {
      return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        resolve(convertSelectData(selectData))
      })
    },
    handleSubmit () {
      this.form.setFieldsValue({
        name: 'name'
      })
      this.loading = true
      const requiredFields = ['name', 'code']
      this.form.validateFields(requiredFields, { force: true }, (err, values) => {
        if (!err) {
          console.log(JSON.stringify(values))
          this.visible = false
          this.loading = false
          const params = { 'key': '44', 'name': '广东省', 'code': '44', 'orderNo': 2 }
          this.$emit('refreshPage', params)
        } else {
          this.loading = false
        }
      })
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
    openFormModal (params) {
      // 清空表单的内容，如果不清空，会存在之前填的内容
      console.log('&&&&&&&&&&&&&&===' + JSON.stringify(params))
      this.form.resetFields()
      this.initDefaultValues()
      this.title = '祥情'
      this.visible = true
      this.loading = false
    },
    handleCancel () {
      this.visible = false
    },
    queryDetail (id) {
      this.resetform()
      this.loading = false
      this.visible = true
      this.title = '详情'
      // this.form.setFieldsValue({ // 不能直接使用 Warning: You cannot set a form field before rendering a field associated with the value. You can use `getFieldDecorator(id, options)` instead `v-decorator="[id, options]"` to register it before render
      //   description01: '设置值设置值设置值'
      // })
      new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据，显示祥情
        // 查询祥情
        resolve({})
      }).then(data => {
        this.$nextTick(() => { // 使用 this.$nextTick 设置控件取值，不能直接设置，否则抛render没加载完，不能初始化
          this.form.setFieldsValue({ 'field05': '设置值设置值设置值' })
          // 初始化
          this.defaultValues.field07 = moment(1591471447000)
          this.form.setFieldsValue(this.defaultValues)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleDelete (id) {
      this.$refs.tableRef.refresh(true)
    },
    handleOk () {
      this.loading = true
      const validateFields = this.allFields
      this.form.validateFields(validateFields, { force: true }, (err, values) => {
        if (!err) {
          const bodyParams = { ...values }
          bodyParams['field07'] = time2Long(bodyParams.field07)
          this.visible = false
          this.loading = false
          this.$emit('refreshPage', bodyParams)
        } else {
          this.loading = false
        }
      })
      // this.visible = false
    },
    resetform () {
      this.formInit()
    }
  }
}
</script>
