<template>
  <div>
    <content-top></content-top>
    <el-form :inline="true" label-position="top" :model="scheduleForm">
      <el-form-item label="选择目的地">
        <el-select v-model="scheduleForm.target">
          <el-option label="斯里兰卡" :value="1"></el-option>
          <el-option label="马尔代夫" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行程天数">
        <el-input-number v-model="scheduleForm.night" @change="handleChange" :min="1" :max="10"></el-input-number>晚
        <el-input-number v-model="scheduleForm.day" @change="handleChange" :min="1" :max="10"></el-input-number>天
      </el-form-item>
      <br>
      <el-form-item label="产品类型">
        <el-select v-model="scheduleForm.type">
          <el-option label=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出发城市">
        <el-select v-model="scheduleForm.type">
          <el-option label=""></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="选择出游日期">
        <el-date-picker
          v-model="scheduleForm.departDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>

    </el-form>
  </div>
</template>
<style>

</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  export default {
    data(){
      return {
        scheduleForm:{
          target:null,
          night:null,
          day:null,
          type:null,
          from:null,
          departDate:null,
          peopleNum:null,
          flight:null
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      }
    },
    components: {
      ContentTop
    }

  }
</script>