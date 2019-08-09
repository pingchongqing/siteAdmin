<template lang="html">
<div class="app-container">
  <div class="formcontain" v-loading="loading">
    <el-form :model="planform" ref="ruleForm" label-width="120px">
      <!-- <div>订单信息</div> -->
      <el-row :gutter="10">
        <el-col :span="6">
           <span class="texttitle">{{'报价截止日期:'+(planform.ticketNo?planform.ticketNo:'')}}</span>
        </el-col>
        <el-col :span="6">
          <span class="texttitle">{{'报价企业(总数):'+(planform.ticketNo?planform.ticketNo:'')}}</span>
        </el-col>
        <el-col :span="6">
          <span class="texttitle">{{'状态:'+(planform.ticketNo?planform.ticketNo:'')}}</span>
        </el-col>
      </el-row>
      <div>
        <div style="line-height:13px;padding:10px;border:1px solid #ebeef5;color:##606266;">询价商品</div>
        <el-form :model="planform" ref="ruleForm" label-width="100px" style="border-left:1px solid  #EBEEF5;border-right:1px solid  #EBEEF5;">
          <el-row :gutter="30" >
            <el-col :span="8">
              <el-form-item label="铸件名称:">
                <span>{{planform.productName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="铸件材质:">
                <span>{{planform.productMaterial}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="卖家名称:">
                <span>{{planform.enquiryEnt}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供货区域:">
                <span>{{planform.cityName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单件重量:">
                <span>{{planform.singleWeight}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购数量:">
                <span>{{planform.productNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="交货日期:">
                <span v-if="planform.deliveryDate">{{parseTime(planform.deliveryDate,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上传图纸:">
                <span v-if="planform.picPath">{{picPath}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table
        :data="data"
        style="width:100%;"
        ref="multipleTable"
        border>
       <el-table-column
          fixed="left"
          width="160px"
          label="报价企业">
          <template slot-scope="scope">
            <span>{{ scope.row.quotationEnt }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="报价金额">
          <template slot-scope="scope">
            <span v-if="scope.row.price">{{'¥'+(scope.row.price.toFixed(2))+'元' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="报价时间">
          <template slot-scope="scope">
            <span v-if="scope.row.gmtCreate">{{ parseTime(scope.row.gmtCreate,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status | enquiryStatusFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
      </div>    
    <div style="margin-top:20px;text-align:center;">
      <el-button @click="onCancel">返回</el-button>
    </div>
    </el-form>
  </div>
</div>
</template>

<script>
import { quotationInfoDetail } from '@/api/enquiryQuotationInfo'
import { parseTime } from '@/utils'
export default {
  name: 'quotationdetail',
  data() {
    return {
      planform: {
      },
      imgshowdialog:false,
      showimgUrl:null,
      loading:false,
      data:[]
    }
  },
  created() {
    this.getdetail()
  },
  computed:{
  },
  methods: {
    parseTime,
    onCancel(){
      const view = this.$store.state.tagsView.visitedViews.filter(v => v.path === this.$route.path)
      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
        this.$router.push({
          name: 'quotationList'
        })
      })
    },
    getdetail(){
      quotationInfoDetail({orderNo:this.$route.params.orderNo}).then(res=>{
        if(res.data.code=='success'){
          this.planform=res.data.data
          if(this.planform.quotations && this.planform.quotations.length>0){
            this.data=this.planform.quotations
          }
        }
      })
    }
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
.texttitle{
  font-size:13px;
  padding-left:10px;
}
</style>
