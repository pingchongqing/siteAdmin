<template>
	<div>
		<div style="margin-bottom:20px;">
			<span style="font-weight:bold;">规格属性名称</span>
			<el-select v-model="skuId" size="small" filterable clearable placeholder="请选择" style="min-width: 380px;" prefix-icon="el-icon-search" @change="listchange">
              <el-option
                v-for="item in totalskuInfo"
                :key="item.id"
                :label="item.ruleName"
                :value="item.id">
              </el-option>
            </el-select>
		</div>
		<!-- <div style="width:280px;border:1px solid #e4e7ed;float:left;">
			<div style="width:100%;background-color:#E4EEF0;padding-left:10px;line-height:28px;color:#909399;"><span>非关键属性</span></div>
		    <el-table
	          :data="publicudf"
	          style="width:100%;"
	          :show-header="false"
	          border
	          >
	          <el-table-column
	            >
	            <template slot-scope="scope">
	              <template v-if="scope.row.edit">
	              	<el-input class="edit-input" size="small" v-model="scope.row.specName"></el-input>
	              </template>
	              <template v-else>
	              	<span >{{ scope.row.specName }}</span>
	              </template>
	            </template>
	          </el-table-column>
	          <el-table-column
	            width="120">
	            <template slot-scope="scope">
		            <template v-if="scope.row.showType==2">
		            	<el-input class="edit-input" size="small" v-model="scope.row.currentValue"></el-input>
		            </template>
		            <template v-else>
		            	<el-select v-model="scope.row.currentValue" size="small" filterable clearable placeholder="请选择" style="min-width: 80px;" prefix-icon="el-icon-search">
		                  <el-option
		                    v-for="item in scope.row.options"
		                    :key="item"
		                    :label="item"
		                    :value="item">
		                  </el-option>
		                </el-select>
		            </template>
	            </template>
	          </el-table-column>
	        </el-table>
		</div>	 -->	
		<div>
      		<el-table
	          :data="list5"
	          style="width:500px;margin-top:20px;"
	          :header-cell-style="{background:'#EAEAED'}"
	          border
	          >
	          <el-table-column
	            label="属性名"
	            >
	            <template slot-scope="scope">
	              <span >{{ scope.row.basicKey }}</span>
	            </template>
	          </el-table-column>
	          <el-table-column
	            label="属性值"
	            >
	            <template slot-scope="scope">
	              <span >{{ scope.row.basicValue }}</span>
	            </template>
	          </el-table-column>
	        </el-table>
	    </div>
	</div>
</template>
<script>
// import { uniquecategory, getprop } from '@/api/bussinesscategory'
export default {
  name: 'extendudf',
  data() {
    return {
      publicudf:[],
      checkpublic:[],
      list5:[],
      skuId:'',
      totalskuInfo:[],
    }
  },
  created() {
  	// this.getcategoryudf()
  },
  watch: {
	totalsku: function (val) {
		if(val && val.length>0){
			this.totalskuInfo=val
			this.skuId=this.totalskuInfo[0].id
			this.listchange()
		}
	}
  },
  props:['totalsku'],
  methods: {
    getcategoryudf(){
	   	let ownlist=[]
		getprop({classCode:this.$route.params.lv3CategoryNo,extOrSell:false}).then(res=>{
		 	if(res.data.code=='success'){
		 		if(res.data.data==null){
		 		  this.publicudf=[]
		 		}else{
		 		 if(res.data.data){
		 		 	ownlist=res.data.data
			 		for(let i=0;i<ownlist.length;i++){
			 		 	if(ownlist[i].options){
			 		 		if(ownlist[i].options.indexOf(',')>-1){
				 		 	 ownlist[i].options=ownlist[i].options.split(",")
				 		 	}else{
				 		 	  let valuelist=[]
				 		 	  valuelist.push(ownlist[i].options)
				 		 	  ownlist[i].options=valuelist
				 		 	}
			 		 	}
			 		}
			 		this.publicudf=ownlist
		 		 }else{
		 		 	this.publicudf=[]
		 		 }
		 		}
		 	}
	   	}).catch(err=>{
	   	 	console.log(err)
	   	})
	},
	listchange(){
   		const skulist=this.totalsku
   		const ownId=this.skuId
   		this.list5=[]
   		skulist.map(item=>{
   			if(item.id==ownId){
   				if(item.basicAttr && item.basicAttr.length>0){
   					this.list5=item.basicAttr
   				}else{
   					this.list5=[]
   				}
   			}
   		})
   	}
  }
}
</script>
<style scoped>
.right{margin-left:300px;}
</style>