<template>
  <div>
    <el-table :data="productList">
      <el-table-column label="ID" prop="id">
        
      </el-table-column>
      <el-table-column label="类型" prop="type">

      </el-table-column>
      <el-table-column label="出发城市">
      
      </el-table-column>
      <el-table-column label="航班号">

      </el-table-column>
      <el-table-column lable="几天几晚">
      </el-table-column>
      <el-table-column lable="备注">
      
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss">
  
</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
    export default{
        data(){
            return{
                productList:[]
            }
        },

        methods: {

        },
        components:{
            ContentTop
        }
    }
</script>