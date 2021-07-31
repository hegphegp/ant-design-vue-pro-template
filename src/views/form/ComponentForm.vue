<!-- 模板页面，下面是标配的功能 -->
<!-- 001) 每个输入框添加回车事件 @pressEnter="pressEnterFun" -->
<!-- 002) 每个输入框，下拉框，多选框添加是否能编辑的控制 :disabled="disabledEdit.field01" ，记住该方式下参数规范的定义方式 -->
<!-- 003) 每个输入框，下拉框，多选框添加值变化的监听 @change="changeFun" -->
<!-- 004) 每个输入框，下拉框，多选框添加v-decorator，方便设置值的校验控制，同时也方便使用 this.form001.setFieldsValue({}) 赋值 ，记住该方式下参数规范的定义方式 -->
<!-- 005) 变量定义规范，ValidateRules放所有字段校验，disabledEdit放所有控件，dataSource放下拉框，多选框数据源 -->

<!-- a-form表单的一些坑 -->
<!-- 001) a-form不能添加@submit属性，例如 @submit="handleSubmit" ，否则在任意一个输入框回车，都会触发@submit方法，如果用户不留意回车了，就会触发表单提交(用户就检查不了表单数据)，巨坑 -->
<!-- 002) form变量的初始化方式 form001: this.$form.createForm(this) ，有多个表单，初始化方式也一样 form001: this.$form.createForm(this) form002: this.$form.createForm(this)，form003: this.$form.createForm(this)-->
<template>
  <div class="main">
    <!-- @submit="handleSubmit" a-form不能添加@submit属性，否则在任意一个输入框回车，都会触发表单提交，太反人类的设计 -->
    <a-form class="user-layout-login" :form="form001" layout="inline">
      <a-form-item>
        <!-- @pressEnter="queryData"回车查询，queryData(event)函数在定义时有个event参数。 -->
        <a-input type="text" v-decorator="['field01', { rules: ValidateRules.field01 } ]" :disabled="disabledEdit.field01" @pressEnter="pressEnterFun" @change="changeFun"/>
      </a-form-item>
      <a-form-item>
        <a-input type="text" v-decorator="['field02', { rules: ValidateRules.field02 }]" :disabled="disabledEdit.field02" @pressEnter="pressEnterFun" @change="changeFun"/>
      </a-form-item>
      <a-form-item>
        <a-input type="text" v-decorator="['field03', { rules: ValidateRules.field03 }]" :disabled="disabledEdit.field03" @pressEnter="pressEnterFun" @change="changeFun"/>
      </a-form-item>
      <a-form-item>
        <a-input type="text" v-decorator="['field04', { rules: ValidateRules.field04 }]" :disabled="disabledEdit.field04" @pressEnter="pressEnterFun" @change="changeFun"/>
      </a-form-item>
      <!-- Warning: `getFieldDecorator` will override `value`, so please don't set `value and v-model` directly and use `setFieldsValue` to set it. -->
      <!-- v-decorator 不能和v-model一起用，因为表单要用v-decorator做必填校验，因此不能用v-model，真是无奈的绝望 -->
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="下拉框默认值" :colon="false">
        <!-- a-select下拉框没有@pressEnter事件 -->
        <a-select
          allowClear
          showSearch
          placeholder="请选择"
          v-decorator="['field05', { rules: ValidateRules.field05 }]"
          @pressEnter="pressEnterFun"
          @change="changeFun"
          :disabled="disabledEdit.field05" >
          <a-select-option v-for="item in dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="选择业务" :colon="false">
        <a-cascader v-decorator="['field06', { rules: ValidateRules.field06 }]" :options="dataSource.bizSelectData" placeholder="请选择业务" :fieldNames="fieldNames" @change="cascaderChange"/>
      </a-form-item>
      <a-form-item style="margin-top: 24px">
        <a-button type="primary" @click="handleSubmit" class="login-button" :disabled="loginBtnDisable">登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { notEmpty, dataLengthValid, setFieldsCanEdit, setFieldsCannotEdit } from '@/utils/common'
import { cascaderSelectData, selectData } from '@/data'

