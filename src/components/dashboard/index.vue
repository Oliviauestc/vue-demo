/*
 * @Author: wqy 
 * @Date: 2019-04-09 09:52:06 
 * @Last Modified by: wqy
 * @Last Modified time: 2019-04-22 11:50:48
 */
<template>
  <div>
    主页<router-link to="/login">Go to login</router-link>
    <el-select v-model="value" placeholder="请选择" clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column
        prop="date"
        label="日期"
        :sortable="isSortable"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getPreAppsDisplay } from '@/api/login'

export default {
  name: 'mockTest',
  components: { Treeselect },
  data () {
    return {
      options: [{
        value: 1,
        label: '黄金糕'
      }, {
        value: 2,
        label: '双皮奶'
      }],
      value: '',
      isSortable: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let id = Math.round(Math.random() * 10)
      getPreAppsDisplay(id).then(res => {
        console.log(res)
      })
    }
  },
  watch: {
    value (val) {
      if (val === '') {
        this.isSortable = false
      } else {
        this.isSortable = true
      }
    }
  }
}
</script>
