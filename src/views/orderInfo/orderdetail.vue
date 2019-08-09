<template lang="html">
<div class="app-container">
  <div class="formcontain" v-loading="loading">
    <el-form :model="planform" ref="ruleForm" label-width="160px">
      <div>订单信息</div>
      <el-row :gutter="30" style="border-bottom:1px solid  #EBEEF5;margin-bottom:20px;">
        <el-col :span="8">
          <el-form-item label="订单号:">
            <span>{{planform.ticketNo}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="买家名称:">
            <span>{{planform.customerName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="卖家名称:">
            <span>{{planform.serviceName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单状态:">
            <span>{{planform.status | statusFilter}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款状态:">
            <span>{{planform.payStatus | payStatusFilter}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发货状态:">
            <span>{{planform.sendStatus | sendStatusFilter }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总金额:">
            <span v-if="planform.sumAmount">{{'¥'+(planform.sumAmount.toFixed(2))+'元'}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间:">
            <span v-if="planform.gmtCreate">{{parseTime(planform.gmtCreate,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交货日期:">
            <span v-if="planform.planDeliveryDate">{{parseTime(planform.planDeliveryDate,'{y}-{m}-{d}')}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div>商品明细</div>
      <el-table
      :data="data"
      style="width:100%;margin-top:10px;"
      :header-cell-style="{background:'#EAEAED'}"
      ref="multipleTable"
      border>
       <el-table-column
        fixed="left"
        width="160px"
        label="订单编号">
        <template slot-scope="scope">
          <span>{{ scope.row.ticketNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品编码">
        <template slot-scope="scope">
          <span>{{ scope.row.materialNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.materialName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="规格型号">
        <template slot-scope="scope">
          <span>{{ scope.row.materialRule }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        label="数量">
        <template slot-scope="scope">
          <span>{{ scope.row.materialNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结算单位">
        <template slot-scope="scope">
          <span>{{ scope.row.settlementUnitName }}</span>
        </template>
      </el-table-column>
       <el-table-column
        label="价格">
        <template slot-scope="scope">
          <span v-if="scope.row.price">{{'¥'+(scope.row.price.toFixed(2))+'元' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:20px;text-align:center;">
      <el-button @click="onCancel">返回</el-button>
    </div>
    </el-form>
  </div>
</div>
</template>

<script>
import { orderInfoDetail } from '@/api/orderinfo'
import { parseTime } from '@/utils'
export default {
  name: 'orderdetail',
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
          name: 'orderList'
        })
      })
    },
    getdetail(){
      orderInfoDetail(this.$route.params.id).then(res=>{
        if(res.data.code=='success'){
          this.planform=res.data.data
          if(this.planform.items && this.planform.items.length>0){
            this.data=this.planform.items
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
</style>
