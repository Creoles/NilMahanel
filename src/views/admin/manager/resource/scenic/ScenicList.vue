<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="addScenic">
        添加景点
      </el-button>
    </content-top>
    <div>
      <el-form :inline="true"
               label-position="left"
               :model="filter"
               class="vehicle-filter">
        <el-form-item label="城市及国家">
          <country-select :country="countryArr"
                          v-on:country-change="onFilterCountryChange($event)"></country-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadScenicList(1)">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="scenicList"
              style="width: 100%"
              v-loading.body="loading">
      <el-table-column prop="country"
                       label="国家"
                       :formatter="countryFormatter">
      </el-table-column>
      <el-table-column prop="city"
                       label="城市"
                       :formatter="cityFormatter">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称">
      </el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column>
      <el-table-column prop="adult_fee"
                       label="成人门票(USD)">
      </el-table-column>
      <el-table-column prop="child_fee"
                       label="儿童门票(USD)">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editScenic(scope.row.id)">编辑
          </el-button>
          <el-button type="text"
                     @click="deleteScenic(scope)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:30px;"
                   v-if="scenicList.length !== 0"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="filter.page"
                   :page-sizes="[20, 50, 100, 200]"
                   :page-size="filter.number"
                   layout="total,sizes, prev, pager, next"
                   :total="total">
    </el-pagination>
  </div>
</template>
<style>

</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  import CountrySelect from "src/views/components/CountrySelect.vue"
  export default {
    data() {
      return {
        scenicList: [],
        filter: {
          country_id: null,
          city_id: null,
          page: 1,
          number: 20
        },
        loading: false,
        total: 10,
        countryArr: [],
        countryList: []
      }
    },
    created() {
      this.loadScenicList(1);
      this.loadCountryList();
    },
    methods: {
      addScenic() {
        this.$router.push({name: "ADD SCENIC"})
      },
      editScenic(id) {
        this.$router.push({name: "EDIT SCENIC", params: {id: id}});
      },
      deleteScenic(scope) {
        this.$confirm('此操作将永久删除该景点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/attraction/' + scope.row.id).then(res => {
            if (res.data.code === 200) {
              this.scenicList.splice(scope.$index, 1);
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
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
      onFilterCountryChange(msg) {
        this.filter.country_id = msg[0];
        this.filter.city_id = msg[1];
      },
      loadScenicList(page) {
        this.filter.page = page ? page : this.filter.page;
        this.loading = true;
        this.$http.get('/attraction/search', {
          params: _.omitBy(this.filter, function (item) {
            return item === ''
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.scenicList = res.data.data.attraction_data;
            if (page === 1) {
              this.total = res.data.data.total;
            }
            this.loading = false;
          } else {
            this.loading = false;
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
          this.loading = false;
        })
      },
      loadCountryList() {
        this.$http.get('/country/all').then(res => {
          if (res.data.code === 200) {
            this.countryList = res.data.data;
          } else {
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
        });
      },
      handleSizeChange(size) {
        this.filter.number = size;
        this.loadScenicList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadScenicList();
      },
      countryFormatter(row, column) {
        let country = this.countryList.filter(country =>
          country.id === row.country_id
        )[0]['name']
        return country;
      },
      cityFormatter(row, column) {
        let cityList = this.countryList.filter(country =>
          country.id === row.country_id
        )[0]['city_data'];
        let city = cityList.filter(city =>
          city.id === row.city_id
        )[0]['name'];
        return city;
      }

    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>