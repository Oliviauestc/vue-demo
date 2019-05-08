/*
 * @Author: wqy 
 * @Date: 2019-04-09 09:52:06 
 * @Last Modified by: wqy
 * @Last Modified time: 2019-04-18 14:58:55
 */
<template>
  <div>
    <el-form :model="loginForm" ref="loginForm">
      <el-form-item prop="loginName">
        <el-input v-model="loginForm.loginName" placeholder="请输入手机号码" :maxlength="11">
          <i slot="prefix" class="el-input__icon fa fa-mobile fa-2x fonts"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入登录密码">
          <i slot="prefix" class="el-input__icon fa fa-lock fa-2x fonts"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyCode" class="no-margin login-verify">
        <el-input
          v-model="loginForm.verifyCode"
          class="login-verifyCode"
          @focus.once="showVerifyCode()"
          placeholder="请输入验证码"
          :maxlength="codeLength"
        ></el-input>
        <img class="login-image" :src="codeUrl" @click="changeUrl()" v-if="showVerify">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" >登录</el-button>
        <!-- <el-button type="text" @click="changeShow()">忘记密码？</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getValidate, login } from '@/api/login'

export default {
  name: 'mockTest',
  data () {
    return {
      codeLength: 4,
      showVerify: false,
      loginForm: {
        loginName: '',
        password: '',
        verifyCode: ''
      },
      codeUrl: ''
    }
  },
  created () {
  },
  methods: {
    showVerifyCode () {
      this.showVerify = true
      this.changeUrl()
    },
    changeUrl () {
      this.loginForm.verifyCode = ''
      getValidate().then(res => {
        this.codeUrl = res
      })
    },
    submitForm (form) {
      const params = this.loginForm
      login(params).then(res => {
        console.log(res, '####')
        localStorage.setItem('LG_NM', res.userName)
        localStorage.setItem('LG_TK', res.token)
        this.$router.push({name: 'dashboard'})
      })
    }
  }
}
</script>