export default {
  components: {},
  data () {
    return {
      fieldNames: { 'value': 'value', 'label': 'label', 'children': 'children' },
      form001: this.$form.createForm(this),
      loginBtnDisable: false,
      ValidateRules: {
        field01: [],
        field02: [],
        field03: [notEmpty, dataLengthValid(0, 20)],
        field04: [],
        field05: [],
        field06: [notEmpty]
      },
      disabledEdit: { // 设置字段是否可以编辑
        field01: true,
        field02: true,
        field03: false,
        field04: false,
        field05: false,
        field06: false
      },
      // 每个字段的初始值
      initialValues: {
        field01: 'value1',
        field02: 'value2',
        field05: 'STATUS2',
        field06: ['zhejiang', 'hangzhou', 'xihu']
      },
      // 定义下拉框，多选框的数据源
      dataSource: {
        selectDatas: [],
        bizSelectData: cascaderSelectData
      }
    }
  },
  // this.form001.setFieldsValue({ bank_province: [this.record.bank_province, this.record.bank_city] })
  // mounted() 与 created() 区别，created()在模板渲染成html前调用，因此 this.addEditForm.setFieldsValue({ selectValue: 'STATUS01' }) 会抛错，只能有 this.$set(this, 'selectValue', 'STATUS01')
  // mounted() 与 created() 区别，created()在模板渲染成html后调用，因此可以使用 this.addEditForm.setFieldsValue({ selectValue: 'STATUS01' })
  mounted () {
    // 设置字段默认值
    this.form001.setFieldsValue(this.initialValues)
  },
  created () {
    this.initDefaultValues()
  },
  methods: {
    initDefaultValues () {
      /** ==================动态控制哪些字段可以编辑    开始================= */
      const allFields = ['field01', 'field02', 'field03', 'field04', 'field05', 'field06']
      setFieldsCannotEdit(this.disabledEdit, allFields)
      const canEditFields = ['field01', 'field02', 'field03', 'field04', 'field06']
      setFieldsCanEdit(this.disabledEdit, canEditFields)
      /** ==================动态控制哪些字段可以编辑    结束================= */

      /** ==================动态控制哪些字段的校验规则    开始================= */
      this.ValidateRules.field01 = [ notEmpty, dataLengthValid(0, 20) ]
      this.ValidateRules.field02 = [ notEmpty, dataLengthValid(0, 20) ]
      this.ValidateRules.field03 = []
      this.ValidateRules.field04 = []
      this.ValidateRules.field05 = [notEmpty]
      /** ==================动态控制哪些字段的校验规则    结束================= */

      /** ============初始化下拉框的数据源，以及默认选中项    开始================= */
      this.initialValues.field05 = 'STATUS3'
      this.asyncInitApiData()
      console.log(JSON.stringify(this.dataSource.selectDatas))
      /** ============初始化下拉框的数据源，以及默认选中项    结束================= */
    },
    async asyncInitApiData () {
      await new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = selectData
        const convertSelectData = []
        data.forEach((item) => {
          convertSelectData.push({ value: item.code, text: item.name })
        })
        resolve(convertSelectData)
      }).then((data) => {
        console.log('0000000000000000000')
        this.dataSource.selectDatas = data
      }).catch(err => {
        console.log(err)
      })
      await this.promiseFun().then((data) => {
        console.log('1111111111111111111111')
        this.dataSource.selectDatas = data
      }).catch(err => {
        console.log(err)
      })
      console.log('2222222222222222222222222222')
    },
    promiseFun () {
      return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = selectData
        const convertSelectData = []
        data.forEach((item) => {
          convertSelectData.push({ value: item.code, text: item.name })
        })
        resolve(convertSelectData)
      })
    },
    handleSubmit (e) {
      this.loginBtnDisable = true
      e.preventDefault()
      // 遍历 ValidateRules 对象，获取value非空的key，表示这些key都要校验
      const requiredFields = ['field01', 'field02', 'field06']
      this.form001.validateFields(requiredFields, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          this.$store
            .dispatch('Login', loginParams)
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              this.loginBtnDisable = false
            })
          this.loginBtnDisable = false
        } else {
          this.loginBtnDisable = false
        }
      })
      this.$store.dispatch('GetInfo')
      console.log('在this.$store.dispatch("GetInfo")后面')
      // this.$router.push({ path: '/' })
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 2
      })
    },
    // 很少用到的功能
    pressEnterFun (event) {
      console.log('==========>>>>>>>>>>>按下回车键<<<<<<<<<<===========')
    },
    changeFun (event) {
      console.log('==========>>>>>>>>>>>值发生改变<<<<<<<<<<===========')
    },
    cascaderChange (value) {
      console.log(value)
    }
  }
}
</script>
