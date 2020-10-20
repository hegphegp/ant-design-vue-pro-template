<template>
  <div class="ant-form-item-inline-config">
    <a-form-model layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行两列1一行两列1一行两列1">
          <a-input/>
        </a-form-item>
      </a-col>
      <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行两列2">
          <a-input/>
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="8" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行三列1">
          <a-input/>
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="8" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行三列2">
          <a-input/>
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="8" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行三列3">
          <a-input/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行四列1">
          <a-input/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行四列2">
          <a-input/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行四列3">
          <a-input/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-right: 12px;">
        <a-form-item label="一行四列4">
          <a-input/>
        </a-form-item>
      </a-col>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      formInline: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit (e) {
      console.log(this.formInline)
    }
  }
}
</script>
