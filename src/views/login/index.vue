<template>
  <div class="login-container">
    <div class="login-form">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
        class="card-box formdetail">
        <h3 class="title" style="font-size:16px !important;">金刚平台运营中心</h3>
        <div v-if="accountSubmit">
          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <svg-icon icon-class="pcuser" style="color:#f4b15a;font-size:18px;"/>
            </span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" style="color:#f4b15a;font-size:20px;"></svg-icon>
            </span>
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
              placeholder="密码"></el-input>
              <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
          </el-form-item>
        </div>
        <el-form-item style="margin-top:50px;" v-if="accountSubmit">
          <el-button style="width:100%;color:#fff;" :loading="loading" @click.native.prevent="handleLogin" class="orangebg">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { userlogin } from '@/api/login'
// import axios from 'axios'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username:null,
        password:null,
        serviceId:null,
      },
      loginRules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur', }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur', }],
      },
      loading: false,
      pwdType: 'password',
      accountSubmit:true,
      servicelist:[]
    }
  },
  created() {
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          userlogin(this.loginForm).then(res=>{
            console.log(res)
            if(res.data.code=='success'){
              this.$store.dispatch('LogOut')
              this.$store.dispatch('delAllViews')
              this.$store.dispatch('GetInfo',res.data.data)
              this.loading = false
              this.$router.push({ path: '/' })
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              })
              this.loading = false
            }
          }).catch(err=>{
            this.$message({
              message: '登录失败',
              type: 'error'
            })
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width:100%;
    background:#3F73B6 url(/static/image/earthbg.png) center center no-repeat;
    // .loginform{background:url(/static/image/loginbg.png) center center no-repeat;}
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #F2F4FF inset !important;
      -webkit-text-fill-color: #889aa4 !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #889aa4;
      height: 47px !important;
    }
    .el-input {
      display: inline-block;
      height: 47px !important;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 18px;
      color: $light_gray;
      margin: 0px auto 50px auto;
      text-align: right;
    }
    .login-form {
      position: absolute;
      right:50%;
      margin-right:-380px;
      width: 822px;
      height:418px;
      padding: 50px 35px 15px 500px;
      top:50%;
      margin-top:-214px;
      background:url(/static/image/loginbg.png) center center no-repeat;
      .divactive{
        color:#409EFF;
        background:#F2F4FF;
      }
    }
    .formdetail{
      width:298px;
      margin:20px 34px 0 0;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background:#F2F4FF;
      border-radius: 5px;
      color: #454545;
    }
    .divitem{
      background:none
    }
    .divitem{
      .divcommon{
        background:#F2F4FF;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>