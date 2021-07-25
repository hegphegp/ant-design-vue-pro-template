<template>
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @cancel="handleCancel" >
    <a-spin :spinning="loading">
      <a-form :form="form" layout="inline">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item> -->
        <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
        <a-form-item label="主键ID" :colon="false">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
        <a-form-item label="名称" :colon="false">
          <a-input v-decorator="['name', rules.name]" />
        </a-form-item>
        <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
        <a-form-item label="编码" :colon="false">
          <a-input v-decorator="['code', rules.code]" />
        </a-form-item>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button type="primary" @click="handleSubmit" :disabled="loading">新增</a-button>
      <a-button type="primary" @click="handleSubmit" :disabled="loading">保存</a-button>
      <a-button type="primary" @click="handleCancel" :disabled="loading">返回</a-button>
    </template>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['name', 'id']

export default {
  data () {
    return {
      visible: false,
      loading: false,
      model: null,
      form: this.$form.createForm(this), // 每个表单页面，都要用 this.$form.createForm(this) 初始化一个form对象吗
      rules: {
        name: {
          rules: [
            { required: true, message: '名称不允许为空' },
            { max: 20, message: '名称长度不能超过20个字符！' }
          ],
          validateTrigger: 'blur'
        },
        code: {
          // initialValue: 0, // 初始值
          rules: [
            { required: true, message: '编码不允许为空' },
            { max: 20, message: '编码长度不能超过20个字符！' }
          ],
          // validateTrigger: 'blur' 是什么意思
          validateTrigger: 'blur'
        }
      }
    }
  },
  created () {
    fields.forEach(v => this.form.getFieldDecorator(v)) // 防止表单未注册
    this.form.resetFields()

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    initDefaultValues () {
      this.form.setFieldsValue({
        name: 'name'
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
    openFormModal (type = 'add') {
      // 清空表单的内容，如果不清空，会存在之前填的内容
      this.form.resetFields()
      this.initDefaultValues()
      this.visible = true
      this.loading = false
    },
    handleCancel () {
      this.visible = false
    },
    handleOk () {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        const params = { 'key': '44', 'name': '广东省', 'code': '44', 'orderNo': 2 }
        this.$emit('refreshPage', params)
      }, 1000)
    },
    refreshPage (params) {
      console.log('modal传参到父控件')
      console.log(params)
    }
  }
}
</script>
