/*
 * @Author: wqy 
 * @Date: 2019-04-09 09:52:06 
 * @Last Modified by: wqy
 * @Last Modified time: 2019-04-16 14:17:03
 */
<template>
  <div>
  </div>
</template>
<script>
import { getPreAppsDisplay } from '@/api/firstPage'

export default {
  name: 'mockTest',
  data () {
    return {
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
    },
    formatPrice (val) {
      const fixDecimals = Math.round(val * 100) / 100
      let string = fixDecimals.toString()
      let decimalPos = string.indexOf('.')
      if (decimalPos < 0) {
        decimalPos = string.length
        string += '.'
      }
      while (string.length <= decimalPos + 2) {
        string += '0'
      }
      return string
    }
  }
}
</script>
