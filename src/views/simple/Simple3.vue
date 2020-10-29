<template>
  <a-row :gutter="48" style="margin-left: -6px; margin-right: -6px;">
    <a-col :lg="4" :md="4" :sm="24" style="padding-left: 6px; padding-right: 6px;">
      <a-card :bordered="false">
        <a-tree
          v-model="treeItem.checkedKeys"
          checkable
          defaultExpandAll
          :tree-data="treeItem.treeData"
          @check="onCheck"
          @select="onSelect" />
      </a-card>
    </a-col>

    <a-col :lg="20" :md="20" :sm="24" style="padding-left: 6px; padding-right: 6px;">
      <a-tree-select
        v-model="treeSelect.value"
        style="width: 100%"
        :tree-data="treeSelect.treeSelectData"
        tree-checkable
        :show-checked-strategy="treeSelect.SHOW_PARENT" />
    </a-col>
  </a-row>
</template>
<script>
import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_PARENT

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

const treeSelectData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0'
      }
    ]
  }, {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0'
        // disabled: true
      }, {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1'
      }, {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2'
      }
    ]
  }
]

export default {
  data () {
    return {
      treeItem: {
        checkedKeys: [],
        selectedKeys: [],
        treeData
      },
      treeSelect: {
        value: ['0-0-0'],
        treeSelectData,
        SHOW_PARENT
      }
    }
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
    }
  }
}
</script>
