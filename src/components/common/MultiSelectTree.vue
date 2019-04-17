/*
 * @Author: wqy 
 * @Date: 2019-03-07 09:43:33 
 * @Last Modified by: wqy
 * @Last Modified time: 2019-03-18 14:12:39
 */
 <!-- 树状多选器 -->
<template>
  <el-popover
    ref="popover"
    placement="bottom-start"
    trigger="click"
    class="select-tree scrollbar"
    @show="onShowPopover"
    @hide="onHidePopover">
    <el-tree
      ref="tree"
      highlight-current
      :style="`min-width: ${treeWidth}`"
      :data="data"
      :props="props"
      node-key="value"
      show-checkbox
      @check-change="onCheckNode">
    </el-tree>
    <el-input
      slot="reference"
      ref="input"
      v-model="labelString"
      :readonly="true"
      :style="`width: ${width}px`"
      :class="{ 'rotate': showStatus }"
      suffix-icon="el-icon-arrow-down"
      :placeholder="placeholder">
    </el-input>
  </el-popover>
</template>

<script>
export default {
  name: 'MultiSelectTree',
  props: {
    // 接收绑定参数
    value: Array,
    // 输入框宽度
    width: Number,
    // 选项数据
    options: {
      type: Array,
      required: true
    },
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: '请选择'
    },
    // 树节点配置选项
    props: {
      type: Object,
      required: true
    }
  },
  // 设置绑定参数
  model: {
    prop: 'value',
    event: 'selected'
  },
  computed: {
    data () {
      return this.options
    }
  },
  watch: {
    labelModel (val) {
      if (!val) {
        this.valueModel = []
      }
    }
  },
  data () {
    return {
      // 树状菜单显示状态
      showStatus: false,
      // 菜单宽度
      treeWidth: 'auto',
      // 输入框显示值
      labelString: '',
      labelModel: [],
      // 实际请求传值
      valueModel: []
    }
  },
  created () {
    this.$nextTick(() => {
      this.treeWidth = `${(this.width || this.$refs.input.$refs.input.clientWidth) - 24}px`
    })
  },
  methods: {
    // 单击节点
    onCheckNode (node, checked, indeterminate) {
      let keys = this.$refs.tree.getCheckedKeys(true)
      this.valueModel = keys
      this.queryTree(this.data, keys)
    },
    // 显示时触发
    onShowPopover () {
      this.showStatus = true
    },
    // 隐藏时触发
    onHidePopover () {
      this.showStatus = false
      this.$emit('selected', this.valueModel)
    },
    // 搜索树状数据中的ID并转换成字符串，因为input框只接受字符串和数字
    queryTree (tree, ids) {
      this.labelModel = []
      let stark = []
      stark = stark.concat(tree)
      while (stark.length) {
        const temp = stark.shift()
        if (temp[this.props.children]) {
          stark = stark.concat(temp[this.props.children])
        }
        if (ids.indexOf(temp[this.props.value]) > -1) {
          this.labelModel.push(temp[this.props.label])
        }
      }
      this.labelString = this.labelModel.join()
    }
  }
}
</script>
<style lang="scss" scoped>
  .scrollbar {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-corner {
      background: #fff;
    }
    &::-webkit-scrollbar-thumb {
      // border-radius: 5px;
      width: 6px;
      background-color: #eee;
      &:hover {
        background-color: #ccc;
      }
    }
    &::-webkit-scrollbar-track-piece {
      background: #fff;
      width: 6px;
    }
  }
  .select-tree .el-tree {
    max-height: 350px;
  }
  .select-tree .el-input.el-input--suffix {
    cursor: pointer;
  }
  .select-tree .el-input.el-input--suffix.rotate .el-input__suffix {
    transform: rotate(180deg);
  }
</style>
