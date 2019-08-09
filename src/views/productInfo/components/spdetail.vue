<template>
	<div>
      <div id="editorElem" style="text-align:left">
        <!-- <template v-if="owndetail">
          <div v-html="owndetail"></div>
        </template> -->
      </div>
	</div>
</template>

<script>
    import E from 'wangeditor';  //引入刚npm安装的wangeditor插件
    import axios from 'axios'
	  import { productInfodetail} from '@/api/productinfo'
    export default {
      name: 'editor',
      data () {
        return {
        	editorContent: '',
        	updatebtn:false,
        	owndetail:''
        }
      },
      created() {
	    },
      methods: {
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
        getAgreeDetail(editor){
  	      productInfodetail(this.$route.params.stdProductNo).then(res=>{
  	        if(res.data.code=='success'){
  	          this.editorContent=(res.data.data.productInfo?res.data.data.productInfo:'')
  	          this.owndetail=(res.data.data.productInfo?res.data.data.productInfo:'')
  	          if(this.editorContent){
  	            editor.txt.html(this.editorContent)
  	          }
  	        }
  	      }).catch(err=>{
  	        console.log(err)
  	      })
	      },
      },
      mounted() {
          var _this = this
          var editor = new E('#editorElem') //实例化
          editor.customConfig = {
            showLinkImg:false,
　　　　　　onchange : (html) =>{this.editorContent = html;} ,
　　　　　　uploadImgMaxSize : 3 * 1024 * 1024 , 
　　　　　　uploadImgMaxLength : 1 , // 限制一次最多上传 1 张图片
　　　　　　uploadFileName : 'file' , //设置上传图片文件的时候，后台接受的文件名，files.myFileName;
　　　　　　withCredentials : true , //跨域上传中如果需要传递 cookie 需设置 withCredentials
　　　　　　uploadImgTimeout : 3000 , //自定义 timeout 时间，这里是设置的3秒
　　　　　　uploadImgServer : '/ycy/product/brand/import' , //上传到后台的接口
            zIndex:1
　　　　　}
          this.toListenUp(editor);//监听上传的各个阶段
          editor.create();
          this.getAgreeDetail(editor)  
      }
    }
</script>