<template>
  <div>
    <content-top></content-top>
    <div>
      <el-form :inline="true"
               label-position="left"
               :model="filter">
        <el-form-item label="城市及国家">
          <country-select :country="countryArr"
                          v-on:country-change="onFilterCountryChange($event)"></country-select>
        </el-form-item>
        <el-form-item label="餐厅类型">
          <el-select clearable
                     v-model="filter.restaurant_type" placeholder="select">
            <el-option v-for="item in restType"
                       :key="item.value"
                       :value="item.value"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadRestList(1)">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="restaurantList"
              v-loading.body="loading"
              border
              style="width: 100%">
      <el-table-column prop="country_id"
                       label="国家"
                       :formatter="countryFormatter">
      </el-table-column>
      <el-table-column prop="city_id"
                       label="城市"
                       :formatter="cityFormatter">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称">
      </el-table-column>
      <el-table-column prop="name_en"
                       label="英文名称">
      </el-table-column>
      <el-table-column prop="restaurant_type"
                       label="类型"
                       :formatter="restTypeFormatter">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button type="text"
                     size="small"
                     @click="editMeal(scope)">编辑费用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:30px;"
                   v-if="restaurantList.length !== 0"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="filter.page"
                   :page-sizes="[20, 50, 100, 200]"
                   :page-size="filter.number"
                   layout="total,sizes, prev, pager, next"
                   :total="total">
    </el-pagination>
    <el-dialog id="rest-price"
               title="编辑价格"
               v-model="dialogMeal"
               size="large"
               v-on:close="onDialogClose">
      <el-form :inline="true">
        <div>
          <el-button type="primary"
                     style="margin-bottom:10px;"
                     @click="addOneMeal">添加一条
          </el-button>
        </div>
        <div v-for="(item,index) in mealModel"
             class="price-box">
          <el-form-item label="套餐类型">
            <el-select v-model="item.meal_type"
                       class="price-width"
                       :disabled="item.id != null">
              <el-option label="标准餐"
                         :value="1"></el-option>
              <el-option label="升级餐"
                         :value="2"></el-option>
              <el-option label="豪华餐"
                         :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成人报价">
            <el-input v-model.number="item.adult_fee"
                      class="price-width"></el-input>
          </el-form-item>
          <el-form-item label="成人成本">
            <el-input v-model.number="item.adult_cost"
                      class="price-width"></el-input>
          </el-form-item>
          <el-form-item label="儿童报价">
            <el-input v-model.number="item.child_fee"
                      class="price-width"></el-input>
          </el-form-item>
          <el-form-item label="儿童成本">
            <el-input v-model.number="item.child_cost"
                      class="price-width"></el-input>
          </el-form-item>
          <el-form-item scope="scope">
            <i class="el-icon-circle-cross"
               style="cursor:pointer"
               @click="deleteMeal(item.id,index)"></i>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogMeal = false"
                   v-if="!submitting">取 消
        </el-button>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitMeal">确 定
        </el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import CountrySelect from "src/views/components/CountrySelect.vue"
  import ContentTop from "src/views/components/ContentTop.vue"
  export default {
    data(){
      return {
        filter: {
          country_id: null,
          restaurant_type: null,
          page: 1,
          number: 20
        },
        total: null,
        countryList: [],
        loading: false,
        restaurantList: [],
        dialogPrice: false,
        currentRestId: null,
        countryArr: [],
        currentPriceName: {
          name: null,
          name_en: null,
        },
        priceModel: {
          id: null,
          restaurant_id: null,
          currency: null,
          base_fee: null,
          service_type: null,
          service_fee: null
        },
        priceLoading: false,
        submitting: false,
        dialogMeal: false,
        mealModel: [],
        deleteList: [],
        restType: [
          {value: 1, label: '中餐'},
          {value: 2, label: '特色'},
          {value: 3, label: '西餐'},
          {value: 4, label: '综合'},
          {value: 4, label: '其他'},
        ]

      }
    },
    created(){
      axios.all([this.loadCountryList(), this.loadRestList(1)
      ]).then(axios.spread((res1, res2) => {
        console.log("done");
      }));
    },
    methods: {
      handleSizeChange(size) {
        this.filter.number = size;
        this.loadRestList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadRestList();
      },
      editMeal(scope) {
        this.currentRestId = scope.row.id;
        this.$http.get('/restaurant/meal/' + this.currentRestId).then(res => {
          if (res.data.code === 200) {
            this.mealModel = res.data.data;
          } else {
            this.$message({
              type: 'error',
              message: '加载价格失败,请重试!'
            });
            this.dialogMeal = false;
          }
        });
        this.dialogMeal = true;
      },
      onDialogClose() {
        this.deleteList = [];
        this.loadRestList();
      },
      deleteMeal(id, index) {
        if (id) {
          this.deleteList.push(id);
        }
        this.mealModel.splice(index, 1);
      },
      addOneMeal() {
        this.mealModel.push({
          id: null,
          restaurant_id: this.currentRestId,
          meal_type: null,
          adult_fee: null,
          adult_cost: null,
          child_fee: null,
          child_cost: null
        });
      },
      submitMeal() {
        this.submitting = true;
        let updateList = [];
        let createList = [];
        let paramsList = {};
        _.forIn(this.mealModel, item => {
          if (item.id) {
            updateList.push(item);
          } else {
            createList.push(item);
          }
        });
        paramsList['create_meal_list'] = createList;
        paramsList['update_meal_list'] = updateList;
        paramsList['delete_id_list'] = this.deleteList;
        this.$http.post('/restaurant/meal/edit', paramsList).then(res => {
          if (res.data.code === 200) {
            this.submitting = false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.dialogMeal = false;
            this.loadRestList();
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
            this.submitting = false;
          }
        }, err => {
          this.submitting = false;
          console.log(err);
        })
      },
      loadCountryList() {
        this.$http.get('/country/all').then(res => {
          if (res.data.code === 200) {
            this.countryList = res.data.data;
          } else {
            console.log(res.message);
          }
        }, err => {
          console.log(err);
        });
      },
      loadRestList(page) {
        this.filter.page = page ? page : this.filter.page;
        this.loading = true;
        this.$http.get('/restaurant/search', {
          params: _.omitBy(this.filter, function (item) {
            return item === ''
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.restaurantList = res.data.data.restaurant_data;
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
      countryFormatter(row, column) {
        let country = this.countryList.filter(country =>
          country.id === row.country_id
        )[0]['name'];
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
      },
      restTypeFormatter(row, column) {
        let type = this.restType.filter(type =>
          type.value === row.restaurant_type
        )[0]['label'];
        return type;
      }
    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>