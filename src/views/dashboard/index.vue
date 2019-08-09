<template>
  <div class="dashboard-container">
    <div style="margin-top:110px;">欢迎进入金刚运营中心</div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data(){
    return {
      username:'',
    }
  },
  created(){
  },
  methods:{
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box-card {
  width: 32%;
  float: left;
  margin-right: 2%;
  height: 188px;
  &:last-child {
    margin-right: 0;
  }
}
.elsuccess {
  color: green;
}
.elwarning {
  color: #ff6600;
}
.submitButton{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
.submitButton.primary {
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
}
.submitButton.is-disabled, .submitButton.is-disabled:focus, .submitButton.is-disabled:hover {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
}
.chartselect {
  border: 0;
  outline: none;
}
</style>
