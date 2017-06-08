<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="addShop">
        添加商店
      </el-button>
    </content-top>
    <div>
      <el-form :inline="true"
               label-position="left"
               :model="shopFilter"
               class="shop-filter">
        <el-form-item :label="$t('label.filter.country')">
          <country-select :country="countryArr"
                          v-on:country-change="onFilterCountryChange($event)"></country-select>
        </el-form-item>
        <el-form-item :label="$t('label.filter.type')">
          <el-select v-model="shopFilter.shop_type"
                     placeholder="type"
                     clearable>
            <el-option label="珠宝"
                       value="1"></el-option>
            <el-option label="红茶"
                       value="2"></el-option>
            <el-option label="其他"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('label.filter.company')">
          <el-select v-model="shopFilter.company_id"
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
                     @click="loadShopList(1)">{{$t('label.filter.search')}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="shopList"
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
                       label="名称"
                       width="130">
      </el-table-column>
      <el-table-column prop="shop_type"
                       label="类型"
                       :formatter="typeFormatter">
      </el-table-column>
      <el-table-column prop="contact"
                       label="联系人">
      </el-table-column>
      <el-table-column prop="telephone"
                       label="联系电话">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editShop(scope.row.id)">编辑
          </el-button>
          <el-button type="text"
                     @click="openContact(scope.row.id)">联系人
          </el-button>
          <el-button type="text" @click="openPriceDialog(scope)">编辑费率</el-button>
          <el-button type="text"
                     @click="deleteShop(scope)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:30px;"
                   v-if="shopList.length !== 0"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="shopFilter.page"
                   :page-sizes="[20, 50, 100, 200]"
                   :page-size="shopFilter.number"
                   layout="total,sizes, prev, pager, next"
                   :total="shopTotalNum">
    </el-pagination>
    <el-dialog title="联系人"
               v-model="dialogContact"
               size="large" v-on:close="closeDialog">
      <div>
        <el-table :data="contactList" v-on:header-click="addLine">
          <el-table-column label="+" width="20">
          </el-table-column>
          <el-table-column label="联系人名称">
            <template scope="scope">
              <el-input v-model="scope.row.contact"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="联系人职位">
            <template scope="scope">
              <el-input v-model="scope.row.position" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="电话">
            <template scope="scope">
              <el-input v-model="scope.row.telephone" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="email">
            <template scope="scope">
              <el-input v-model="scope.row.email" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="submitContact(scope)">保存</el-button>
              <el-button size="small" @click="deleteContact(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog title="编辑费率"
               v-model="dialogPrice"
               size="small"
               v-on:close="onDialogClose">
      <el-form :inline="true"
               label-position="top"
               v-loading.body="priceLoading">
        <el-form-item label="结算方式">
          <el-select v-model="priceModel.account_way">
            <el-option label="现金"
                       :value="1"></el-option>
            <el-option label="支票"
                       :value="2"></el-option>
            <el-option label="银行转账"
                       :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算周期">
          <el-select v-model="priceModel.account_period">
            <el-option label="现结"
                       :value="1"></el-option>
            <el-option label="月结"
                       :value="2"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="公司反佣比例(%)">
          <el-input v-model="priceModel.company_ratio"></el-input>
        </el-form-item>
        <el-form-item label="导游反佣比例(%)">
          <el-input v-model="priceModel.tour_guide_ratio"></el-input>
        </el-form-item>
        <el-form-item label="人头费">
          <el-input v-model="priceModel.fee_person"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="备注">
          <el-input v-model="priceModel.note"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogPrice = false"
                   v-if="!submitting">取 消
        </el-button>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitPrice">确 定
        </el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  import CountrySelect from "src/views/components/CountrySelect.vue"
  import {mapGetters} from "vuex"
  export default {
    data() {
      return {
        shopFilter: {
          country_id: null,
          city_id: null,
          shop_type: null,
          company_id: null,
          page: 1,
          number: 20
        },
        countryArr: [],
        shopTotalNum: null,
        countryList: [],
        companyList: [],
        loading: false,
        shopList: [],
        dialogContact: false,
        currentShopId: null,
        contactList: [],
        dialogPrice: false,
        priceModel: {
          id: null,
          shop_id: null,
          fee_person: null,
          tour_guide_ratio: null,
          company_ratio: null,
          account_period: null,
          account_way: null,
          note: null
        },
        priceLoading: false,
        submitting: false
      }
    },
    created() {
      this.loadCountryList();
      this.loadCompanyList();
      this.loadShopList(1);
    },
    computed: {
      ...mapGetters({
        lang: "getLang"
      })
    },
    locales: {
      en: {
        name: 'name_en',
        label: {
          filter: {
            country: 'country&city',
            type: 'shop type',
            company: 'company',
            search: 'search'
          }
        }
      },
      'zh-cn': {
        name: 'name',
        label: {
          filter: {
            country: '国家及城市',
            type: '商店类型',
            company: '所属公司',
            search: '查询'
          }
        }
      }
    },
    methods: {
      onDialogClose(){
        _.forIn(this.priceModel, (value, key) => {
          this.priceModel[key] = null;
        });
      },
      openPriceDialog(scope){
        this.priceLoading = true;
        this.dialogPrice = true;
        this.currentShopId = scope.row.id;
        this.$http.get('/shop/fee/shop/' + scope.row.id).then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.priceModel = _.assign(this.priceModel, res.data.data[0]);
            }
            this.priceLoading = false;
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
            this.priceLoading = false;
          }

        }).catch(err => {
          this.priceLoading = false;
          console.log(err);
        })
      },
      submitPrice() {
        this.submitting = true;
        if (this.priceModel.id) {
          this.$http.put('/shop/fee/' + this.priceModel.id, this.priceModel).then(res => {
            this.submitting = false;
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.dialogPrice = false;
            } else {
              this.submitting = false;
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          }, err => {
            console.log(err);
          })
        } else {
          this.priceModel.shop_id = this.currentShopId;
          this.$http.post('/shop/fee/create', this.priceModel).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
              this.submitting = false;
              this.dialogPrice = false;
            } else {
              this.submitting = false;
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          }, err => {
            console.log(err)
          })
        }
      },
      addShop() {
        this.$router.push({name: "ADD SHOP"})
      },
      handleSizeChange(size) {
        this.shopFilter.number = size;
        this.loadShopList();
      },
      handleCurrentChange(page) {
        this.shopFilter.page = page;
        this.loadShopList();
      },
      editShop(id) {
        this.$router.push({name: "EDIT SHOP", params: {id: id}});
      },
      deleteShop(scope) {
        this.$confirm('此操作将永久删除 ' + scope.row.name + ' 这家商店吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/shop/' + scope.row.id).then(res => {
            if (res.data.code === 200) {
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
      openContact(id){
        this.dialogContact = true;
        this.currentShopId = id;
        this.$http.get('/shop/contact/shop/' + id).then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length) {
              this.contactList = res.data.data;
            } else {
              this.contactList = [];
            }

          } else {
            console.log(res.data.message)
          }
        }).catch(err => {
          console.error(err);
        })
      },
      submitContact(scope){
        if (scope.row.id) {
          this.$http.put('/shop/contact/' + scope.row.id, _.omitBy(scope.row, function (item) {
            return item === '' || item === null;
          })).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          }).catch(err => {
            console.error(err);
          })
        } else {
          this.$http.post('/shop/contact/create', _.omitBy(scope.row, function (item) {
            return item === '' || item === null;
          })).then(res => {
            if (res.data.code === 200) {
              scope.row.id = res.data.data.contact_id;
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          }).catch(err => {
            console.error(err);
          })
        }
      },
      deleteContact(scope){
        if (scope.row.id) {
          this.$confirm('此操作将永久删除该联系人, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete('/shop/contact/' + scope.row.id).then(res => {
              if (res.data.code === 200) {
                this.contactList.splice(scope.$index, 1);
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
        } else {
          this.contactList.splice(scope.$index, 1);
        }
      },
      closeDialog(){
        this.contactList = [];
      },
      addLine(column, event){
        this.contactList.push({
          id: null,
          shop_id: this.currentShopId,
          contact: null,
          position: null,
          telephone: null,
          email: null
        });
      },
      //只有第一页有total
      loadShopList(page) {
        this.shopFilter.page = page ? page : this.shopFilter.page;
        this.loading = true;
        this.$http.get('/shop/search', {
          params: _.omitBy(this.shopFilter, function (item) {
            return item === ''
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.shopList = res.data.data.shop_data;
            if (page === 1) {
              this.shopTotalNum = res.data.data.total;
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
      //城市选择器 事件
      onFilterCountryChange(msg) {
        this.shopFilter.country_id = msg[0];
        this.shopFilter.city_id = msg[1];
      },
      //获得城市列表
      loadCountryList() {
        this.$http.get('/country/all').then(res => {
          if (res.data.code === 200) {
            this.countryList = res.data.data;
          }
        }, err => {
          console.log(new Error(err))
        });
      },
      //获得公司列表
      loadCompanyList() {
        this.$http.get('/shop/company/search', {params: {page: 1, number: 10000}}).then(res => {
          
          if (res.data.code === 200) {

            this.companyList = res.data.data.shop_company_list;
          } else {
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
        })
      },
      typeFormatter(row, column) {
        let type = {1: "珠宝", 2: "红茶", 3: "其他"};
        return type[row.shop_type];
      },
      countryFormatter(row, column) {
        let country = this.countryList.filter(country =>
          country.id === row.country_id
        )[0][this.$t('name')]
        return country;
      },
      cityFormatter(row, column) {
        let cityList = this.countryList.filter(country =>
          country.id === row.country_id
        )[0]['city_data'];
        let city = cityList.filter(city =>
          city.id === row.city_id
        )[0][this.$t('name')];
        return city;
      }
    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>
