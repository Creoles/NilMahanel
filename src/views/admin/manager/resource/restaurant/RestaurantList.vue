<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="addRestaurant">
        添加餐厅
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
        <el-form-item label="餐厅类型">
          <el-select clearable
                     v-model="filter.restaurant_type">
            <el-option v-for="item in restType"
                       :key="item.value"
                       :value="item.value"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属集团">
          <el-select clearable
                     v-model="filter.company_id">
            <el-option v-for="item in companyList"
                       :key="item.id"
                       value="item.id"
                       label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadRestList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="restaurantList"
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
      <el-table-column prop="contcat"
                       label="联系人">
      </el-table-column>
      <el-table-column prop="telephone"
                       label="联系电话">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editRestaurant(scope.row.id)">编辑信息</el-button>
          <el-button type="text"
                     @click="editMeal(scope)">价格</el-button>
          <el-button type="text"
                     @click="deleteRestaurant(scope)">删除</el-button>
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
                     @click="addOneMeal">添加一条</el-button>
        </div>
        <div v-for="(item,index) in mealModel"
             class="price-box">
          <el-form-item label="套餐类型">
            <el-select v-model="item.restaurant_type"
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
                   v-if="!submitting">取 消</el-button>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitMeal">确 定</el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
#rest-price {
  .el-dialog--large {
    width: 78%;
    left: 60%;
  }
  .price-box {
    .price-width {
      width: 100px;
    }
  }
}
</style>
<script>
import ContentTop from "src/views/components/ContentTop.vue"
import CountrySelect from "src/views/components/CountrySelect.vue"
export default {
  data() {
    return {
      restaurantList: [
        {
          id: 1, name: "阿萨德撒的",
          name_en: "asdad", address: "asdsad",
          country_id: 1, city_id: 1, meal_list: [
            {
              id: 1,
              restaurant_id: 1,
              restaurant_type: 1,
              adult_fee: 2,
              adult_cost: 2,
              child_fee: 2,
              child_cost: 2
            }
          ],
          restaurant_type: 1, contcat: "冉聪杰", telephone: "18523199991"
        }
      ],
      filter: {
        country_id: '',
        city_id: '',
        company_id: '',
        restaurant_type: '',
        number: 20,
        page: 1
      },
      total: 100,
      companyList: [],
      countryArr: [],
      loading: false,
      dialogMeal: false,
      deleteList: [],
      submitting: false,
      mealModel: [
        {
          id: null,
          restaurant_id: null,
          restaurant_type: null,
          adult_fee: null,
          adult_cost: null,
          child_fee: null,
          child_cost: null
        }
      ],
      restType: [
        { value: 1, label: '中餐' },
        { value: 2, label: '西餐' },
        { value: 3, label: '特色' },
        { value: 4, label: '综合' }
      ]
    }
  },
  created() {
    axios.all([this.loadCompanyList(), this.loadContryList()]).then(axios.spread((res1, res2) => {

    }))
    // this.loadCompanyList();
    // this.loadContryList();
    this.loadRestList(1);
  },
  methods: {
    addRestaurant() {
      this.$router.push({ name: "ADD RESTAURANT" })
    },
    editRestaurant(id) {
      this.$router.push({ name: "EDIT RESTAURANT", params: { id: id } });
    },
    editMeal(scope) {
      if (scope.row.meal_list.length) {
        this.mealModel = _.cloneDeep(scope.row.meal_list);
      }
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
        restaurant_id: null,
        restaurant_type: null,
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
      })
      paramsList['create_list'] = createList;
      paramsList['update_list'] = updateList;
      paramsList['delete_list'] = this.deleteList;
      this.$http.post('/restaurant/meal/edit_meal', paramsList).then(res => {
        if (res.code === 200) {
          this.submitting = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.loadRestList();
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
          this.submitting = false;
        }
      }, err => {
        this.submitting = false;
        console.log(err);
      })
    },
    deleteRestaurant(scope) {
      this.$confirm('此操作将永久删除该餐厅, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/restautant/' + scope.row.id).then(res => {
          if (res.code === 200) {
            this.restCompanyList.splice(scope.$index, 1);
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
      })
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
    loadCompanyList() {
      this.$http.get('/restautant_company/search').then(res => {
        if (res.code === 200) {
          this.companyList = res.data.data;
        } else {
          console.log(res.message);
        }
      }, err => {
        console.log(err);
      })
    },
    loadRestList(page) {
      this.filter.page = page ? page : this.filter.page;
      this.loading = true;
      this.$http.get('/restaurant/search', {
        params: this.filter
      }).then(res => {
        if (res.code === 200) {
          this.restaurantList = res.data.restaurant_data;
          if (page === 1) {
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
    },
    onFilterCountryChange(msg) {
      this.filter.country_id = msg[0];
      this.filter.city_id = msg[1];
    },
    handleSizeChange(size) {
      this.filter.number = size;
      this.loadRestList();
    },
    handleCurrentChange(page) {
      this.filter.page = page;
      this.loadRestList();
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
    },
    restTypeFormatter(row, column) {
      let type = this.restType.filter(type =>
        type.value === row.restaurant_type
      )[0]['label']
      return type;
    }
  },
  components: {
    ContentTop,
    CountrySelect
  }
}
</script>
