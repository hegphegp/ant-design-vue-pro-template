<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48" style="margin-left: -6px; margin-right: -6px;">
          <a-col :lg="6" :md="8" :sm="24" style="padding-left: 6px; padding-right: 6px;">
            <a-form-item label="规则编号" :colon="false">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24" style="padding-left: 6px; padding-right: 6px;">
            <a-form-item label="使用状态" :colon="false">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24" style="padding-left: 6px; padding-right: 6px;">
            <a-form-item label="调用次数" :colon="false">
              <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24" style="padding-left: 6px; padding-right: 6px;">
            <a-form-item label="更新日期" :colon="false">
              <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24" style="padding-left: 6px; padding-right: 6px;">
            <a-form-item label="使用状态" :colon="false">
              <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="8" :sm="24" style="padding-left: 6px; padding-right: 6px;">
            <a-form-item label="使用状态" :colon="false">
              <a-select v-model="queryParam.anotherStatus" showSearch placeholder="请选择">
                <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-button style="margin-bottom: 8px; margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
          <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" icon="plus">新建</a-button>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :showAlert="false"
      :alert="true"
      :rowSelection="rowSelection"
      :pagination="pagination"
      showPagination="auto"
      bordered>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import STable from '@/components/Table'
const columns = [
  { dataIndex: 'name', key: 'name', slots: { title: 'customTitle' }, scopedSlots: { customRender: 'name' } },
  { title: 'Age', dataIndex: 'age', key: 'age', scopedSlots: { customRender: 'age' } },
  { title: 'Address', dataIndex: 'address', key: 'address', scopedSlots: { customRender: 'address' } },
  { title: 'Tags', key: 'tags', dataIndex: 'tags', scopedSlots: { customRender: 'tags' } },
  { title: 'Action', key: 'action', scopedSlots: { customRender: 'action' } }
]

const data = {
  pageSize: 10,
  pageNo: 1,
  totalCount: 5701,
  totalPage: 571,
  data: [
    { key: '0', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '1', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '2', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '4', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '5', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '6', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '7', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '8', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] },
    { key: '9', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', tags: ['cool', 'teacher'] }
  ]
}

export default {
  name: 'TestList',
  components: {
    STable
  },
  data () {
    this.columns = columns
    return {
      pagination: {
        showTotal: total => `共 ${total} 条数据`,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      // 下拉框数据的对象
      selectDatas: [],
      selectDefaultValue: '',
      // confirmLoading: false,
      mdl: null,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log(JSON.stringify(requestParameters))
        data.pageNo = parameter.pageNo
        return new Promise((resolve, reject) => {
          // 1. 模拟一个异步请求，想要将成功的数据发送出去
          // 2. 将成功的数据放在resolve函数中，传递出去
          // setTimeout(() => {
          //   resolve(data)
          // }, 200)
          resolve(data)
        }).then(data => {
          console.log(JSON.stringify(data))
          return data
        }).catch(err => {
          console.log(err)
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  // created 初始从后端加载下拉框数据
  created () {
    this.initSelectDatas()
  },
  // 添加加载下拉框数据的方法
  methods: {
    initSelectDatas () {
      return new Promise((resolve, reject) => {
        // 1. 模拟一个异步请求，想要将成功的数据发送出去
        // 2. 将成功的数据放在resolve函数中，传递出去
        // setTimeout(() => {
        //   resolve(data)
        // }, 200)
        const data = [
          { code: 'ALL', name: '全部' },
          { code: 'STATUS1', name: '状态1' },
          { code: 'STATUS2', name: '状态2' },
          { code: 'STATUS3', name: '状态3' }
        ]
        resolve(data)
      }).then(data => {
        this.selectDefaultValue = 'STATUS2'
        data.forEach((item) => {
          this.selectDatas.push({
            value: item.code,
            text: item.name
          })
        })
        console.log('this.selectDatas===>>>  ' + JSON.stringify(this.selectDatas))
        return data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  }
}
</script>
