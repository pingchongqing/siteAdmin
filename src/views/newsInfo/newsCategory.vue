<template lang="html">
<div class="app-container">
	<div class="itemscont">
    <el-row style="width:60%;margin-bottom:10px;">
      <el-col :span="12">
        <el-button class="companybtn" @click="addnew('new')" size="small">新增</el-button>
      <!--   <el-button class="companybtn" @click="deleteItems" size="small">删除</el-button> -->
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <el-input size="small" style="width:220px;" placeholder="请输入分类名称" v-model="planform.categoryName">
          <el-button slot="append" icon="el-icon-search" style="width:70px;" @click="current=1;getlist()"></el-button>
        </el-input>
      </el-col>
    </el-row>
<!--     <el-table
      :data="list"
      style="width:60%"
      :header-cell-style="{background:'#F2F4FF'}"
      @selection-change="handleSelectionChange"
      border> -->
    <el-table
      :data="list"
      style="width:60%"
      :header-cell-style="{background:'#F2F4FF'}"
      border>
     <!--  <el-table-column
        type="selection"
        width="60"
        fixed="left"
      > -->
      </el-table-column>
      <el-table-column
        fixed="left"
        label="分类名称">
        <template slot-scope="scope">
          <span >{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="160"
        label="操作">
        <template slot-scope="scope" >
          <span style="cursor:pointer;color:#409EFF;margin-right:10px;" @click="addnew('modify',scope.row)">修改</span>
          <span style="cursor:pointer;color:#409EFF;" @click="deleteItems(scope.row.categoryId)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentPageChange"
      :current-page="current"
      :page-sizes="[10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
   <!-- 新增弹窗 -->
    <el-dialog :title="dialogtitle" width="30%" :visible.sync="editdialog">
      <el-form :model="createform" ref="createForm" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="20">
            <el-form-item label="分类名称:" prop="categoryName">
              <el-input v-model="createform.categoryName" placeholder="请输入分类名称"></el-input>
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
      planform:{
        categoryName:null,//分类名称
      },
      list:[],
      current:1,
      pageSize: 10,
      total:0,
      editdialog:false,
      createform:{
        categoryName:null,
      },
      rules:{
        categoryName:[
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
    deleteItems(id){
      // if(this.deleteData.length<=0){
      //   this.$message.error('请勾选选项')
      //   return
      // }
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
        deleteCategoryName(id).then(res=>{
          if(res.data.code=='success'){
            this.$message.success('删除成功！')
          }else{
            this.$message.error(res.data.message)
          }
          this.getlist()
        }).catch(err=>{
          console.log(err)
        })
      }).catch(_=>{
      })
    },
    addnew(type,row){
      if(type==='new'){
        this.createform.categoryName=null
        this.createform.id=null
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
          if(this.createform.id){
            api=modifyCategoryName
          }else{
            api=createCategoryName
          }
          api(this.createform).then(res=>{
            if(res.data.code==='success'){
              this.$message.success('操作成功！')
              this.closedialog()
              this.getlist()
            }else{
              this.$message.error(res.data.message)
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    },
    closedialog(){
      this.$refs['createForm'].resetFields()
      this.createform.categoryName=null
      this.createform.id=null
      this.editdialog=false
    },
    getlist() {
      newsCategoryInfo({pageSize:this.pageSize,pageNum:this.current,...this.planform}).then(
        res => {
          this.list=res.data.data.items
          this.total=res.data.data.total
        }
      ).catch(err => {
        console.log(err)
      })
    },
    deleteItem(row,index){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
          if(!row.id){
            this.list.splice(index,1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }else{
            axios.delete('/ly/api/niotroot/eventtemplate/eventTemplate/'+row.id).then(res=>{
              if(res.data.code=='success'){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getlist()
              }else{
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
              }
            }).catch(err=>{
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            })
          }
      }).catch(_=>{
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
