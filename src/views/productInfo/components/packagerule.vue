<template>
  <div>
    <el-table
      :data="list5"
      style="width:100%;margin-top:20px;"
      :header-cell-style="{background:'#EAEAED'}"
      border
      >
      <el-table-column
        label="规格属性名称"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.ruleName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="长度(mm)"
        width="100"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="宽度(mm)"
        width="100"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.width }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="高度(mm)"
        width="100"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.height }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="重量(kg)"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.length }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import { uniquecategory } from '@/api/bussinesscategory'
export default {
  name: 'extendudf',
  data() {
    return {
      publicudf:[],
      checkpublic:[],
      list5:[]
    }
  },
  created() {
  },
  watch: {
  totalsku: function (val) {
    if(val && val.length>0){
      const owndata=val
      const ownlist=[]
      owndata.map(item=>{
        if(item.packJson && item.packJson.length>0){
          item.packJson.map(child=>{
            item[child.packKey]=child.packValue
          })
          ownlist.push(item)
        }
      })
      this.list5=ownlist
      // console.log(this.list5)
    }else{
      this.list5=[]
    }
   }
  },
  props:['totalsku'],
  methods: {
   getcategoryudf(){
    let ownlist=[]
  uniquecategory({id:this.$route.params.categorySpId}).then(res=>{
    if(res.data.code=='success'){
      if(res.data.data==null){
        this.publicudf=[]
      }else{
       if(res.data.data.udf2){
        ownlist=JSON.parse(res.data.data.udf2)
        for(let i=0;i<ownlist.length;i++){
          if(ownlist[i].value){
            if(ownlist[i].value.indexOf(',')>-1){
             ownlist[i].value=ownlist[i].value.split(",")
            }else{
              let valuelist=[]
              valuelist.push(ownlist[i].value)
              ownlist[i].value=valuelist
            }
          }
        }
        this.publicudf=ownlist
       }else{
        this.publicudf=[]
       }
      }
    }
     }).catch(err=>{
      console.log(err)
     })
   },
  }
}
</script>