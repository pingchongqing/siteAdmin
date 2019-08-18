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
          <span v-if="scope.row.singlePage" style="cursor:pointer;color:#409EFF;" @click="addnew('content', scope.row)">内容维护</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
   <!-- 新增弹窗 -->
    <el-dialog :title="dialogtitle" :width="editing === 'content'?'880px':'30%'" :visible.sync="editdialog">
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
        <el-row v-show="editing === 'content'">
          <el-col :span="20">
            <el-form-item label="栏目内容:" prop="content">
              <div id="editorElem" style="text-align:left;width:700px;margin-top:10px;"></div>
              <el-input v-model="createform.content" v-show="false"></el-input>
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
import E from 'wangeditor'
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
      deleteData:null,
      editor: null,
      editing: ''
    }
  },
  computed: {
  },
  created() {
    this.getlist()
  },
  mounted() {

  },
  methods: {
    parseTime,
    editCreater() {
      this.editor = new E('#editorElem') //实例化
      this.editor.customConfig = {
        showLinkImg:false,
        uploadImgMaxSize : 5 * 1024 * 1024 , 
        uploadImgMaxLength : 1 , // 限制一次最多上传 1 张图片
        uploadFileName : 'file' , //设置上传图片文件的时候，后台接受的文件名，files.myFileName;
        withCredentials : true , //跨域上传中如果需要传递 cookie 需设置 withCredentials
        uploadImgTimeout : 3000 , //自定义 timeout 时间，这里是设置的3秒
        uploadImgServer : '/api/file/uploadFile' , //上传到后台的接口
        zIndex:1
  　　}
      this.toListenUp(this.editor)//监听上传的各个阶段
      this.editor.create()
    },
    toListenUp:function(editor){ //监听上传图片的几个阶段，和做相应的处理
      var _this = this
      editor.customConfig.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          var url = result.data   //获取后台返回的图片路径
          insertImg(url) //把图片路径展示在编辑器里面
        }
      }
    },
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
      this.editing = ''
      if(type==='new'){
        this.createform = {}
        this.dialogtitle='新增分类'
      }else if(type==='modify'){
        this.dialogtitle='修改分类'
        this.createform={...row}
      }else if(type==='content'){
        this.dialogtitle='栏目内容'
        this.createform={...row}        
        this.editing = 'content'
        this.$nextTick(() => {
          if (!this.editor) {
            this.editCreater()
          }
          this.editor.txt.html(row.content || '<p></p>')
        })
      }
      this.editdialog=true
    },
    handleCurrentPageChange(val){
      this.current=val
      this.getlist()
    },
    newSubmit(){
      if(this.editing === 'content' && this.editor.txt.html()){
        this.createform.content = this.editor.txt.html()
      }
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
