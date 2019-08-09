<template>
  <div>
    <el-table
      :data="list5"
      style="width:100%;margin-top:20px;"
      :header-cell-style="{background:'#E4EEF0'}"
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
        label="换算前单位"
        >
        <template slot-scope="scope">
          <span >{{ spuUnit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="单位比例"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="换算后单位"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import { uniquecategory } from '@/api/bussinesscategory'
export default {
  name: 'unitconvert',
  data() {
    return {
      list5:[],
      spuUnit:null,
    }
  },
  created() {
  },
  watch: {
    totalsku: function (val) {
      if(val && val.length>0){
        const owndata=val
        const ownobject=[]
        owndata.map(item=>{
          if(item.unitConvert){
            for(let i in item.unitConvert){
              if(i=='num'){
               item.num=item.unitConvert.num
                item.unit=item.unitConvert.unit
                ownobject.push(item)
              }
            }
          }
        })
        this.list5=ownobject
      }else{
        this.list5=[]
      }
    },
    basicunit: function(val){
      this.spuUnit=val
    }
  },
  props:['totalsku','basicunit'],
  methods: {
  }
}
</script>