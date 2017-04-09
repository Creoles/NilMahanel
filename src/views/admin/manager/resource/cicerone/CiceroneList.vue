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
          <el-select v-model="filter.country_id"
                     clearable>
            <el-option v-for="item in countryList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员类型">
          <el-select clearable
                     v-model="filter.type">
            <el-option v-for="item in ciceroneType"
                       :key="item.id"
                       :value="item.id"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadCiceroneList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="ciceroneList"
              v-loading.body="loading"
              border
              style="width: 100%">
      <el-table-column fixed
                       prop="date"
                       label="国家">
      </el-table-column>
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
                     size="small"
                     @click="editCicerone(scope.row.id)">编辑信息</el-button>
          <el-button type="text"
                     size="small"
                     @click="editPrice(scope)">编辑费用</el-button>
          <el-button type="text"
                     size="small"
                     @click="deleteCicerone(scope)">删除</el-button>
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
        country_id: null,
        type: null,
        page: 1,
        number: 20
      },
      ciceroneType: [
        { id: 1, label: '国际导游' },
        { id: 2, label: '司机导游' },
        { id: 3, label: '景点导游' },
        { id: 4, label: '中国翻译' }
      ],
      countryList: [],
      loading: false
    }

  },
  created() {
    this.loadCiceroneList(1);
    this.loadContryList();
  },
  methods: {
    addCicerone() {
      this.$router.push({ name: "ADD CICERONE" })
    },
    editCicerone(id) {
      this.$router.push({ name: "EDIT CICERONE", params: { id: 1 } });
    },
    editPrice() {

    },
    deleteCocerone() {
      //todo
      this.$confirm('此操作将永久删除 ' + scope.row.name + ' 这家商店吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/shop/' + scope.row.id).then(res => {
          if (res.code === 200) {
            this.shopList.splice(scope.$index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        }, err => {
          console.log(err);
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    loadContryList() {
      this.$http.get('/country/all').then(res => {
        if (res.code === 200) {
          this.countryList = res.data;
        } else {
          console.log(res.message);
        }
      }, err => {
        console.log(err);
      })
      this.countryList = [{ id: 1, name: "斯里兰卡", name_en: "Srilanka", "city_data": [{ id: 1, name: "科伦坡", name_en: "asdas" }] }];
    },
    loadCiceroneList(page) {
      this.filter.page = page ? page : this.filter.page;
      this.loading = true;
      //todo
      this.$http.get('/vehicle/search', {
        params: this.filter
      }).then(res => {
        if (res.code === 200) {
          this.ciceroneList = res.data.cicerone_data;
          if (paga === 1) {
            this.total = res.data.total;
          }
          this.loading = false;
        } else {
          this.loading = false;
          console.log(res.message);
        }
      }, err => {
        console.log(err);
        this.loading = false;
      })
    }

  },
  components: {
    ContentTop
  }
}
</script>
<style lang="scss">

</style>