<template>
  <a-row :gutter="48" style="margin-left: -6px; margin-right: -6px;">
    <a-col :lg="4" :md="4" :sm="24" style="padding-left: 6px; padding-right: 6px;">
      <a-card :bordered="false">
        <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary">新增</a-button>
        <a-button style="margin-bottom: 8px; margin-left: 8px" type="danger">删除</a-button>
        <a-tree
          v-model="treeItem.checkedKeys"
          checkable
          defaultExpandAll
          :checkStrictly="true"
          :default-selected-keys="treeItem.defaultSelectedKeys"
          :tree-data="treeItem.treeData"
          @check="onCheck"
          @select="onSelect" />
      </a-card>
    </a-col>

    <a-col :lg="20" :md="20" :sm="24" style="padding-left: 6px; padding-right: 6px;">
      <a-card :bordered="false">
        <a-form :form="addEditForm" layout="inline">
          <a-row>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="描述">
                <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="下拉框默认值" :colon="false">
                <a-select v-model="queryParam.selectValue" showSearch placeholder="请选择">
                  <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24" style="padding-right: 12px;">
              <a-form-item label="规则编号" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="描述">
                <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="下拉框默认值" :colon="false">
                <a-select v-model="queryParam.selectValue" showSearch placeholder="请选择">
                  <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24" style="padding-right: 12px;">
              <a-form-item label="规则编号" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="描述">
                <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="下拉框默认值" :colon="false">
                <a-select v-model="queryParam.selectValue" showSearch placeholder="请选择">
                  <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24" style="padding-right: 12px;">
              <a-form-item label="规则编号" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="描述">
                <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="下拉框默认值" :colon="false">
                <a-select v-model="queryParam.selectValue" showSearch placeholder="请选择">
                  <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24" style="padding-right: 12px;">
              <a-form-item label="规则编号" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="描述">
                <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="下拉框默认值" :colon="false">
                <a-select v-model="queryParam.selectValue" showSearch placeholder="请选择">
                  <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24" style="padding-right: 12px;">
              <a-form-item label="规则编号" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="描述">
                <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="下拉框默认值" :colon="false">
                <a-select v-model="queryParam.selectValue" showSearch placeholder="请选择">
                  <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24" style="padding-right: 12px;">
              <a-form-item label="规则编号" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="描述">
                <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="下拉框默认值" :colon="false">
                <a-select v-model="queryParam.selectValue" showSearch placeholder="请选择">
                  <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" :xs="24" style="padding-right: 12px;">
              <a-form-item label="规则编号" :colon="false">
                <a-input placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24" style="padding-right: 12px;">
              <a-form-item label="描述">
                <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item style="margin-top: 24px;     text-align: center;">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button">登陆</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      }, {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' }
        ]
      }, {
        title: '0-0-2',
        key: '0-0-2',
        children: []
      }
    ]
  }, {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' }
    ]
  }, {
    title: '0-2',
    key: '0-2'
  }
]

export default {
  data () {
    return {
      addEditForm: this.$form.createForm(this),
      queryParam: {
        selectValue: ''
      },
      selectDatas: [], // 下拉框数据的对象
      treeItem: {
        checkedKeys: [],
        selectedKeys: [],
        defaultSelectedKeys: [], // 设置默认选中的选项，例如左树右表的情况
        treeData
      }
    }
  },
  created () {
    this.initSelectDatas()
    this.treeItem.defaultSelectedKeys.push(this.treeItem.treeData[0].key)
  },
  methods: {
    onCheck (checkedKeys) { // 点击选项前的复选框
      console.log('onCheck', checkedKeys)
      this.treeItem.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) { // 点击选项
      console.log('onSelect', info)
      console.log(selectedKeys)
      this.treeItem.selectedKeys = selectedKeys
    },
    initSelectDatas () {
      return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = [ { code: 'ALL', name: '全部' }, { code: 'STATUS1', name: '状态1' }, { code: 'STATUS2', name: '状态2' }, { code: 'STATUS3', name: '状态3' } ]
        resolve(data)
      }).then(data => {
        data.forEach((item) => {
          this.selectDatas.push({ value: item.code, text: item.name })
        })
        this.selectDefaultValue = 'STATUS2'
        this.queryParam.selectValue = this.selectDefaultValue
        // this.$set(this.queryParam, 'selectValue', this.selectDefaultValue)
        return data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
/deep/.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: #1890ff;
}
</style>
