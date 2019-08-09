<template lang="html">
<div class="app-container">
	<div class="itemscont">
    <el-form :model="planform" ref="ruleForm" label-width="80px" class="ownproductlist">
      <el-row :gutter="6">
        <el-col :span="5">
          <el-form-item label="会员名称:">
            <el-input v-model="planform.entName" placeholder="请输入会员名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="手机号码:">
            <el-input v-model="planform.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="会员类型:">
            <el-select
              style="width:100%;"
              v-model="planform.userType"
              filterable
              placeholder="请选择"
              >
              <el-option
                v-for="item in companytypelist"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="5">
          <el-form-item label="状态:">
            <el-select
              style="width:100%;"
              v-model="planform.checkStatus"
              filterable
              placeholder="请选择"
              >
              <el-option
                v-for="item in accessStatus"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
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
        label="会员编号">
        <template slot-scope="scope">
          <span>{{ scope.row.entNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号码">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="企业名称">
        <template slot-scope="scope">
          <span>{{ scope.row.entName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.accountType | accountTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.checkState | checkStateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="注册日期">
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">{{ parseTime(scope.row.createTime,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="180"
        label="操作">
        <template slot-scope="scope" >
          <span @click="todetail(scope.row.entNo,'detail')" style="color:#409EFF;cursor:pointer;margin-right:5px;">查看</span>
          <span v-if="scope.row.checkState==0" @click="todetail(scope.row.entNo,'check')" style="color:#409EFF;cursor:pointer;">审核</span>
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
     <!-- 意见 -->
    <!--   <el-dialog title="意见" :visible.sync="editdialog" width="40%">
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
    </el-dialog> -->
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { companyInfoList } from '@/api/companyinfo'
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
      companytypelist:[{id:0,value:'普通会员'},{id:1,value:'客户'},{id:2,value:'供应商'},{id:3,value:'客户供应商'}],
      accessStatus:[{id:-1,value:'驳回'},{id:0,value:'待准入'},{id:1,value:'已准入'}],
      // planform2:{
      //   productNo:null,
      //   checkStatus:3,
      //   checkOpinion:null
      // },
      // rules:{
      //   checkOpinion: [
      //     { required: true, message: '请填写意见', trigger: 'change' }
      // ]
      // },
      // editdialog:false,
      // dialogbtn:false
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    parseTime,
    getlist() {
      companyInfoList({pageNum:this.current,pageSize:this.pageSize,...this.planform}).then(
        res => {
          this.total=res.data.data.total
          this.list=res.data.data.records
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
    todetail(entNo,type){
      this.$router.push({
        name: 'companydetail',
        params:{
          entNo,
          type
        }
      })
    },
    // checkcompany(){
    //   this.editdialog=true
    // },
    // onSubmit(){
    //   this.$refs['createForm'].validate((valid) =>{
    //     if(valid){
    //       this.dialogbtn=true
    //       this.confirmsku(this.planform2.productNo,this.planform2.checkStatus,this.planform2.checkOpinion)
    //     }
    //   })
    // },
    // closedialog(){
    //   this.planform2.productNo=null
    //   this.planform2.checkOpinion=null
    //   this.editdialog=false
    // },
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
