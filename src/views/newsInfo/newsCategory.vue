<template lang="html">
<div class="app-container">
	<div class="itemscont">
    <el-row style="width:60%;margin-bottom:10px;">
      <el-col :span="12">
        <el-button class="companybtn" @click="addnew('new')" size="small">新增</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      style="width:60%"
      :header-cell-style="{background:'#F2F4FF'}"
      border>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="分类名称">
        <template slot-scope="scope">
          <span >{{ scope.row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        label="单页栏目">
        <template slot-scope="scope">
          <span >{{ scope.row.singlePage ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="160"
        label="操作">
        <template slot-scope="scope" >
          <span style="cursor:pointer;color:#409EFF;margin-right:10px;" @click="addnew('modify',scope.row)">修改</span>
          <span style="cursor:pointer;color:#409EFF;" @click="deleteItems(scope.row._id)">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
   <!-- 新增弹窗 -->
    <el-dialog :title="dialogtitle" width="30%" :visible.sync="editdialog">
      <el-form :model="createform" ref="createForm" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="20">
            <el-form-item label="分类名称:" prop="className">
              <el-input v-model="createform.className" placeholder="请输入分类名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="单页栏目:" prop="singlePage">
              <el-switch
                v-model="createform.singlePage"
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closedialog">取消</el-button>
        <el-button type="primary" @click="newSubmit" :disabled="dialogbtn">保存</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import { newsCategoryInfo, createCategoryName, modifyCategoryName, deleteCategoryName } from '@/api/newsinfo'
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import axios from 'axios'
export default {
  name: 'newsCategory',
  data() {
    return {
      list:[],
      editdialog:false,
      createform:{
        className:null,
        singlePage: false
      },
      rules:{
        className:[
          {required:true,message:'分类名称不能为空',trigger:'blur'}
        ],
      },
      dialogbtn:false,
      dialogtitle:null,
      deleteData:null
    }
  },
  computed: {
  },
  created() {
    this.getlist()
  },
  methods: {
    parseTime,
    handleSelectionChange(val){
      this.deleteData=val
    },
    deleteItems(_id){
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
        deleteCategoryName({_id}).then(res=>{
          loading.close()
          this.$message.success('删除成功！')
          this.getlist()          
        }).catch(err=>{
          console.log(err)
          loading.close()
        })
      })
    },
    addnew(type,row){
      if(type==='new'){
        this.createform = {}
        this.dialogtitle='新增分类'
      }else if(type==='modify'){
        this.dialogtitle='修改分类'
        this.createform={...row}
      }
      this.editdialog=true
    },
    handleCurrentPageChange(val){
      this.current=val
      this.getlist()
    },
    newSubmit(){
      this.$refs['createForm'].validate(valid=>{
        if(valid){
          let api=null
          if(this.createform._id){
            api=modifyCategoryName
          }else{
            api=createCategoryName
          }
          api(this.createform).then(res=>{
            this.$message.success('操作成功！')
            this.closedialog()
            this.getlist()
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    },
    closedialog(){
      this.$refs['createForm'].resetFields()
      this.createform = {}
      this.editdialog=false
    },
    getlist() {
      newsCategoryInfo().then(
        res => {
          this.list=res.data.data
        }
      ).catch(err => {
        console.log(err)
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
.ownproductlist{margin:20px 0;padding:30px 0 0;border:1px solid #ebeef5;background:#FCFCFF;}
.showform-enter-active, .showform-leave-active {
  transition: opacity .5s;
}
.showform-enter, .showform-leave-to {
  opacity: 0;
}
.itemscont{background:#fff;padding:15px 20px;border-radius:5px;}
.companybtn{
  color: #fff;
  background-color: #5868d9;
}
.companybtn:hover{
  background-color:#7180df;
}
</style>
