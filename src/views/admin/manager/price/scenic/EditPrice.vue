<template>
  <div>
    <content-top>
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
      <el-table-column prop="name_en" label="英文名称">
      </el-table-column>
      <el-table-column prop="nickname_en" label="英文简称"></el-table-column>
      <el-table-column prop="address"
                       label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="openPrice(scope.row.id)">编辑
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
    <el-dialog title="编辑价格"
               v-model="dialogPrice"
               size="large" v-on:close="closeDialog">
      <div>
        <el-form :model="priceModel" label-position="top" :inline="true">
          <el-form-item label="公开价格">
            <el-input v-model="priceModel.public_price"></el-input>
          </el-form-item>
          <el-form-item label="公司价格">
            <el-input v-model.number="priceModel.company_price"></el-input>
          </el-form-item>
          <el-form-item label="导游价格">
            <el-input v-model.number="priceModel.tour_guide_price"></el-input>
          </el-form-item>
          <el-form-item label="翻译价格">
            <el-input v-model.number="priceModel.translator_price"></el-input>
          </el-form-item>
          <el-form-item label="多少免一">
            <el-input v-model.number="priceModel.free_policy"></el-input>
          </el-form-item>
          <el-form-item label="儿童折扣(0-1)">
            <el-input v-model="priceModel.child_discount"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="priceModel.note"></el-input>
          </el-form-item>
          <el-form-item style="vertical-align: bottom">
            <el-button type="primary" @click="submitPrice">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
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
        countryList: [],
        priceModel: {
          attraction_id: null,
          public_price: null,
          company_price: null,
          tour_guide_price: null,
          translator_price: null,
          free_policy: null,
          child_discount: null,
          note: null
        },
        dialogPrice: false
      }
    },
    created() {
      this.loadScenicList(1);
      this.loadCountryList();
    },
    methods: {
      openPrice(id){
        this.dialogPrice = true;
        this.priceModel.attraction_id = id;
        this.$http.get('/attraction/fee/attraction/' + id).then(res => {
          if (res.data.code === 200) {
            if (res.data.data.id) {
              this.priceModel = res.data.data;
            }
          } else {
            console.log(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      closeDialog(){
        this.priceModel = {
          attraction_id: null,
          public_price: null,
          company_price: null,
          tour_guide_price: null,
          translator_price: null,
          free_policy: null,
          child_discount: null,
          note: null
        };
      },
      submitPrice(){
        if (this.priceModel.id) {
          this.$http.put('/attraction/fee/' + this.priceModel.id, _.omitBy(this.priceModel, function (item) {
            return item === '' || item === null
          })).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '保存成功'
              });
              this.dialogPrice = false;
            } else {
              this.$message({
                type: 'success',
                message: res.data.message
              });
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          this.$http.post('/attraction/fee/create', _.omitBy(this.priceModel, function (item) {
            return item === '' || item === null
          })).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '保存成功'
              });
              this.dialogPrice = false;
            } else {
              this.$message({
                type: 'success',
                message: res.data.message
              });
            }
          }).catch(err => {
            console.log(err);
          })
        }

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