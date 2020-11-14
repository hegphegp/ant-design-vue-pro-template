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
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button type="primary" @click="handleOk" :disabled="loading">新增</a-button>
      <a-button type="primary" @click="handleOk" :disabled="loading">保存</a-button>
      <a-button type="primary" @click="handleCancel" :disabled="loading">返回</a-button>
    </template>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['description', 'id']

export default {
  data () {
    return {
      visible: false,
      loading: false,
      model: null,
      form: this.$form.createForm(this),
      pagination: {
        showTotal: total => `共 ${total} 条数据`,
        pageSizeOptions: ['10', '20', '50', '100']
      }
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    openFormModal (type = 'add') {
      this.visible = true
    },
    handleCancel () {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
        const params = { 'key': '44', 'name': '广东省', 'code': '44', 'orderNo': 2 }
        this.$emit('refreshPage', params)
      }, 1000)
    },
    handleOk () {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
        const params = { 'key': '44', 'name': '广东省', 'code': '44', 'orderNo': 2 }
        this.$emit('refreshPage', params)
      }, 1000)
    }
  }
}
</script>
