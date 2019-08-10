<template lang="html">
<div class="app-container">
	<div class="itemscont" style="padding:0 10px;">
    <el-form :model="planform" ref="ruleForm" label-width="80px" class="ownproductlist">
      <el-row :gutter="5">
        <el-col :span="5">
          <el-form-item label="文章标题:">
            <el-input v-model="planform.title" placeholder="文章标题" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
        <el-form-item label="资讯分类">
            <el-select
              style="width:100%;"
              v-model="planform.categoryId"
              size="small"
              filterable
              placeholder="请选择"
              >
              <el-option
                v-for="item in categorylist"
                :key="item._id"
                :label="item.className"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="作者:">
            <el-input v-model="planform.authorName" placeholder="请输入作者" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建日期:">
            <el-date-picker
              v-model="planform.createDate"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="-"
              start-placeholder="开始"
              end-placeholder="结束"
              size="small"
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
      v-loading="loading"
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
        fixed="left"
        label="文章分类">
        <template slot-scope="scope">
          <span>{{ scope.row.categoryId.className }}</span>
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
          <span @click="modifyNews(scope.row._id)" style="color:#409EFF;cursor:pointer;margin-right:5px;">编辑</span>
          <span style="color:red;cursor:pointer;margin-right:5px;" @click="deleteitem(scope.row._id)">删除</span>
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
import { newsInfo, deleteNewsInfo, changeNewsState, newsCategoryInfo } from '@/api/newsinfo'
import { parseTime } from '@/utils'
export default {
  name: 'newslist',
  data() {
    return {
      planform: {},
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
      loading: false,
      categorylist: []
    }
  },
  created() {
    this.getlist()
    this.getcategorylist()
  },
  methods: {
    parseTime,
    getcategorylist(){
      newsCategoryInfo().then(
        res => {
          this.categorylist=res.data.data
        }
      ).catch(err => {
        console.log(err)
      })
    },
    getlist() {
      this.loading = true
      newsInfo({pageNum:this.current,pageSize:this.pageSize,...this.planform}).then(
        res => {
          this.loading = false
          this.total=res.data.data.total
          this.list=res.data.data.list
        }
      ).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    onCancel() {
      this.planform={}
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
    modifyNews(id){
      this.$router.push({
        name: 'newNews',
        query: {_id: id}
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
          this.$message.success({message: '删除成功'})
          this.onSubmit()
        }).catch(err=>{
          console.log(err)
        })
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
