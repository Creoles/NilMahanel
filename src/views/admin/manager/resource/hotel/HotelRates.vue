<template>
  <content-top></content-top>
  <div class="hotel-rates">
    <el-form>
      <div>
        <h5>成人费率</h5>
        <el-form-item label="时间段">
          <el-date-picker
            v-model=""
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="餐饮类型">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="单间价格">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="标间价格">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="三人间价格">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="套间价格">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="导游房价格">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="领队房价格">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="预留利润">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="预留利润">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<style lang="scss">
  
</style>
<script>
  export default {
    data(){

    },
    methods(){
      
    }
  }
</script>