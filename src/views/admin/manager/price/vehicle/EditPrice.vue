<template>
  <div>
    <content-top></content-top>
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
                     @click="loadVehicleList(1)">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="vehicleList" v-loading.body="loading">
      <el-table-column prop="country_id" label="国家">
      </el-table-column>
      <el-table-column prop="city_id" label="地区">
      </el-table-column>
      <el-table-column prop="" label="车型"></el-table-column>
      <el-table-column prop="" label="所属公司"></el-table-column>
      <el-table-column prop="" label="车型"></el-table-column>
      <el-table-column prop="" label="车牌号"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editPrice(scope.row.id)">编辑价格
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog id="vehiclePrice"
               title="编辑车辆价格"
               v-model="dialogPrice"
               size="large">
      <el-form :inline="true"
               label-position="top">

      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  import CountrySelect from "src/views/components/CountrySelect.vue"
  export default {
    data(){
      return {
        vehicleList: [],
        filter: {
          page: 1,
          number: 20,
          country_id: null,
          city_id: null
        },
        total: null,
        loading: null
      }
    },
    methods: {
      editPrice(){

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
      }
    },
    components: {
      CountrySelect,
      ContentTop
    }
  }
</script>