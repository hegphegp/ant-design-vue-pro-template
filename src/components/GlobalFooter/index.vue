<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.baidu.com" target="_blank">链接一</a>
      <a href="https://www.baidu.com" target="_blank">链接二</a>
      <a href="https://www.baidu.com" target="_blank">链接三</a>
    </template>
    <template v-slot:copyright>
      <a href="https://www.baidu.com" style="margin-right: 40px;" target="_blank">链接一</a>
      <a href="https://www.baidu.com" style="margin-right: 40px;" target="_blank">链接二</a>
      <a href="https://www.baidu.com" target="_blank">链接三</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
