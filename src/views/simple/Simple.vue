<template>
  <a-card :bordered="false">
    <!-- rowKey前面没冒号，指定table数据的key字段名称 -->
    <!-- :customRow给table每一行添加点击事件 -->
    <!-- :pagination="false"树形表格的分页被屏蔽了 -->
    <a-table
      ref="table"
      :pagination="false"
      :columns="columns"
      :data-source="data"
      :row-selection="rowSelection"
      :customRow="customRow"
      rowKey="id"
      bordered>
      <span slot="action" slot-scope="text, record">
        <template>
          <a-button type="primary" size="small" @click="queryDetail(record)">详情</a-button>
          <a-button type="dashed" size="small" style="margin-left: 8px;" @click="handleEdit(record)">编辑</a-button>
          <a-button type="danger" size="small" style="margin-left: 8px;" @click="handleDelete(record.id)">删除</a-button>
        </template>
      </span>
    </a-table>
    <CreateForm ref="createModal" @refreshPage="refreshPage"/>
  </a-card>
</template>
<script>
import CreateForm from './components/CreateForm'

const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '编码', dataIndex: 'code', wkeyth: '12%' },
  { title: '操作', scopedSlots: { customRender: 'action' } }
]

const data = [{ id: '44', name: '广东省', code: '44', orderNo: 2, children: [{ id: '4403', name: '深圳市', code: '4403', orderNo: 2, parentId: '44', children: [{ id: '440306', name: '宝安区', code: '440306', orderNo: 2, parentId: '4403', children: [{ id: '440306006', name: '石岩街道', code: '440306006', orderNo: 1, parentId: '440306', children: [{ id: '440306006007', name: '塘头社区', code: '440306006007', orderNo: 1, parentId: '440306006', hasChild: false }, { id: '440306006008', name: '应人石社区', code: '440306006008', orderNo: 2, parentId: '440306006', hasChild: false }, { id: '440306006009', name: '石龙社区', code: '440306006009', orderNo: 3, parentId: '440306006', hasChild: false }, { id: '440306006010', name: '石岩龙腾社区', code: '440306006010', orderNo: 4, parentId: '440306006', hasChild: false }, { id: '440306006001', name: '官田社区', code: '440306006001', orderNo: 120, parentId: '440306006', hasChild: false }, { id: '440306006002', name: '浪心社区', code: '440306006002', orderNo: 121, parentId: '440306006', hasChild: false }, { id: '440306006003', name: '罗租社区', code: '440306006003', orderNo: 122, parentId: '440306006', hasChild: false }, { id: '440306006004', name: '上屋社区', code: '440306006004', orderNo: 123, parentId: '440306006', hasChild: false }, { id: '440306006006', name: '水田社区', code: '440306006006', orderNo: 124, parentId: '440306006', hasChild: false }, { id: '440306006011', name: '宝源社区', code: '440306006011', orderNo: 135, parentId: '440306006', hasChild: false }], hasChild: true }, { id: '440306011', name: '新安街道', code: '440306011', orderNo: 2, parentId: '440306', children: [{ id: '440306011001', name: '安乐社区', code: '440306011001', orderNo: 5, parentId: '440306011', hasChild: false }, { id: '440306011002', name: '宝民社区', code: '440306011002', orderNo: 6, parentId: '440306011', hasChild: false }, { id: '440306011003', name: '布心社区', code: '440306011003', orderNo: 7, parentId: '440306011', hasChild: false }, { id: '440306011004', name: '大浪社区', code: '440306011004', orderNo: 8, parentId: '440306011', hasChild: false }, { id: '440306011005', name: '翻身社区', code: '440306011005', orderNo: 9, parentId: '440306011', hasChild: false }, { id: '440306011006', name: '海富社区', code: '440306011006', orderNo: 10, parentId: '440306011', hasChild: false }, { id: '440306011007', name: '海华社区', code: '440306011007', orderNo: 11, parentId: '440306011', hasChild: false }, { id: '440306011008', name: '海乐社区', code: '440306011008', orderNo: 12, parentId: '440306011', hasChild: false }, { id: '440306011009', name: '海旺社区', code: '440306011009', orderNo: 13, parentId: '440306011', hasChild: false }, { id: '440306011010', name: '海裕社区', code: '440306011010', orderNo: 14, parentId: '440306011', hasChild: false }, { id: '440306011011', name: '洪浪社区', code: '440306011011', orderNo: 15, parentId: '440306011', hasChild: false }, { id: '440306011012', name: '甲岸社区', code: '440306011012', orderNo: 16, parentId: '440306011', hasChild: false }, { id: '440306011013', name: '建安社区', code: '440306011013', orderNo: 17, parentId: '440306011', hasChild: false }, { id: '440306011014', name: '灵芝园社区', code: '440306011014', orderNo: 18, parentId: '440306011', hasChild: false }, { id: '440306011015', name: '龙井社区', code: '440306011015', orderNo: 19, parentId: '440306011', hasChild: false }, { id: '440306011016', name: '上川社区', code: '440306011016', orderNo: 20, parentId: '440306011', hasChild: false }, { id: '440306011017', name: '上合社区', code: '440306011017', orderNo: 21, parentId: '440306011', hasChild: false }, { id: '440306011018', name: '文汇社区', code: '440306011018', orderNo: 22, parentId: '440306011', hasChild: false }, { id: '440306011019', name: '文雅社区', code: '440306011019', orderNo: 23, parentId: '440306011', hasChild: false }, { id: '440306011020', name: '新安湖社区', code: '440306011020', orderNo: 24, parentId: '440306011', hasChild: false }, { id: '440306011021', name: '新乐社区', code: '440306011021', orderNo: 25, parentId: '440306011', hasChild: false }, { id: '440306011022', name: '兴东社区', code: '440306011022', orderNo: 26, parentId: '440306011', hasChild: false }], hasChild: true }], hasChild: true }, { id: '440309', name: '光明区', code: '440311', orderNo: 136, parentId: '4403', hasChild: false }], hasChild: true }], hasChild: true }]

