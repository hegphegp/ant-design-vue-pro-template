<template>
  <a-card :bordered="false">
    <a-form layout="inline">
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="规则规则编号" :colon="false">
          <a-input v-model="queryParam.id" placeholder=""/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="使用状态" :colon="false">
          <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">关闭</a-select-option>
            <a-select-option value="2">运行中</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="调用次数" :colon="false">
          <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日" :colon="false">
          <a-date-picker v-model="queryParam.yearMonthDay" style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日时分秒" :colon="false">
          <a-date-picker v-model="queryParam.yyyyMMddHHmmss" format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日时分秒" :colon="false">
          <a-date-picker
            v-model="queryParam.yyyyMMddHHmmss1"
            style="width: 100%"
            placeholder="请输入更新日期"
            format="YYYY-MM-DD HH:mm:ss"
            show-time
            :disabled-date="disabledDate"
            :disabled-time="disabledRangeTime"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日" :colon="false">
          <a-date-picker v-model="queryParam.dateValue" style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月日时分秒" :colon="false">
          <a-date-picker v-model="queryParam.dateValue" format="YYYY-MM-DD HH:mm:ss" show-time style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="年月" :colon="false">
          <a-month-picker v-model="queryParam.yearMonth" style="width: 100%" placeholder="请输入更新日期"/>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="使用状态" :colon="false">
          <a-select v-model="queryParam.useStatus" placeholder="请选择" mode="multiple" allowClear>
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">关闭</a-select-option>
            <a-select-option value="2">运行中</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :lg="6" :md="6" :sm="24" style="padding-left: 6px; padding-right: 6px;">
        <a-form-item label="下拉框默认值" :colon="false">
          <a-select v-model="queryParam.selectValue" showSearch placeholder="请选择" allowClear>
            <a-select-option v-for="item in selectDatas" :key="item.value" :value="item.value"> {{ item.text }} </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-button style="margin-bottom: 8px; margin-left: 8px" @click="resetQueryParams()">重置</a-button>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
      <a-button style="margin-bottom: 8px; margin-left: 8px" type="primary" icon="plus" @click="handleAdd()">新建</a-button>
    </a-form>

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
      bordered>
      <span slot="tags" slot-scope="text, record">
        <template>
          <span v-for="(item, i) in record.tags" :key="i">
            <span v-if="item == 'cool'">
              <a-button size="small" type="primary">cool</a-button>
            </span>
            <span v-if="item == 'teacher'">
              <a :href="'https://www.baidu.com'" target="_blank">百度</a>
            </span>
          </span>
        </template>
        {{ record.tags }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="queryDetail(record.id)">详情</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record.id)">删除</a>
        </template>
      </span>
    </s-table>

    <template>
      <a-modal
        :title="addEditFormTitle"
        :width="1080"
        :visible="addEditFormVisible"
        @cancel="handleCancel" >
        <div class="ant-form-item-config">
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
            </a-row>
          </a-form>
        </div>
        <template slot="footer">
          <a-button type="primary" @click="handleOk">新增</a-button>
          <a-button type="primary" @click="handleOk">保存</a-button>
          <a-button type="primary" @click="handleCancel">返回</a-button>
        </template>
      </a-modal>
    </template>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import STable from '@/components/Table'
import moment from 'moment'

// 表单字段
const fields = ['description', 'id']

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
  { title: '标签', dataIndex: 'tags', scopedSlots: { customRender: 'tags' } },
  { title: '操作', scopedSlots: { customRender: 'action' } }
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
      addEditForm: this.$form.createForm(this),
      addEditFormVisible: false,
      addEditFormTitle: '',
      pagination: {
        showTotal: total => `共 ${total} 条数据`,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      selectDefaultValue: null,
      defaultSearchTimeValue: null,
      selectDatas: [], // 下拉框数据的对象
      mdl: null,
      queryParam: {}, // 查询参数
      loadData: parameter => { // 加载数据方法 必须为 Promise 对象
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log(JSON.stringify(requestParameters))
        // if (this.queryParam.yearMonthDay != null && this.queryParam.yearMonthDay !== undefined) {
        //   console.log(this.queryParam.yearMonthDay.valueOf())
        // }

        data.pageNo = parameter.pageNo
        return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
          resolve(data)
        }).then(data => { // console.log(JSON.stringify(data))
          return data
        }).catch(err => {
          console.log(err)
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () { // created 初始从后端加载下拉框数据
    this.initDefaultValues()
    fields.forEach(v => this.addEditForm.getFieldDecorator(v)) // 防止表单未注册

    this.$watch('queryParam', () => { // 当 queryParam 发生改变时，为表单设置值
      this.queryParam && this.addEditForm.setFieldsValue(pick(this.queryParam, fields))
    })
  },
  methods: { // 添加加载下拉框数据的方法
    disabledDate (current) {
      const yesterday = moment(new Date()).add(-1, 'days') // 限制不允许选择昨天
      return current && current < yesterday // return false
    },
    disabledRangeTime () {
      return {
        disabledHours: () => [-1, 24],
        disabledMinutes: () => [-1, 60],
        disabledSeconds: () => [-1, 60]
      }
    },
    async initDefaultValues () {
      this.defaultSearchTimeValue = 1596471447000
      if (this.defaultSearchTimeValue != null && this.defaultSearchTimeValue !== undefined) {
        this.$set(this.queryParam, 'dateValue', moment(this.defaultSearchTimeValue))
        // this.addEditForm.setFieldsValue({
        //   dateValue: moment(this.defaultSearchTimeValue)
        // })
      }
      await this.initSelectDatas()
    },
    initSelectDatas () {
      return new Promise((resolve, reject) => { // 模拟一个异步请求，异步返回数据
        const data = [ { code: 'ALL', name: '全部' }, { code: 'STATUS1', name: '状态1' }, { code: 'STATUS2', name: '状态2' }, { code: 'STATUS3', name: '状态3' } ]
        data.forEach((item) => {
          this.selectDatas.push({ value: item.code, text: item.name })
        })
        this.selectDefaultValue = 'STATUS1'
        // this.queryParam.selectValue = this.selectDefaultValue
        this.$set(this.queryParam, 'selectValue', this.selectDefaultValue)
        resolve(data)
      }).catch(err => {
        console.log(err)
      })
    },
    handleAdd () {
      this.addEditFormVisible = true
      this.addEditFormTitle = '新增'
    },
    handleCancel () {
      this.addEditFormVisible = false
    },
    handleEdit () {
      this.addEditFormVisible = true
      this.addEditFormTitle = '编辑'
    },
    queryDetail (id) {
      this.addEditFormVisible = true
      this.addEditFormTitle = '详情'
    },
    handleDelete (id) {

    },
    handleOk () {
      this.addEditFormVisible = false
    },
    resetQueryParams () {
      this.queryParam = {}
      if (this.selectDefaultValue != null && this.selectDefaultValue !== undefined) {
        this.$set(this.queryParam, 'selectValue', this.selectDefaultValue)
      }
      if (this.defaultSearchTimeValue != null && this.defaultSearchTimeValue !== undefined) {
        this.$set(this.queryParam, 'dateValue', moment(this.defaultSearchTimeValue))
      }
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
