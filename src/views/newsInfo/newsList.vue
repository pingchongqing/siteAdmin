<template lang="html">
<div class="app-container">
	<div class="itemscont" style="padding:0 10px;">
    <el-form :model="planform" ref="ruleForm" label-width="80px" class="ownproductlist">
      <el-row :gutter="5">
        <el-col :span="5">
          <el-form-item label="文章标题:">
            <el-input v-model="planform.title" placeholder="文章标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="作者:">
            <el-input v-model="planform.authorName" placeholder="请输入作者"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
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
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0">
            <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
            <el-button @click="onCancel" size="mini">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button size="mini" type="primary" @click="tonew">新增</el-button>
    <el-table
      :data="list"
      style="width:100%;margin-top:10px;"
      :header-cell-style="{background:'#EAEAED'}"
      ref="multipleTable"
      border>
       <el-table-column
        fixed="left"
        label="文章标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.authorName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间">
        <div slot-scope="scope">
          <span v-if="scope.row.createDate">{{ parseTime(scope.row.createDate,'{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </div>
      </el-table-column>
      <el-table-column
        label="是否显示">
        <div slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            active-color="#13ce66"
            :active-value="0"
            :inactive-value="1"
            @change="changedata(scope.row.id,scope.row.isShow)"
            >
          </el-switch>
        </div>
      </el-table-column>
      <el-table-column
        label="文章权重">
        <div slot-scope="scope">
          <span>{{scope.row.weight}}</span>
        </div>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="180"
        label="操作">
        <div slot-scope="scope" >
          <span @click="todetail(scope.row.id)" style="color:#409EFF;cursor:pointer;margin-right:5px;">查看</span>
          <span @click="modifyNews(scope.row.id)" style="color:#409EFF;cursor:pointer;margin-right:5px;">编辑</span>
          <span style="color:red;cursor:pointer;margin-right:5px;" @click="deleteitem(scope.row.id)">删除</span>
        </div>
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
import { newsInfo, deleteNewsInfo, changeNewsState } from '@/api/newsinfo'
import { parseTime } from '@/utils'
export default {
  name: 'newslist',
  data() {
    return {
      planform: {
         title:null,//用户名
         authorName:null,
         createStartDate:null,
         createEndDate:null
      },
      list:[],
      current:1,
      pageSize: 10,
      total:0,
      dialogbtn:false,
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
      if(this.searchDate.length>0){
        this.planform.createStartDate=this.searchDate[0]
        this.planform.createEndDate=this.searchDate[1]
      }
      newsInfo({pageNum:this.current,pageSize:this.pageSize,...this.planform}).then(
        res => {
          this.total=res.data.data.total
          this.list=res.data.data.list
        }
      ).catch(err => {
        console.log(err)
      })
    },
    onCancel() {
      this.planform.title=null
      this.planform.authorName=null
      this.planform.createStartDate=null
      this.planform.createEndDate=null
      this.searchDate=[]
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
    changedata(id,isShow){
      changeNewsState({id:id,isShow:isShow}).then(res=>{
        if(res.data.code=='success'){
          this.$message.success({message: '操作成功'})
          this.getlist()
        }else{
          this.$message.error({message: res.data.message})
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    todetail(id){
      this.$router.push({
        name: 'newsdetail',
        params:{
          id
        }
      })
    },
    modifyNews(id){
      this.$router.push({
        name: 'modifyNews',
        params:{
          id
        }
      })
    },
    tonew(){
      this.$router.push({
        name: 'newNews'
      })
    },
    deleteitem(id){
      let submitId=id
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_=>{
        deleteNewsInfo(submitId).then(res=>{
          if(res.data.code=='success'){
            this.$message.success({message: '删除成功'})
            this.onSubmit()
          }else{
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
        }).catch(err=>{
          this.$message({
            message:'失败',
            type: 'error'
          })
        })
      }).catch(_=>{
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
.itemscont{background:#fff;padding-bottom:15px;border-radius:5px;}
.companybtn{
  color: #fff;
  background-color: #5868d9;
}
.companybtn:hover{
  background-color:#7180df;
}
</style>
