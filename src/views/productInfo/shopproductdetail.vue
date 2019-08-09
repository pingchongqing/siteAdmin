<template lang="html">
<div class="app-container" style="position:relative;">
  <div style="position:absolute;top:23px;right:39px;z-index:499;">
    <el-button  @click="onCancel()" size="small">返回</el-button>
  </div>
  <el-tabs type="border-card" style="min-height:680px;" v-model="activeName">
    <el-tab-pane label="基本信息" name="basicInfo">
      <el-form :model="planform" ref="ruleForm" label-width="140px">
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="商品SPU编码" v-if="planform.ownproduct.stdProductNo">
              <span>{{planform.ownproduct.stdProductNo}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="商品名称" prop="ownproduct.productName">
              <span>{{planform.ownproduct.productName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="商品简码" prop="ownproduct.mnemonicCode">
              <span>{{planform.ownproduct.mnemonicCode}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="标准分类">
              <span>{{planform.ownproduct.lv1CategoryName+'>'+planform.ownproduct.lv2CategoryName+'>'+planform.ownproduct.lv3CategoryName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="指导价(元)" prop="ownproduct.guidancePrice">
              <span>{{planform.ownproduct.guidancePrice}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="品牌" prop="ownproduct.brandName">
              <span>{{planform.ownproduct.brandName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="最小单位" prop="ownproduct.minUnit">
              <span>{{planform.ownproduct.minUnit}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="商城主题" prop="ownproduct.productTile">
              <span>{{planform.ownproduct.productTile}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="商品主图" prop="ownproduct.pageMainPic">
            <img :src="planform.ownproduct.pictureUrl" style="width:180px;height:120px;cursor:pointer;" v-if="planform.ownproduct.pictureUrl" @click="showBigImg(planform.ownproduct.pictureUrl)">
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="是否直营">
            <el-radio v-model="planform.ownproduct.selfSupport" label="0" :disabled="true" class="settleRadio">是</el-radio>
            <el-radio v-model="planform.ownproduct.selfSupport" label="1" :disabled="true" class="settleRadio">否</el-radio>
          </el-form-item>
        </el-row>
        <el-dialog :visible.sync="imgshowdialog" width="50%" class="imgdialog">
          <img :src="showimgUrl" style="width:100%;">
        </el-dialog>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="销售属性" name="saleudf">
      <saleudf :totalsku="totalsku" @skuevent="gettotalsku"></saleudf>
    </el-tab-pane>
    <el-tab-pane label="基础属性" name="basicudf">
      <basicextend :basicattr="basicattr"></basicextend>
    </el-tab-pane>
    <el-tab-pane label="扩展属性" name="extendudf">
      <extendudf :totalsku="totalsku"></extendudf>
    </el-tab-pane>
    <el-tab-pane label="商品详情" name="productInfo">
      <spdetail :productInfo="productInfo"></spdetail>
    </el-tab-pane>
    <el-tab-pane label="包装规格" name="package">
      <packagerule :totalsku="totalsku"></packagerule>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import axios from 'axios'
import saleudf from './components/saleudf'
import basicextend from './components/basicextend'
import extendudf from './components/extendudf'
import spdetail from './components/spdetail'
import packagerule from './components/packagerule'
import unitconvert from './components/unitconvert'
import { productInfodetail,skuDetail } from '@/api/productinfo'

export default {
  name: 'shopproductdetail',
  data() {
    return {
      planform:{
        ownproduct:{
        }
      },
      basicattr:[],
      totalsku:[],
      productInfo:'',
      imgshowdialog:false,
      showimgUrl:'',
      basicunit:null,
      activeName:'basicInfo',
    }
  },
  components:{
    saleudf,
    basicextend,
    extendudf,
    spdetail,
    packagerule,
    unitconvert
  },
  created() {
    this.start()
  },
  computed:{
  },
  methods: {
    start(){
      this.getAgreeDetail()
      this.gettotalsku()
      if(this.$route.params.type==='check'){
        this.activeName='saleudf'
      }
    },
    getAgreeDetail(){
      productInfodetail(this.$route.params.stdProductNo).then(res=>{
        if(res.data.code=='success'){
          this.planform.ownproduct=res.data.data
          this.basicattr=res.data.data.basicAttr?res.data.data.basicAttr:[]
          this.productInfo=res.data.data.productInfo?res.data.data.productInfo:''
          this.basicunit=res.data.data.minUnit
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    onCancel(){
      const view = this.$store.state.tagsView.visitedViews.filter(v => v.path === this.$route.path)
      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
        this.$router.push({
          name: 'shopproductlist'
        })
      })
    },
    gettotalsku(){
      skuDetail(this.$route.params.stdProductNo).then(res=>{
        if(res.data.code=='success'){
          if(res.data.data && res.data.data.length>0){
            this.totalsku=res.data.data
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    showBigImg(imgurl){
      this.showimgUrl=imgurl
      this.imgshowdialog=true
    },
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
h3 {
  font-size: 14px;
  font-weight: normal;
}
.companybtn{
  color: #fff;
  background-color: #9ec78d;
}
.companybtn:hover{
  background-color:#7ca66d;
}
</style>
