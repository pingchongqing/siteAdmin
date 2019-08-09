<template lang="html">
<div class="app-container">
  <div class="formcontain" v-loading="loading" style="position:relative;">
    <div style="text-align:right;">
      <template v-if="this.$route.params.type==='check'">
        <el-button @click="editdialog=true;" type="primary" size="mini">审核</el-button>
      </template>
      <el-button @click="onCancel" size="mini">返回</el-button>
    </div>
    <el-form :model="planform" ref="ruleForm" label-width="160px">
      <div class="textTitle">基本信息</div>
      <el-row :gutter="30" style="border-bottom:1px solid #ebeef5;color:##606266;margin-bottom:15px;">
        <el-col :span="8">
          <el-form-item label="企业编码:">
            <span>{{planform.entNumber}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业名称:">
            <span>{{planform.entName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业类型:">
            <span>{{planform.entType | accountTypeFilter }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册地址:">
            <span>{{planform.registerAddress}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册资本(万元):">
            <span>{{planform.registerMoney }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信用代码:">
            <span>{{planform.businessLicenseNo}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="营业执照附件:">
            <a :href="planform.attachmentUrl" target="_blank" style="color:#409EFF;">附件</a>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="textTitle">联系人</div>
      <el-row style="border-bottom:1px solid #ebeef5;color:##606266;margin-bottom:15px;">
        <el-col :span="8">
          <el-form-item label="联系人:">
            <span>{{ planform.linkName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话:">
            <span>{{ planform.linkPhone }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="textTitle">法人</div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="法人:">
            <span>{{ planform.legalPerson }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人电话:">
            <span>{{ planform.legalPersonPhone }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="border-bottom:1px solid #ebeef5;color:##606266;margin-bottom:15px;">
        <el-col :span="8">
          <el-form-item label="身份证正面:">
            <img :src="planform.legalIdentityPositiveImg"  style="width:180px;height:180px;" @click="showBigImg(planform.legalIdentityPositiveImg)" v-if="planform.legalIdentityPositiveImg"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证反面:">
            <img :src="planform.legalIdentityNegativeImg"  style="width:180px;height:180px;" @click="showBigImg(planform.legalIdentityNegativeImg)" v-if="planform.legalIdentityNegativeImg"/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="textTitle">税务信息</div>
       <el-row>
        <el-col :span="8">
          <el-form-item label="纳税人识别号:">
            <span>{{ planform.taxpayerId }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户银行:">
            <span>{{ planform.bankName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="户名:">
            <span>{{ planform.accountName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户账号:">
            <span>{{ planform.bankNo }}</span>
          </el-form-item>
        </el-col>
      </el-row>
     <!--  图片放大 -->
      <el-dialog :visible.sync="imgshowdialog" width="25%" class="imgdialog">
        <img :src="showimgUrl" style="width:100%;">
      </el-dialog>
      <!-- 审核 -->
      <el-dialog title="审核" :visible.sync="editdialog" width="40%">
        <div class="formdetail">
          <el-form :model="planform2" ref="createForm" label-width="120px">
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
          <el-button type="primary" @click="onSubmit('agree')" :disabled="dialogbtn">同意</el-button>
          <el-button type="danger" @click="onSubmit('unagree')" :disabled="dialogbtn">驳回</el-button>
        </div>
    </el-dialog>
    </el-form>
  </div>
</div>
</template>

<script>
import { userInfoDetail, companyInfoDetail, companyInfoCheck } from '@/api/companyinfo'
import { parseTime } from '@/utils'
export default {
  name: 'companydetail',
  data() {
    return {
      planform: {
      },
      imgshowdialog:false,
      showimgUrl:null,
      loading:false,
      data:[],
      planform2:{
        enterpriseCheckRecordId:null,
        checkStatus:null,
        checkOpinion:null
      },
      editdialog:false,
      dialogbtn:false
    }
  },
  created() {
    this.getcompanydetail()
  },
  computed:{
  },
  methods: {
    parseTime,
    onCancel(){
      const view = this.$store.state.tagsView.visitedViews.filter(v => v.path === this.$route.path)
      this.$store.dispatch('delVisitedViews', view[0]).then(() => {
        this.$router.push({
          name: 'companyList'
        })
      })
    },
    getcompanydetail(){
      companyInfoDetail({entNumber:this.$route.params.entNo}).then(res=>{
        this.planform=res.data.data
      }).catch(err=>{
        console.log(err)
      })
    },
    showBigImg(imgurl){
      this.showimgUrl=imgurl
      this.imgshowdialog=true
    },
    closedialog(){
      this.editdialog=false
    },
    onSubmit(type){
      this.planform2.enterpriseCheckRecordId=this.planform.enterpriseCheckRecordId
      this.planform2.checkStatus=(type=='agree')?1:-1
      this.dialogbtn=true
      console.log(this.planform2)
      if(type=='unagree' && !this.planform2.checkOpinion){
        this.$message.error('意见必填')
        this.dialogbtn=false
        return
      }
      companyInfoCheck(this.planform2).then(res=>{
        if(res.data.code=='success'){
          this.$message.success(res.data.message)
          this.onCancel()
        }else{
          this.$message.error(res.data.message)
          this.dialogbtn=false
        }
      }).catch(err=>{
        console.log(err)
      })
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
