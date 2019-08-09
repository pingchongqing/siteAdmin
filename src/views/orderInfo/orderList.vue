<template lang="html">
<div class="app-container">
	<div class="itemscont">
    <el-form :model="planform" ref="ruleForm" label-width="80px" class="ownproductlist">
      <el-row :gutter="6">
        <el-col :span="5">
          <el-form-item label="订单编号:">
            <el-input v-model="planform.ticketNo" placeholder="请输入订单编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="买家名称:">
            <el-input v-model="planform.customerName" placeholder="请输入买家名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="卖家名称:">
            <el-input v-model="planform.serviceName" placeholder="请输入卖家名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单状态:">
            <el-select
              style="width:100%;"
              v-model="planform.status"
              filterable
              placeholder="请选择"
              >
              <el-option
                v-for="item in statuslist"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="付款状态:">
            <el-select
              style="width:100%;"
              v-model="planform.payStatus"
              filterable
              placeholder="请选择"
              >
              <el-option
                v-for="item in payStatuslist"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="收货状态:">
            <el-select
              style="width:100%;"
              v-model="planform.sendStatus"
              filterable
              placeholder="请选择"
              >
              <el-option
                v-for="item in sendStatuslist"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0">
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
            <el-button @click="onCancel" size="mini">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="list"
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
        label="买家名称">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="卖家名称">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下单时间">
        <template slot-scope="scope">
          <span v-if="scope.row.gmtCreate">{{ parseTime(scope.row.gmtCreate,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="交货日期">
        <template slot-scope="scope">
          <span v-if="scope.row.planDeliveryDate">{{ parseTime(scope.row.planDeliveryDate,'{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
       <el-table-column
        label="总金额">
        <template slot-scope="scope">
          <span v-if="scope.row.sumAmount">{{'¥'+(scope.row.sumAmount.toFixed(2))+'元' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="180"
        label="操作">
        <template slot-scope="scope" >
          <span @click="todetail(scope.row.id)" style="color:#409EFF;cursor:pointer;margin-right:5px;">查看</span>
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
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { orderInfoList } from '@/api/orderinfo'
import { parseTime } from '@/utils'
export default {
  name: 'orderList',
  data() {
    return {
      planform: {
        ticketNo:null,
        customerName:null,
        serviceName:null,
        status:null,
        payStatus:null,
        sendStatus:null
      },
      list:[],
      current:1,
      pageSize: 10,
      total:0,
      dialogbtn:false,
      statuslist:[{id:0,value:'待确认'},{id:1,value:'已确认'},{id:2,value:'已取消'}],
      payStatuslist:[{id:0,value:'未付款'},{id:1,value:'部分付款'},{id:2,value:'付款完成'}],
      sendStatuslist:[{id:0,value:'未发货'},{id:1,value:'部分发货'},{id:2,value:'发货完成'}],
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    parseTime,
    getlist() {
      orderInfoList({pageNum:this.current,pageSize:this.pageSize,...this.planform}).then(
        res => {
          this.total=res.data.data.total
          this.list=res.data.data.items
        }
      ).catch(err => {
        console.log(err)
      })
    },
    onCancel() {
      for(let i  in this.planform){
        this.planform[i]=null
      }
      this.current=1
      this.pageSize=10
      this.getlist()
    },
    onSubmit() {
      this.current=1
      this.pageSize=10
      this.getlist()
    },
    handleCurrentPageChange(val) {
      this.current = val
      this.getlist()
    },
    todetail(id){
      this.$router.push({
        name: 'orderdetail',
        params:{
          id
        }
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
.ownproductlist{margin-bottom:10px;padding:20px 0 0;border-bottom:1px solid #ebeef5;}
.showform-enter-active, .showform-leave-active {
  transition: opacity .5s;
}
.showform-enter, .showform-leave-to {
  opacity: 0;
}
.itemscont{background:#fff;padding:0 10px;border-radius:5px;}
.companybtn{
  color: #fff;
  background-color: #5868d9;
}
.companybtn:hover{
  background-color:#7180df;
}
</style>
