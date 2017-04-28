<template>
  <div>
    <content-top>
      <el-button class="add-btn"
                 type="primary"
                 icon="el-icon-plus"
                 @click="addVehicle">
        添加车辆
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
        <el-form-item label="座位数">
          <div style="width:200px">
            <el-input v-model.number="filter.seat">
              <el-select v-model="filter.operation"
                         slot="prepend"
                         placeholder="select"
                         style="width:86px;"
                         clearable
                         @change="operationChange($event)">
                <el-option label="小于"
                           :value="3"></el-option>
                <el-option label="等于"
                           :value="2"></el-option>
                <el-option label="大于"
                           :value="1"></el-option>
              </el-select>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-select v-model="filter.company_id"
                     placeholder="type"
                     clearable>
            <el-option :key="item.id"
                       :value="item.id"
                       :label="item.name"
                       v-for="item in companyList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadVehicleList(1)">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="vehicleList"
              v-loading.body="loading"
              style="width: 100%">
      <el-table-column prop="country_id"
                       label="国家"
                       :formatter="countryFormatter">
      </el-table-column>
      <el-table-column prop="city_id"
                       label="城市"
                       :formatter="cityFormatter">
      </el-table-column>
      <el-table-column prop="vehicle_type"
                       label="型号"
                       width="100">
      </el-table-column>
      <el-table-column prop="seat"
                       label="座位数">
      </el-table-column>
      <el-table-column prop="license"
                       label="车牌号">
      </el-table-column>
      <el-table-column prop="register_number"
                       label="旅游局注册号">
      </el-table-column>
      <el-table-column prop="start_use"
                       label="年限">
      </el-table-column>
      <el-table-column prop="insurance_number"
                       label="保险号">
      </el-table-column>
      <el-table-column prop="telephone"
                       label="联系电话">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editVehicle(scope.row.id)">编辑
          </el-button>
          <el-button type="text"
                     @click="deleteVehicle(scope)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:30px;"
                   v-if="vehicleList.length !== 0"
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
<style lang="scss">
  .add-btn {
    float: right;
  }
</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  import CountrySelect from "src/views/components/CountrySelect.vue"
  export default {
    data() {
      return {
        vehicleList: [],
        filter: {
          country_id: null,
          city_id: null,
          seat: null,
          company_id: null,
          number: 20,
          page: 1,
          //1:小于 2 等于 3 大于
          operation: null
        },
        countryArr: [],
        countryList: [],
        companyList: [],
        loading: false,
        total: 100,
      }
    },
    created() {
      this.loadCountryList();
      this.loadCompanyList();
      this.loadVehicleList(1);
    },
    methods: {
      addVehicle() {
        this.$router.push({name: "ADD VEHICLE"})
      },
      onFilterCountryChange(msg) {
        this.filter.country_id = msg[0];
        this.filter.city_id = msg[1];
      },
      operationChange(){
//        if (!this.filter.operation){
//          this.filter.operation = null;
//          this.filter.seat = null;
//        }
      },
      editVehicle(id) {
        this.$router.push({name: "EDIT VEHICLE", params: {id: id}})
      },
      deleteVehicle(scope) {
        this.$confirm('此操作将永久删除该车辆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/vehicle/' + scope.row.id).then(res => {
            if (res.data.code === 200) {
              this.vehicleList.splice(scope.$index, 1);
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
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
      loadVehicleList(page) {
        this.filter.page = page ? page : this.filter.page;
        this.loading = true;
        this.$http.get('/vehicle/search', {
          params: _.omitBy(this.filter, function (item) {
            return item === ''
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.vehicleList = res.data.data.vehicle_data;
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
      handleSizeChange(size) {
        this.filter.number = size;
        this.loadVehicleList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadVehicleList();
      },
      loadCountryList() {
        this.$http.get('/country/all').then(res => {
          if (res.data.code === 200) {
            this.countryList = res.data.data;
          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err);
        });
      },
      loadCompanyList() {
        this.$http.get('/vehicle_company/search', {params: {is_all: true}}).then(res => {
          if (res.data.code === 200) {
            this.companyList = res.data.data;
          } else {
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
        })
      },
      countryFormatter(row, column) {
        let country = _.find(this.countryList, country => country.id === row.country_id)['name'];
        return country;
      },
      cityFormatter(row, column) {
        let cityList = _.find(this.countryList, country => country.id === row.country_id)['city_data'];
        let city = _.find(cityList, city => city.id === row.city_id)['name'];
        return city;
      }
    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>
