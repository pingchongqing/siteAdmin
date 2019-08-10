<template lang="html">
<div class="app-container">
	<div class="itemscont" style="padding:0 10px;">
    <el-button size="mini" type="primary" @click="tonew">新增</el-button>
    <el-table
      :data="list"
      style="width:100%;margin-top:10px;"
      :header-cell-style="{background:'#EAEAED'}"
      ref="multipleTable"
      border>
       <el-table-column
        fixed="left"
        label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="180"
        label="操作">
        <div slot-scope="scope" >
          <span @click="resetPassword(scope.row._id)" style="color:#409EFF;cursor:pointer;margin-right:5px;">重置密码</span>
          <span style="color:red;cursor:pointer;margin-right:5px;" @click="deleteAdmin(scope.row._id)">删除</span>
        </div>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { authlist, adduser, deleteuser, resetpassword } from '@/api/login'
import { parseTime } from '@/utils'
export default {
  name: 'newslist',
  data() {
    return {
      list:[],
      loading: false
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    parseTime,
    getlist() {
      this.loading = true
      authlist().then(
        res => {
          console.log(res)
          this.list = res.data.data
        }
      ).catch(err => {
        console.log(err)
      })
    },
    resetPassword(id){
      this.$confirm('确认重置密码？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
        const loading = this.$loading({
          lock: true,
          text: '请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        resetpassword({_id: id}).then(res => {
          loading.close()
          this.$message({
            type: 'success',
            message: '重置成功'
          })
          this.getlist()
        }).catch(err => {
          console.log(err)
          loading.close()
        })
      })
    },
    tonew(){
      this.$prompt('请输入账号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const loading = this.$loading({
          lock: true,
          text: '请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        adduser({ username: value }).then(res => {
          const result = res.data
          console.log(res)
          if (result.code === 'success') {
            this.$message({
              type: 'success',
              message: value + '创建成功'
            })
            this.getlist()
          }
          loading.close()
        }).catch(() => {
          loading.close()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    deleteAdmin(id){
      let submitId=id
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
        const loading = this.$loading({
          lock: true,
          text: '请稍后...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        deleteuser({_id: id}).then(res => {
          loading.close()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getlist()
        }).catch(err => {
          console.log(err)
          loading.close()
        })
      })
    }
  },
}
</script>

<style scoped>
.line{
  text-align: center;
}
.dlink {
  color: #409EFF;cursor:pointer;
}
h3 {
  font-size: 14px;
  font-weight: normal;
}
.datarelative{
	font-size:14px;
	color:#666;
}
.datarelative span{margin-right:20px;cursor:pointer;}
.dlright{float:right;}
.ownproductlist{margin-bottom:10px;padding:20px 0 0;border-bottom:1px solid #ebeef5;}
.showform-enter-active, .showform-leave-active {
  transition: opacity .5s;
}
.showform-enter, .showform-leave-to {
  opacity: 0;
}
.itemscont{background:#fff;padding-bottom:15px;border-radius:5px;}
.companybtn{
  color: #fff;
  background-color: #5868d9;
}
.companybtn:hover{
  background-color:#7180df;
}
</style>
