<template lang="html">
<div class="app-container">
  	<div class="itemscont">
      <el-form :model="planform" ref="ruleForm" label-width="80px" class="ownproductlist">
      <el-row>
        <el-col :span="5">
          <el-form-item label="商品名称:">
            <el-input v-model="planform.ownproduct.title" placeholder="请输入sku商品名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="是否自营:">
             <el-select v-model="planform.ownproduct.selfSupport" filterable clearable placeholder="请选择" style="width:100%;" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in selfSupportlist"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="审核状态:">
             <el-select v-model="planform.ownproduct.checkStatus" filterable clearable placeholder="请选择" style="width:100%;" prefix-icon="el-icon-search">
                <el-option
                  v-for="item in isvalidatelist"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
            <el-button @click="onCancel" size="mini">重置</el-button>
          </el-form-item>
        </el-col> 
      </el-row>
    </el-form>
      <el-table
        :data="list"
        style="width:100%"
        :header-cell-style="{background:'#EAEAED'}"
        ref="multipleTable"
        border>
        <el-table-column
          width="120"
          label="spu编码">
          <template slot-scope="scope">
            <span>{{ scope.row.stdProductNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品编码">
          <template slot-scope="scope">
            <span>{{ scope.row.productNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="sku名称">
          <template slot-scope="scope">
            <span>{{ scope.row.skuTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="品牌">
          <template slot-scope="scope">
            <span>{{ scope.row.brandName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="建议销售价">
          <template slot-scope="scope">
            <span>{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          label="是否直营">
          <template slot-scope="scope">
            <span>{{ scope.row.selfSupport | selfSupportFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态">
          <template slot-scope="scope">
            <span>{{ scope.row.checkStatus | productStatusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="首次上架时间">
          <template slot-scope="scope">
            <template v-if="scope.row.isvalidate!=1">
              <span>{{ scope.row.shelfTime? parseTime(scope.row.shelfTime,'{y}-{m}-{d} {h}:{i}:{s}'): null }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="180"
          label="操作">
          <template slot-scope="scope">
            <span style="color:#409EFF;cursor:pointer;margin-right:10px;" @click="toowndetail('detail',scope.row.stdProductNo,scope.row.lv3CategoryNo)">查看</span>
            <span style="color:#409EFF;cursor:pointer;" @click="toowndetail('check',scope.row.stdProductNo,scope.row.lv3CategoryNo)" v-if="scope.row.checkStatus==1 || scope.row.checkStatus==0">审核</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="pageindex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { productInfoList } from '@/api/productinfo'
import { parseTime } from '@/utils'
export default {
  name: 'shopproductlist',
  data() {
    return {
      planform: {
        ownproduct: {
          title:null,
          selfSupport:null,
          checkStatus:null,
          goodsChannel:2
        }
      },
      list:[
      ],
      brandlist:[],
      togglefilter:false,
      currentPage:1,
      pagesize: 10,
      pageindex: 1,
      total:0,
      dialogVisible:false,
      errorVisible:false,
      showerror:false,
      firstlink:true,
      errormessage:[],
      errorUrl:'',
      uploadUrl:'/ycy/product/product/importSkuCoreExcel',
      uploadButtonVisible:false,
      templetUrl: '/static/templet/product_v1.1.xlsx',
      errordata:'',
      loading: false,
      options4:[],
      bcategorylist:[],
      mcategorylist:[],
      scategorylist:[],
      shelveStatuslist:[{id:1,value:'上架'},{id:2,value:'下架'}],
      isvalidatelist:[{id:0,value:'已创建'},{id:1,value:'待审核'},{id:2,value:'审核通过'},{id:3,value:'驳回'}],
      selfSupportlist:[{id:0,value:'自营'},{id:1,value:'非自营'}],
      multipleSelection:[]
    }
  },
  computed: {
  },
  created() {
   this.getlist()
  },
  methods: {
    parseTime,
    toowndetail(type,stdProductNo,lv3CategoryNo){
      this.$router.push({
        name: 'shopproductdetail',
        params: {
          type,
          stdProductNo,
          lv3CategoryNo
        }
      })
    },
    tocheck(id,stdProductNo,lv3CategoryNo){
      this.$router.push({
        name: 'shopproductcheck',
        params: {
          id,
          stdProductNo,
          lv3CategoryNo
        }
      })
    },
    tonew(id,stdProductNo,lv3CategoryNo){
      this.$router.push({
        name: 'newshopproduct',
        params: {
          id,
          stdProductNo,
          lv3CategoryNo
        }
      })
    },
    getlist() {
      productInfoList({ pageSize: this.pagesize, pageNum: this.pageindex, ...this.planform.ownproduct }).then(
        res => {
          this.total=res.data.data.total
          this.list=res.data.data.list
        }
      ).catch(err => {
        console.log(err)
      })
    },
    onCancel() {
      this.planform.ownproduct.title=null
      this.planform.ownproduct.selfSupport=null
      this.planform.ownproduct.checkStatus=null
      this.pagesize=10
      this.pageindex=1
      this.getlist() 
    },
    onSubmit() {
      this.pagesize=10
      this.pageindex=1
      this.getlist()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getlist()
    },
    handleCurrentPageChange(val) {
      this.pageindex = val
      this.getlist()
    },
    // handleSelectionChange(val){
    //   this.multipleSelection = val
    // },
    // tounadd(row){
    //   this.$confirm('确认下架？', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       unadd([{id:row.id,productNo:row.productNo,shelveStatus:2}]).then(res=>{
    //         if(res.data.code=='success'){
    //           this.$message({
    //             message: '下架成功',
    //             type: 'success'
    //           })
    //           this.getlist()
    //         }else{
    //           this.$message({
    //             message: res.data.message,
    //             type: 'error'
    //           })
    //         }
    //       }).catch(err=>{
    //         this.$message({
    //           message: '失败',
    //           type: 'error'
    //         })
    //       })
    //     }).catch(() => {
    //     })
    // },
    // toadd(row){
    //   this.$confirm('确认上架？', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       onadd([{id:row.id,productNo:row.productNo,shelveStatus:1}]).then(res=>{
    //         if(res.data.code=='success'){
    //           this.$message({
    //             message: '上架成功',
    //             type: 'success'
    //           })
    //           this.getlist()
    //         }else{
    //           this.$message({
    //             message: res.data.message,
    //             type: 'error'
    //           })
    //         }
    //       }).catch(err=>{
    //         this.$message({
    //           message: '失败',
    //           type: 'error'
    //         })
    //       })
    //     }).catch(() => {
    //     })
    // }
  }
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
.serachbtns{float:right;margin-right:10px;}
.ownproductlist{margin-bottom:10px;padding:20px 0 0;border-bottom:1px solid #ebeef5;}
.showform-enter-active, .showform-leave-active {
  transition: opacity .5s;
}
.showform-enter, .showform-leave-to {
  opacity: 0;
}
.ownproductlistform{margin:10px auto;padding:30px 0 0;border:1px solid #ebeef5;background:#FCFCFF;border-radius:5px;}
.companybtn{
  color: #fff;
  background-color: #9ec78d;
}
.companybtn:hover{
  background-color:#7ca66d;
}
.itemscont{background:#fff;padding:0 10px;border-radius:5px;}
</style>