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
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editAccount(scope)">编辑账户
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
    <el-dialog id="account"
               title="收款账号"
               v-model="dialogAccount"
               size="large">
      <div>
        <el-button type="primary"
                   style="margin-bottom:10px;"
                   @click="addOneAccount">添加一条
        </el-button>
      </div>
      <el-form :inline="true"
               label-position="top"
               v-loading.body="accountLoading">
        <div v-for="(account,index) in accountList"
             class="account-box">
          <el-form>
            <el-form-item label="币种">
              <el-select v-model="account.currency"
                         class="account-width">
                <el-option label="美元"
                           :value="1"></el-option>
                <el-option label="人民币"
                           :value="2"></el-option>
                <el-option label="斯里兰卡卢比"
                           :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行名称">
              <el-input v-model="account.bank_name"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="开户支行">
              <el-input v-model="account.deposit_bank"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="收款人名称">
              <el-input v-model="account.payee"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="收款人账号">
              <el-input v-model="account.account"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="swift" class="swift">
              <el-input v-model="account.swift_code"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="account.note"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item scope="scope"
                          label="删除">
              <i class="el-icon-circle-cross"
                 style="cursor:pointer"
                 @click="deleteOneAccount(account.id,index)"></i>
            </el-form-item>
          </el-form>
        </div>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAccount = false"
                   v-if="!submitting">取 消
        </el-button>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitAccount">确 定
        </el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...
        </el-button>
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
        restaurantList: [],
        filter: {
          country_id: null,
          city_id: null,
          restaurant_type: null,
          number: 20,
          page: 1
        },
        total: null,
        countryArr: [],
        loading: false,
        deleteList: [],
        submitting: false,
        countryList: [],
        currentRestId: null,
        currentPriceName: {
          name: null,
          name_en: null,
        },
        dialogAccount: false,
        accountLoading: false,
        accountList: [],
        restType: [
          {value: 1, label: '中餐'},
          {value: 2, label: '特色'},
          {value: 3, label: '西餐'},
          {value: 4, label: '综合'},
          {value: 4, label: '其他'},
        ]
      }
    },
    created() {
      axios.all([this.loadCountryList(), this.loadRestList(1)
      ]).then(axios.spread((res1, res2) => {
        console.log("done");
      }));

    },
    methods: {
      addRestaurant() {
        this.$router.push({name: "ADD RESTAURANT"})
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
      editAccount(scope) {
        this.dialogAccount = true;
        this.currentRestId = scope.row.id;
        this.$http('/restaurant/account/' + scope.row.id).then(res => {
          this.accountLoading = true;
          if (res.data.code === 200) {
            this.accountList = res.data.data;
            this.accountLoading = false;
          } else {
            console.log(res.message);
            this.accountLoading = false;
          }
        }).catch(err => {
          this.accountLoading = false;
          console.log(err);
        })
      },
      submitAccount(){
        this.submitting = true;
        let updateList = [];
        let createList = [];
        let paramsList = {};
        _.forIn(this.accountList, item => {
          if (item.id) {
            updateList.push(item);
          } else {
            createList.push(item);
          }
        });
        paramsList['create_account_list'] = createList;
        paramsList['update_account_list'] = updateList;
        paramsList['delete_id_list'] = this.deleteList;
        this.$http.post('/restaurant/account/edit', paramsList).then(res => {
          if (res.data.code === 200) {
            this.submitting = false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.dialogAccount = false;
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
      deleteOneAccount(id, index) {
        if (id) {
          this.deleteList.push(id);
        }
        this.accountList.splice(index, 1);
      },
      addOneAccount() {
        this.accountList.push({
          id: null,
          account: null,
          bank_name: null,
          currency: null,
          deposit_bank: null,
          note: null,
          payee: null,
          swift_code: '',
          restaurant_id: this.currentRestId
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
