<template lang="html">
<div class="app-container">
	<div class="itemscont">
    <el-form :model="planform" ref="ruleForm" label-width="80px" class="ownproductlist">
      <el-row :gutter="6">
        <el-col :span="5">
          <el-form-item label="询价企业:">
            <el-input v-model="planform.enquiryEnt" placeholder="请输入询价企业"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="报价企业:">
            <el-input v-model="planform.quotationEnt" placeholder="请输入报价企业"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="5">
          <el-form-item label="创建日期:">
            <el-date-picker
              v-model="searchDate"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="-"
              start-placeholder="开始"
              end-placeholder="结束"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col> -->
        <el-col :span="5">
          <el-form-item label="状态:">
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
        label="询盘单号">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报价单号">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="询价企业">
        <template slot-scope="scope">
          <span>{{ scope.row.enquiryEnt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报价企业">
        <template slot-scope="scope">
          <span>{{ scope.row.quotationEnt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="报价日期">
        <template slot-scope="scope">
          <span v-if="scope.row.gmtCreate">{{ parseTime(scope.row.gmtCreate,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status | quationStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="180"
        label="操作">
        <template slot-scope="scope" >
          <span @click="todetail(scope.row.orderNo)" style="color:#409EFF;cursor:pointer;margin-right:5px;">查看</span>
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
import { quotationInfoList } from '@/api/enquiryQuotationInfo'
import { parseTime } from '@/utils'
export default {
  name: 'quotationList',
  data() {
    return {
      planform: {
        enquiryEnt:null,
        status:null,
        quotationEnt:null
      },
      list:[],
      current:1,
      pageSize: 10,
      total:0,
      dialogbtn:false,
      statuslist:[{id:0,value:'待确认'},{id:1,value:'已接受'},{id:2,value:'未接受'},{id:3,value:'已关闭'}],
      searchDate:[],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    parseTime,
    getlist() {
      quotationInfoList({pageNum:this.current,pageSize:this.pageSize,...this.planform}).then(
        res => {
          this.total=res.data.data.total
          this.list=res.data.data.list
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
    todetail(orderNo){
      this.$router.push({
        name: 'quotationdetail',
        params:{
          orderNo
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
