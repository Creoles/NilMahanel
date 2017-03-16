<template>
  <div>
    <content-top></content-top>
    <el-form :model="params" :inline="true">
      <el-form-item label="目的地">
        <el-select v-model="params.type" placeholder="select">
          <!--<el-option v-for="country in countryList"  :label="country.name" :value="country.id"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="params.type" placeholder="select">
          <el-option label="非自助" value="0"></el-option>
          <el-option label="自助/半自助" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出发城市">
        <el-input></el-input>
      </el-form-item>
      <el-form-item lable="航班号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入内容">
          <template slot="append">晚</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入内容">
          <template slot="append">天</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-steps :space="300" direction="vertical">
          <el-step v-for="n in 10" :title="'Day'+n" :key="n"></el-step>
        </el-steps>
      </el-form-item>
      <el-form-item>
        <draggable v-model="myArray">
          <transition-group>
            <div class="day-box" v-for="element in myArray" :key="element.id">
              
            </div>
          </transition-group>
        </draggable>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">
  .day-box {
    width:100%;
    padding:20px;
    margin-bottom:10px;
    background-color:#fff;
  }
</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  import draggable from 'vuedraggable'
    export default{
        data(){
            return{
                params:{},
                myArray:[
                  {id:1,name:'123'},
                  {id:2,name:'234'}
                ]
            }
        },

        methods: {
          loadDestination(){

          },
          onceDayChange(){

          }
        },
        components:{
            ContentTop,
            draggable
        }
    }
  
</script>