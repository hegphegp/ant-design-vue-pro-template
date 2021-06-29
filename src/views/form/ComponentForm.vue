<!-- 模板页面，下面是标配的功能 -->
<!-- 001) 每个输入框添加回车事件 @pressEnter="pressEnterFun" -->
<!-- 002) 每个输入框，下拉框，多选框添加是否能编辑的控制 :disabled="disabledEdit.field01" ，记住该方式下参数规范的定义方式 -->
<!-- 003) 每个输入框，下拉框，多选框添加值变化的监听 @change="changeFun" -->
<!-- 004) 每个输入框，下拉框，多选框添加v-decorator，方便设置值的校验控制，同时也方便使用 this.form.setFieldsValue({}) 赋值 ，记住该方式下参数规范的定义方式 -->

<!-- a-form表单的一些坑 -->
<!-- 001) a-form不能添加@submit属性，例如 @submit="handleSubmit" ，否则在任意一个输入框回车，都会触发@submit方法，如果用户不留意回车了，就会触发表单提交(用户就检查不了表单数据)，巨坑 -->
<!-- 002) form变量的初始化方式 form: this.$form.createForm(this) ，有多个表单，初始化方式也一样 form01: this.$form.createForm(this)，form02: this.$form.createForm(this)，form03: this.$form.createForm(this)-->
<template>
  <div class="main">
    <!-- @submit="handleSubmit" a-form不能添加@submit属性，否则在任意一个输入框回车，都会触发表单提交，太反人类的设计 -->
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      layout="inline">
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
      <!-- <a-form-item label="选择业务" :colon="false"> -->
      <!-- <a-cascader v-decorator="['bizArray', {rules: [{required: true}]}]" :options="bizSelectData" placeholder="请选择业务" :fieldNames="fieldNames"/> -->
      <!-- </a-form-item> -->
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
          :disabled="disabledEdit.field07" >
          <a-select-option v-for="item in dataSource.selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item style="margin-top: 24px">
        <a-button type="primary" @click="handleSubmit" class="login-button" :disabled="loginBtnDisable">登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { notEmpty, dataMaxLength } from '@/utils/validateUtil'

export default {
  components: {},
  data () {
    this.fieldNames = { 'value': 'value', 'label': 'label', 'children': 'children' }
    return {
      form: this.$form.createForm(this),
      loginBtnDisable: false,
      ValidateRules: {
        field01: [],
        field02: [],
        field03: [notEmpty, dataMaxLength(20)],
        field04: [],
        field05: []
      },
      disabledEdit: { // 设置字段是否可以编辑
        field01: true,
        field02: true,
        field03: false,
        field04: false,
        field05: false
      },
      initialValues: {
        field01: 'value1',
        field02: 'value2',
        field05: 'STATUS2'
      },
      dataSource: {
        selectDatas: []
      }
    }
  },
  // mounted() 与 created() 区别，created()在模板渲染成html前调用，因此 this.addEditForm.setFieldsValue({ selectValue: 'STATUS01' }) 会抛错，只能有 this.$set(this, 'selectValue', 'STATUS01')
  // mounted() 与 created() 区别，created()在模板渲染成html后调用，因此可以使用 this.addEditForm.setFieldsValue({ selectValue: 'STATUS01' })
  mounted () {
    // 设置字段默认值
    this.form.setFieldsValue(this.initialValues)
  },
  created () {
    this.initDefaultValues()
  },
  methods: {
    initDefaultValues () {
      /** ==================动态控制哪些字段可以编辑    开始================= */
      const disabledEditFields = ['field03', 'field04']
      disabledEditFields.forEach((item) => {
        this.disabledEdit[item] = true
      })
      const canEditFields = ['field01', 'field02', 'field03']
      canEditFields.forEach((item) => {
        this.disabledEdit[item] = false
      })
      /** ==================动态控制哪些字段可以编辑    结束================= */

      /** ==================动态控制哪些字段的校验规则    开始================= */
      this.ValidateRules.field01 = [
        notEmpty,
        dataMaxLength(20)
      ]
      this.ValidateRules.field02 = [
        notEmpty,
        dataMaxLength(20)
      ]
      this.ValidateRules.field03 = []
      this.ValidateRules.field04 = []
      this.ValidateRules.field05 = [notEmpty]
      /** ==================动态控制哪些字段的校验规则    结束================= */

      /** ============初始化下拉框的数据源，以及默认选中项    开始================= */
      this.initialValues.field05 = 'STATUS3'
      new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = [ { code: 'STATUS1', name: '状态1' }, { code: 'STATUS2', name: '状态2' }, { code: 'STATUS3', name: '状态3' } ]
        const convertSelectData = []
        data.forEach((item) => {
          convertSelectData.push({ value: item.code, text: item.name })
        })
        resolve(convertSelectData)
      }).then((data) => {
        this.dataSource.selectDatas = data
      }).catch(err => {
        console.log(err)
      })
      console.log(JSON.stringify(this.dataSource.selectDatas))
      /** ============初始化下拉框的数据源，以及默认选中项    结束================= */
    },
    pressEnterFun (event) {
      console.log('==========>>>>>>>>>>>按下回车键<<<<<<<<<<===========')
    },
    changeFun (event) {
      console.log('==========>>>>>>>>>>>值发生改变<<<<<<<<<<===========')
    },
    handleSubmit (e) {
      this.loginBtnDisable = true
      e.preventDefault()
      const requiredFields = ['field01', 'field02', 'field05']
      this.form.validateFields(requiredFields, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          // loginParams.password = md5(values.password)
          this.$store
            .dispatch('Login', loginParams)
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              this.loginBtnDisable = false
            })
        } else {
          this.loginBtnDisable = false
        }
      })
      this.$store.dispatch('GetInfo')
      this.$router.push({ path: '/' })
    },
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 2
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
}
</style>
