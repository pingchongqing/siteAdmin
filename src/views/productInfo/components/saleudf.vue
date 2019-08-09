<template>
	<div>
		<div>
	      <el-form :model="planform" ref="ruleForm" key="ruleForm">
	      	<el-form-item label-width="0" prop="list5">
	      		<el-table
		          :data="planform.list5"
		          style="width:100%;margin-top:20px;"
		          :header-cell-style="{background:'#EAEAED'}"
		          border
		          >
		          <template v-if="type=='check'">
		          	<el-table-column
			            fixed="left"
			            width="180"
			            label="操作">
			            <template slot-scope="scope">
			            	<template v-if="scope.row.checkStatus==1 || scope.row.checkStatus==0">
			            		<el-button @click="agreeSubmit(scope.row.productNo)" size="mini" type="primary">审核通过</el-button>
			                	<el-button size="mini" type="danger" @click="unAgreeSubmit(scope.row.productNo)">驳回</el-button>
			            	</template>
			            </template>
			         </el-table-column>
		          </template>
		          <template v-for="item in tabletitle">
		          	<el-table-column :label="item.label" :prop="item.prop">
		          		<template slot-scope="scope">
		          			<template v-if="item.prop=='pictureUrl'">
	          		 			<img :src="scope.row.pictureUrl" style="width:100%;cursor:pointer;" v-if="scope.row.pictureUrl" @click="showBigImg(scope.row.pictureUrl)">
	          		 		</template>
	          		 		<template v-else>
	          		 			<span >{{ scope.row[item.prop] }}</span>
	          		 		</template>
			            </template>
		          	</el-table-column>
		          </template>
		        </el-table>
	      	</el-form-item>
	      </el-form>
	    </div>
	    <!-- 图片放大 -->
        <el-dialog :visible.sync="imgshowdialog" width="50%" class="imgdialog">
          <img :src="showimgUrl" style="width:100%;">
        </el-dialog>
         <!-- 意见 -->
	  	<el-dialog title="驳回意见" :visible.sync="editdialog" width="40%">
		    <div class="formdetail">
		      <el-form :model="planform2" ref="createForm" label-width="120px" :rules="rules">
		        <el-row :gutter="20">
		          <el-col :span="16">
		            <el-form-item label="意见" prop="checkOpinion">
		              <el-input v-model="planform2.checkOpinion" placeholder="请输入意见" type="textarea"></el-input>
		            </el-form-item>
		          </el-col>
		        </el-row>
		      </el-form>
		     </div>
		    <div slot="footer" class="dialog-footer" style="text-align:center;">
		      <el-button @click="closedialog">取消</el-button>
		      <el-button type="primary" @click="onSubmit" :disabled="dialogbtn">确定驳回</el-button>
		    </div>
		</el-dialog>
	</div>
</template>
<script>
import { checksku } from '@/api/productinfo'
export default {
  name: 'saleudf',
  data() {
    return {
      publicudf:[],
      checkpublic:[],
      planform:{
      	list5:[]
      },
      tabletitle:[
      	{label:'SKU编码',prop:'productNo'},
      	{label:'*型号',prop:'size'},
      	{label:'规格属性名称',prop:'ruleName'},
      	{label:'条形码',prop:'barCode'},
      	{label:'sku图片',prop:'pictureUrl'},
      	{label:'参考成本价(元)',prop:'referencePrice'},
      	{label:'*建议销售价(元)',prop:'salePrice'},
      	{label:'库存',prop:'stock'},
      	{label:'单sku标题',prop:'skuTitle'},
      	{label:'商品货号',prop:'goodsNo'},
      ],
      titletext:['SKU编码','*型号','规格属性名称','条形码','sku图片','参考成本价(元)','*建议销售价(元)','库存','单sku标题','商品货号'],
      imgshowdialog:false,
      showimgUrl:'',
      type:null,
      planform2:{
      	productNo:null,
      	checkStatus:3,
      	checkOpinion:null
      },
      rules:{
      	checkOpinion: [
	        { required: true, message: '请填写意见', trigger: 'change' }
	    ]
      },
      editdialog:false,
      dialogbtn:false
    }
  },
  watch: {
	totalsku: function (val) {
		if(val && val.length>0){
			const owndata=val
			owndata.map(item=>{
				if(item.saleAttr && item.saleAttr.length>0){
					item.saleAttr.map(itemAttr=>{
						let salekey=itemAttr.saleKey
						//判断基本标题,更新表格标题tabletitle及判断用titletext
						if(!(this.titletext.indexOf(salekey)>-1)){
							this.titletext.push(salekey)
							this.tabletitle.push({label:salekey,prop:salekey})
						}
						item[itemAttr.saleKey]=itemAttr.saleValue
					})
				}
			})
			this.planform.list5=owndata
		}else{
			this.planform.list5=[]
		}
		
	 }
  },
  props:['totalsku'],
  created() {
  	this.type=this.$route.params.type
  },
  methods: {
  	agreeSubmit(productNo){
    	this.$confirm('确认通过？', '提示', {
	        confirmButtonText: '确认',
	        cancelButtonText: '取消',
	        type: 'warning'
	    }).then(_=>{
          	this.confirmsku(productNo,2)
	    }).catch(_=>{
	    })
    },
    confirmsku(productNo,checkstatus,checkOpinion){
    	checksku({productNo:productNo,checkStatus:checkstatus,checkOpinion:checkOpinion}).then(res=>{
            if(res.data.code=='success'){
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.closedialog()
              this.dialogbtn=false
              this.$emit('skuevent')
            }else{
              this.$message({
                message: res.data.message,
                type: 'error'
              })
              this.dialogbtn=false
            }
          }).catch(err=>{
            this.$message({
              message:'操作失败',
              type: 'error'
            })
            this.dialogbtn=false
         })
    },
    unAgreeSubmit(productNo){
		this.planform2.productNo=productNo
		this.editdialog=true
    },
    onSubmit(){
    	this.$refs['createForm'].validate((valid) =>{
        if(valid){
          this.dialogbtn=true
          this.confirmsku(this.planform2.productNo,this.planform2.checkStatus,this.planform2.checkOpinion)
        }
      })
    },
    closedialog(){
    	this.planform2.productNo=null
    	this.planform2.checkOpinion=null
    	this.editdialog=false
    },
    showBigImg(imgurl){
      this.showimgUrl=imgurl
      this.imgshowdialog=true
    }
  }
}
</script>
<style scoped>
.right{margin-left:210px;}
</style>