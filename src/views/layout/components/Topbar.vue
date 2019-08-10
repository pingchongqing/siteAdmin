<template lang="html">
  <div class="top-container">
    <div class="logo">
      <img :src="logoPath" />
    </div>
    <div class="plant-text">
      管理后台
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <span class="welcome">欢迎{{userInfo.username || getName()}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="modifyPasswordShow = true" style="display:block;">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="quit" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="修改密码"
      :visible.sync="modifyPasswordShow"
      append-to-body
      center
      width="450px">
      <el-form :model="form" :rules="formrule" ref="ruleForm2">
        <el-form-item label="原密码" label-width="120px" prop="oldpassword">
          <el-input type="password" v-model="form.oldpassword" auto-complete="off" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px" prop="newpassword">
          <el-input type="password" v-model="form.newpassword" auto-complete="off" style="width:180px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px" prop="renewpassword">
          <el-input type="password" v-model="form.renewpassword" auto-complete="off" style="width:180px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyPasswordShow = false">取 消</el-button>
        <el-button type="primary" @click="modifyPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import logoPath from '@/assets/image/logo.png'
import { mapGetters } from 'vuex'
import { updatepassword, authlogout } from '@/api/login'
import { getName } from '@/utils/auth'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }else {
        if (this.form.newpassword !== '') {
          this.$refs.ruleForm2.validateField('renewpassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      }else if (value !== this.form.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      logoPath,
      modifyPasswordShow: false,
      form: {
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
      },
      formrule: {
        oldpassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpassword: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        renewpassword: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },

  mounted() {
  },

  methods: {
    getName,
     modifyPassword() {
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '请稍后...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          updatepassword({
            oldpassword: this.form.oldpassword,
            newpassword: this.form.newpassword
          }).then(
            res => {
              this.$message.success('修改密码成功')
              this.modifyPasswordShow = false
              loading.close()
            }            
          ).catch(err => {
            loading.close()
          })
        }
      })
    },

    quit() {
      this.$confirm('确定退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          authlogout()
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.top-container {
  height: 65px;
  background: #1f2438;
  position: fixed;
  width: 100%;
  z-index: 500;
  top: 0;
  .logo{
    margin: 0 24px;
    float: left;
  }
  .plant-text {
    line-height: 62px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }

  .navActive{
    color:#fff;
    font-weight: 700;
  }
}
.avatar-container {
  height: 50px;
  display: inline-block;
  position: absolute;
  right: 35px;
  top: 0;
  color: #f2f2f2;
  .welcome {
    line-height: 60px;
  }
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
.usercont {
  position: absolute;
  right: 100px;
  top: 8px;
  color: #666;
  line-height: 35px;
}
.need {
  font-size: 24px;
  cursor: pointer;
}
.top-nav {
  position: absolute;
  right: 250px;
  top: -1px;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    float: left;
    a {
      line-height: 65px;
      height: 65px;
      padding: 0 20px;
      color: #b5c6d9;
      font-size: 16px;
      display: block;
      transition: all .3s;
    }
    a:hover {
      background: #263445;
      padding: 0 25px;
      transition: all .3s;
    }
  }
}
</style>
