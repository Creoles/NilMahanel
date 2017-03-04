<template>
  <div>
    <content-top></content-top>
    <el-form :model="params" label-position="top" class="scenic-form">
      <el-form-item label="景点名称" prop="name">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <!--<el-form-item label="国家城市">
        <el-cascader
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-form-item>-->
      <el-form-item label="介绍">
        <el-input
          type="textarea"
          autosize
          v-model="params.introduction">
        </el-input>
      </el-form-item>
      <el-form-item label="成人票价">
        <el-input v-model="params.adultPrice"></el-input>
      </el-form-item>
      <el-form-item label="成人票价">
        <el-input v-model="params.childPrice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="!submitting">提 交</el-button>
        <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">
  .scenic-form {
    width:500px;
  }
</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    import  ValidPrice from 'src/util/priceValid.js'
    export default{
        data(){
            return{
                params:{
                },
                submitting:false
            }

        },
        components:{
            ContentTop
        },
        created(){
            
        },
        methods:{
            
        }
    }
</script>