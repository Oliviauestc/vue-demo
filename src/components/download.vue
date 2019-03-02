<template>
  <div>
    <!-- <el-button @click="upload">默认按钮</el-button> -->
    <input type="file" id="file"  @change="upload">
  </div>
</template>
<script>
  import axios from 'axios'
  // import {Utils} from '@/common/util'
  // let util = new Utils()
  export default {
    name: 'files',
    data () {
      return {
        input: ''
      }
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      upload () {
        var fileObj = document.getElementById('file').files[0] // js获取文件对象
        var formdata = new FormData() // FormData 对象
        formdata.append('file', fileObj) // 文件对象
        axios({
          url: '/api/test',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => {
          console.log(res)
        }).catch(e => {
          console.log('######', e)
        })
        // axios({
        //   url: '/api/test',
        //   method: 'get'
        // }).then((res) => {
        //   console.log('######', res)
        // }).catch(e => {
        //   console.log('######', e)
        // })
      }
    }
  }
</script>
