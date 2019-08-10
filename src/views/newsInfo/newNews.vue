<template lang="html">
<div class="app-container">
  <div class="formcontain" v-loading="loading">
    <el-form :model="planform" :rules="rules" ref="ruleForm" label-width="160px">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="资讯分类" prop="categoryId">
            <el-select
              style="width:100%;"
              v-model="planform.categoryId"
              filterable
              placeholder="请选择"
              >
              <el-option
                v-for="item in categorylist"
                :key="item._id"
                :label="item.className"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="文章标题" prop="title">
            <el-input placeholder="请输入文章标题" v-model="planform.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="作者" prop="authorName">
            <el-input placeholder="请输入作者名字" v-model="planform.authorName" style="width:220px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="关键词">
            <el-input placeholder="请输入关键词" v-model="planform.keyWord"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="权重" prop="weight">
            <el-input-number v-model="planform.weight" :min="1" :max="50" style="width:220px;"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col>
          <el-form-item label="缩略图" v-loading="imageloading" style="position:relative;" prop="picPath">
            <template v-if="planform.picPath">
              <img :src="planform.picPath" style="height:105px;" @click="showBigImg(planform.picPath)"/>
              <el-button
                size="mini"
                type="primary"
                @click="clearImg">
                重新上传
              </el-button>
            </template>
            <template v-else>
              <div style="float:left;">
                <el-upload
                  class="musicupload"
                  ref="mainIconupload"
                  :action="pictureuploadUrl"
                  multiple
                  :limit="1"
                  :file-list="pictureList"
                  :before-upload="beforepictureUpload"
                  name="file"
                  :on-success="handlepictureUploadSuccess"
                  >
                   <i>点击上传</i>
                </el-upload>
              </div>
              <span style="float:left;margin-left:10px;font-size:12px;">只支持上传jpg/png格式,大小不超过5M</span>
            </template>
            <el-input v-model="planform.picPath" v-show="false"></el-input>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-form-item label="内容编辑" prop="text">
        <div id="editorElem" style="text-align:left;width:700px;margin-top:10px;"></div>
        <el-input v-model="planform.text" v-show="false"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:10px;">
        <el-button type="primary" @click="onSubmit()" :disabled="submitButton">确定提交</el-button>
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
import { newsCategoryInfo, createNews, newsInfodetail } from '@/api/newsinfo'
export default {
  name: 'newNews',
  data() {
    var checklength = (rule, value, callback) => {
      if(value!=''){
        if (value.length>50) {
          return callback(new Error('长度最多50个字符'))
        }else{
          callback()
        }
      }else{
        callback()
      }
    }
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
      rules: {
        categoryId: [
          { required: true, message: '请选择分类', trigger: 'change' },
        ],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
        ],
        authorName: [
          { required: true, message: '请输入作者名字', trigger: 'blur' },
        ],
        infoSummary:[
          { validator:checklength,trigger: 'blur'}
        ],
        picPath:[
          { required: true, message: '请上传图片', trigger: 'change' },
        ],
        text:[
          { required: true, message: '请编辑内容', trigger: 'change' },
        ]
      },
      pictureList:[],
      pictureuploadUrl:'/api/file/uploadFile',
      submitloading: false,
      uploadButtonVisible:false,
      imgshowdialog:false,
      showimgUrl:'',
      submitButton:false,
      loading:false,
      editorContent:'',
      imageloading:false,
      musicList:[],
      musicloading:false,
      editor:null,
      categorylist:[]
    }
  },
  created() {
    this.getcategorylist()
    if (this.$route.query._id) {
      this.getDetail()
    }
  },
  computed:{
  },
  methods: {
    getDetail(){
      newsInfodetail({_id: this.$route.query._id}).then(res=>{
        const result = res.data.data
        this.planform = result
        this.editor.txt.html(result.text)
      })
    },
    getcategorylist(){
      newsCategoryInfo().then(
        res => {
          this.categorylist=res.data.data
        }
      ).catch(err => {
        console.log(err)
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
    beforepictureUpload(file) {
      // 如果上传文件大于1M
      const isJPG=(( file.type === 'image/jpeg') || ( file.type === 'image/png'))
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isJPG && isLt5M;
    },
    handlepictureUploadSuccess(res, file, pictureList) {
      this.imageloading=true
      if (file.response.code=='success') {
        this.planform.picPath=file.response.data
        this.$message.success('上传成功')
        this.imageloading=false
      }else{
        this.$message.error(file.response.message)
        this.imageloading=false
      }
      this.$refs['mainIconupload'].clearFiles()
    },
    beforeMusicUpload(file) {
      // 如果上传文件大于5M
      const isMp3=( /^.*(\.mp4)$/.test(file.name))
      const isLt5KB = file.size / 1024 / 1024 < 10;
      if (!isMp3) {
        this.$message.error('上传视屏只能是 MP4 格式!');
      }
      if (!isLt5KB) {
        this.$message.error('上传视屏大小不能超过 10MB!');
      }
      return isMp3 && isLt5KB;
    },
    handleMusicUploadSuccess(res, file, pictureList) {
      this.musicloading=true
      if (file.response.code=='success') {
        let html='<p><video class="classvideo" style="width:100%;height:100%;object-fit:fill;" playsinline="true" webkit-playsinline="true" x5-playsinline="true" controls="controls"><source src="'+file.response.data+'" type="video/mp4"/></video><br></p>'
        this.editor.txt.append(html)
        this.$message.success('上传成功')
        this.musicloading=false
      }else{
        this.$message.error(file.response.message)
        this.musicloading=false
      }
      this.$refs['pictureupload'].clearFiles()
    },
    onSubmit() {
      if(this.editor.txt.html() && this.editor.txt.html()!='<p><br></p>'){
        this.planform.text=this.editor.txt.html()
      }else{
        this.planform.text=null
      }
      const view = this.$store.state.tagsView.visitedViews.filter(v => v.path === this.$route.path)
      this.$refs['ruleForm'].validate((valid) =>{
        if(valid){
          this.submitButton=true
          this.loading=true
          createNews(this.planform).then(res=>{
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$store.dispatch('delVisitedViews', view[0]).then(() => {
              this.$router.push({
                name: 'newsList'
              })
            })
          }).catch(err=>{
            this.submitButton=false
            this.loading=false
          })
        }
      })
    },
    clearImg(){
      this.planform.picPath=null
      this.pictureList=[]
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
