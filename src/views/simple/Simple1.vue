<template>
  <a-form-model layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-col :lg="12" :md="12" :sm="24" style="padding-right: 8px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行两列1" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
    <a-col :lg="12" :md="12" :sm="24" style="padding-right: 8px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行两列2" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
    <a-col :lg="8" :md="8" :sm="24" style="padding-right: 8px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行三列1" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
    <a-col :lg="8" :md="8" :sm="24" style="padding-right: 8px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行三列2" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
    <a-col :lg="8" :md="8" :sm="24" style="padding-right: 8px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行三列3" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
    <a-col :lg="6" :md="6" :sm="24" style="padding-right: 8px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行四列1" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
    <a-col :lg="6" :md="6" :sm="24" style="padding-right: 8px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行四列2" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
    <a-col :lg="6" :md="6" :sm="24" style="padding-right: 12px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行四列3" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
    <a-col :lg="6" :md="6" :sm="24" style="padding-right: 12px;">
      <!-- :colon="false"中布尔值变量名前面要加:，否则会将布尔值 true 化为字符串形式，:colon表示是否显示label文字后面的冒号 -->
      <a-form-item label="一行四列4" :colon="false">
        <a-input/>
      </a-form-item>
    </a-col>
  </a-form-model>
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
