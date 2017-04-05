<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="addCicerone">
        添加人员
      </el-button>
    </content-top>
    <div>
      <el-form :inline="true"
               label-position="left"
               :model="filter">
        <el-form-item label="国家">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="人员类型">
          <el-select clearable
                     v-model="filter.restaurant_type">
            <el-option v-for="item in restType"
                       :key="item.value"
                       :value="item.value"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadRestList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="ciceroneList"
              border
              style="width: 100%">
      <el-table-column fixed
                       prop="province"
                       label="中文名"
                       width="120">
      </el-table-column>
      <el-table-column fixed
                       prop="city"
                       label="英文名"
                       width="120">
      </el-table-column>
      <el-table-column prop="date"
                       label="国别">
      </el-table-column>
      <el-table-column prop="name"
                       label="类别">
      </el-table-column>
  
      <el-table-column prop="address"
                       label="性别">
      </el-table-column>
      <el-table-column prop="zip"
                       label="出生年份"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="工作经验"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="语言"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="证件类型"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="证件编号"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="导游证编号"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="签证国别"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="联系电话"
                       width="120">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="180">
        <template scope="scope">
          <el-button type="text"
                     size="small">编辑信息</el-button>
          <el-button type="text"
                     size="small">编辑费用</el-button>
          <el-button type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import ContentTop from "src/views/components/ContentTop.vue"
export default {
  data() {
    return {
      ciceroneList: [{}],
      filter: {

      }
    }

  },
  methods: {
    addCicerone() {
      this.$router.push({ name: "ADD CICERONE" })
    }
  },
  components: {
    ContentTop
  }
}
</script>
<style lang="scss">

</style>