export default {
  components: {
    CreateForm
  },
  data () {
    return {
      data: data,
      columns,
      selectedRowKeys: [],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          var selectedRowKeysTemp = []
          for (var i = 0; i < selectedRows.length; i++) {
            // selectedRowKeysTemp.push(selectedRows[i].key) // 已手动设置table的rowKey="id"，此时不能用selectedRows[i].key，要用selectedRows[i].id
            selectedRowKeysTemp.push(selectedRows[i].id)
          }
          this.selectedRowKeys = selectedRowKeysTemp
          console.log('选中行的ID===>>>>' + JSON.stringify(this.selectedRowKeys))
        },
        onSelect: (record, selected, selectedRows) => {
          console.log('触发了====>>>>onSelect()')
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log('触发了====>>>>onSelectAll()')
        }
      },
      customRow (record, index) { // 自定义行
          return {
            on: { // 鼠标单击行
              click: (e) => {
                console.log('这一行数据的ID====>>>>>>' + record.id)
                const oldList = document.querySelectorAll('.checked-td-of-add-table')
                if (oldList) {
                    for (let j = 0; j < oldList.length; j++) {
                        oldList[j].classList.remove('checked-td-of-add-table')
                    }
                }

                const children = e.target.parentNode.children
                for (let i = 0; i < children.length; i++) {
                    children[i].classList.add('checked-td-of-add-table')
                }
              },
              dblclick: (e) => {

              },
              contextMenu: (e) => {

              },
              mouseenter: (e) => {

              },
              mouseleave: (e) => {

              }
            }
          }
        }
    }
  },
  methods: {
    handleAdd () {
      this.$refs.createModal.openFormModal('add')
    },
    queryDetail (record) {
      this.$refs.createModal.openFormModal('detail')
    },
    handleEdit (record) {
      this.$refs.createModal.openFormModal('edit')
    },
    handleDelete (id) {
      console.log(id)
    },
    refreshPage (params) {
      console.log('modal传参到父控件')
      console.log(params)
      setTimeout(() => {
        const item = {
          key: new Date().getTime(),
          id: new Date().getTime(),
          name: '人名',
          age: 32,
          address: '地址'
        }
        this.data.push(item)
        // this.data = [...data, item]
        console.log('Simple.vue refreshPage()')
      }, 1000)
    }
  }
}
</script>
