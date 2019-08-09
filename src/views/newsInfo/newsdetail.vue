<template lang="html">
<div class="app-container">
  <div class="formcontain" v-loading="loading">
    <el-form :model="planform" ref="ruleForm" label-width="160px">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="资讯分类" prop="categoryId">
            <span>{{planform.categoryName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="文章标题" prop="title">
            <span>{{planform.title}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="作者" prop="authorName">
            <span>{{planform.authorName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="关键词">
            <span>{{planform.keyWord}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="权重" prop="weight">
            <span>{{planform.weight}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col>
          <el-form-item label="缩略图" style="position:relative;" prop="picPath">
            <img :src="planform.picPath" style="width:104px;height:105px;" @click="showBigImg(planform.picPath)" v-if="planform.picPath"/>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-form-item label="内容编辑" prop="text">
        <div id="editorElem" style="text-align:left;width:700px;margin-top:10px;"></div>
      </el-form-item>
      <el-form-item style="margin-top:10px;">
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 图片放大 -->
  <el-dialog :visible.sync="imgshowdialog" width="50%" class="imgdialog">
    <img :src="showimgUrl" style="width:100%;">
  </el-dialog>
</div>
</template>

<script>
import E from 'wangeditor'
import { newsInfodetail } from '@/api/newsinfo'
export default {
  name: 'newsdetail',
  data() {
    return {
      planform: {
        categoryId:null,
        title:null,
        authorName:null,
        keyWord:null,
        weight:50,
        picPath:null,
        text:null
      },
      imgshowdialog:false,
      showimgUrl:null,
      loading:false
    }
  },
  created() {
  },
  computed:{
  },
  methods: {
    onCancel(){
      const view = this.$store.state.tagsView.visitedViews.filter(v => v.path === this.$route.path)
      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
        this.$router.push({
          name: 'newsList'
        })
      })
    },
    getdetail(){
      newsInfodetail(Number(this.$route.params.id)).then(res=>{
        if(res.data.code=='success'){
          this.planform=res.data.data
          this.editor.txt.html(res.data.data.text)
        }
      })
    },
    getContent: function () {
      console.log(this.editorContent)
    },
    toListenUp:function(editor){ //监听上传图片的几个阶段，和做相应的处理
      var _this = this;
      editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
              // 图片上传之前触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
              
              // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
              // return {
              //     prevent: true,
              //     msg: '放弃上传'
              // }
          },
          success: function (xhr, editor, result) {
              // 图片上传并返回结果，图片插入成功之后触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          fail: function (xhr, editor, result) {
              // 图片上传并返回结果，但图片插入错误时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          error: function (xhr, editor) {
              // 图片上传出错时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          },
          timeout: function (xhr, editor) {
              // 图片上传超时时触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          },
          customInsert: function (insertImg, result, editor) {
              var url = result.data   //获取后台返回的图片路径
              // console.log(result)
              insertImg(url) //把图片路径展示在编辑器里面
          }
        }
    },
    showBigImg(imgurl){
      this.showimgUrl=imgurl
      this.imgshowdialog=true
    },
  },
  mounted() {
    var _this = this
    this.editor = new E('#editorElem') //实例化
    this.editor.customConfig = {
      showLinkImg:false,
　　　　　　onchange : (html) =>{this.planform.text = html;} ,
　　　　　　uploadImgMaxSize : 5 * 1024 * 1024 , 
　　　　　　uploadImgMaxLength : 1 , // 限制一次最多上传 1 张图片
　　　　　　uploadFileName : 'file' , //设置上传图片文件的时候，后台接受的文件名，files.myFileName;
　　　　　　withCredentials : true , //跨域上传中如果需要传递 cookie 需设置 withCredentials
　　　　　　uploadImgTimeout : 3000 , //自定义 timeout 时间，这里是设置的3秒
　　　　　　uploadImgServer : '/api/file/uploadFile' , //上传到后台的接口
            zIndex:1
　　　}
    this.toListenUp(this.editor);//监听上传的各个阶段
    this.editor.create();
    this.getdetail()
    this.editor.$textElem.attr('contenteditable', false)
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.dlink {
  color: #409EFF;
}
h4 {
  color:#333;
}
.errorshow{
  color:red;font-style:normal;font-size:12px;position:absolute;top:28px;left:0;
}
.companyselect{
  position:absolute;top:42px;left:0;z-index:100;background:#fff;width:220px;padding:10px;padding-top:10px;border:1px solid #e4e7ed;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);border-radius:4px;
}
.companyselect span{
  display:block;line-height:20px;cursor:pointer;color:#606266;
}
</style>
