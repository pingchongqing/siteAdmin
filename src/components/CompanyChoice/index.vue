<template lang="html">
  <div>
    <el-form :inline="true" :model="postForm" class="demo-form-inline" labelWidth="120px">
      <el-form-item label="企业编号">
        <el-input v-model="postForm.code" placeholder="请输入企业编号"></el-input>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="postForm.name" placeholder="请输入企业名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button  @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="currentData" ref="singleTable" highlight-current-row @current-change="handleCurrentChange" :loading="loading">
      <el-table-column property="code" label="企业编号" ></el-table-column>
      <el-table-column property="name" label="企业名称" ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      postForm: {
        code: '',
        name: ''
      },
      pagesize: 10,
      pageindex: 1,
      total: 0,
      currentPage: 1,
      currentData: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      gridData: 'gysList'
    })
  },
  created() {
    if (!this.gridData.length) {
      this.loading = true
      this.$store.dispatch('GetGysList').then(() => {
        this.loading = false
        this.getCurrentData()
      })
    } else {
      this.getCurrentData()
    }
  },
  methods: {
    onSubmit() {
      const SearchData = this.gridData.filter(company => {
        return company.name.includes(this.postForm.name) && company.code.includes(this.postForm.code)
      })
      this.getCurrentData(SearchData)
    },
    onReset() {
      this.pageindex = 1
      this.pagesize = 10
      this.postForm = {
        code: '',
        name: ''
      }
      this.getCurrentData()
    },
    handleCurrentChange(row) {
      if (row) {
        this.$emit('subCompany', row)
        this.$emit('diClose')
      }
    },
    getCurrentData(data) {
      const CopyList = data || [...this.gridData]
      this.currentData = CopyList.slice((this.pageindex - 1) * this.pagesize, this.pagesize * this.pageindex)
      this.total = data ? data.length : this.gridData.length
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getCurrentData()
    },
    handleCurrentPageChange(val) {
      this.pageindex = val
      this.getCurrentData()
    }
  }
}
</script>

<style lang="css">
</style>
