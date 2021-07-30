<template>
  <a-modal :title="title" :width="1080" :visible="visible" @cancel="handleCancel" :confirmLoading="loading">
    <a-spin :spinning="loading">
      <a-form :form="form" layout="inline">
        <a-row>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="fields.field01.itemShow" style="padding-right: 12px;">
            <a-form-item label="描述" :colon="false">
              <a-input v-decorator="['field01', { rules: fields.field01.rules }]" :disabled="fields.field01.disabled" @pressEnter="pressEnterFun" @change="changeFun"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="fields.field02.itemShow" style="padding-right: 12px;">
            <a-form-item label="下拉框默认值" :colon="false">
              <a-select v-decorator="['field02', { rules: fields.field02.rules }]" allowClear showSearch placeholder="请选择" :disabled="fields.field02.disabled" @change="changeFun">
                <a-select-option v-for="item in dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="fields.field03.itemShow" style="padding-right: 12px;">
            <a-form-item label="规则编号" :colon="false">
              <a-input placeholder="" v-decorator="['field03', { rules: fields.field03.rules }]" :disabled="fields.field03.disabled" @pressEnter="pressEnterFun" @change="changeFun"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="fields.field04.itemShow" style="padding-right: 12px;">
            <a-form-item label="描述" :colon="false">
              <a-input v-decorator="['field04', {rules: fields.field04.rules }]" :disabled="fields.field04.disabled" @pressEnter="pressEnterFun" @change="changeFun"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="fields.field05.itemShow" style="padding-right: 12px;">
            <a-form-item label="下拉框默认值" :colon="false">
              <!-- a-select下拉框没有@pressEnter事件 -->
              <a-select allowClear showSearch placeholder="请选择" v-decorator="['field05', { rules: fields.field05.rules }]" @change="changeFun" :disabled="fields.field05.disabled" >
                <a-select-option v-for="item in dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="fields.field06.itemShow" style="padding-right: 12px;">
            <a-form-item label="选择业务" :colon="false">
              <a-cascader v-decorator="['field06', { rules: fields.field06.rules }]" :options="dataSource.cascaderSelectData" :fieldNames="fieldNames" @change="cascaderChange" :disabled="fields.field06.disabled" placeholder="请选择"/>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24" :xs="24" v-show="fields.field07.itemShow" style="padding-right: 12px;">
            <a-form-item label="年月日时分秒" :colon="false">
              <a-date-picker v-decorator="['field07', {rules: fields.field07.rules }]" style="width: 100%" :disabled="fields.field07.disabled" @pressEnter="pressEnterFun" @change="changeFun"/>
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
import { notEmpty, dataLengthValid, fieldsCanEdit, fieldsCannotEdit, clearFieldsValues, convertSelectData, time2Long } from '@/utils/common'

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
      fields: {
        field01: { itemShow: true, disabled: false, defaultValue: null, rules: [notEmpty, dataLengthValid(0, 20)] },
        field02: { itemShow: true, disabled: false, defaultValue: null, rules: [notEmpty] },
        field03: { itemShow: true, disabled: false, defaultValue: null, rules: [] },
        field04: { itemShow: true, disabled: false, defaultValue: null, rules: [] },
        field05: { itemShow: true, disabled: false, defaultValue: null, rules: [] },
        field06: { itemShow: true, disabled: false, defaultValue: null, rules: [] },
        field07: { itemShow: true, disabled: false, defaultValue: null, rules: [] }
      },
      defaultValues: {

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
    openModel (params) {
      // 清空表单的内容，如果不清空，会存在之前填的内容
      this.form.resetFields()
      this.initDefaultValues()
      this.title = params.formTitle
      this.visible = true
      this.loading = false
    },
    formInit () {
      this.allFields.forEach(v => this.form.getFieldDecorator(v)) // 防止表单未注册
      this.form.resetFields()
      /** ==================动态控制哪些字段可以编辑    开始================= */
      // this.disableds字段前缀
      // this.disableds字段前缀
      fieldsCannotEdit(this.fields, this.allFields)
      fieldsCanEdit(this.fields, this.canEditFields)
      /** ==================动态控制哪些字段可以编辑    结束================= */

      /** ==================动态控制哪些字段的校验规则    开始================= */
      this.fields.field01.rules = [ notEmpty, dataLengthValid(0, 20) ]
      this.fields.field02.rules = [ notEmpty, dataLengthValid(0, 20) ]
      this.fields.field03.rules = []
      this.fields.field04.rules = []
      this.fields.field05.rules = [ notEmpty ]
      this.fields.field06.rules = [ notEmpty ]
      this.fields.field07.rules = [ notEmpty ]
      /** ==================动态控制哪些字段的校验规则    结束================= */

      /** ============初始化下拉框的数据源，以及默认选中项    开始================= */
      this.initDefaultValues()
      this.asyncFormInitApiData()
      this.defaultValues.field07 = moment(1591471447000)
      console.log(JSON.stringify(this.defaultValues))
      this.form.setFieldsValue(this.defaultValues)
      /** ============初始化下拉框的数据源，以及默认选中项    结束================= */
    },
    // 初始化默认值
    initDefaultValues () {
      this.defaultValues.field01 = '默认值'
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
      this.loading = true
      const requiredFields = ['field01', 'field02']
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
      this.form.resetFields()
      this.title = params.formTitle
      this.visible = true
      this.loading = false
      clearFieldsValues(this.defaultValues, this.allFields)
      if (params.formType === 'add') {
        this.initDefaultValues()
      } else if (params.formType === 'edit') {

      } else if (params.formType === 'detail') {

      }
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
