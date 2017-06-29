<template>
    <div>
        <content-top>
            <el-button class="add-btn el-icon-plus"
                       type="primary"
                       @click="addHotel">
              添加酒店
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
                <el-form-item label="英文简称">
                  <el-input v-model="filter.nickname_en"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="loadHotelList(1)">查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
      <el-table :data="hotelList"
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
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text"
                               @click="editHotel(scope.row.id)">编辑信息
                    </el-button>
                  <el-button type="text"
                             @click="openContact(scope.row.id)">联系人
                  </el-button>
                    <el-button type="text"
                               @click="openAccount(scope.row.id)">收款账号
                    </el-button>
                    <el-button type="text"
                               @click="deleteHotel(scope)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align:right;margin-top:30px;"
                       v-if="hotelList.length !== 0"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="filter.page"
                       :page-sizes="[20, 50, 100, 200]"
                       :page-size="filter.number"
                       layout="total,sizes, prev, pager, next"
                       :total="total">
        </el-pagination>
      <el-dialog title="收款账号"
                 v-model="dialogAccount"
                 size="large" v-on:close="closeDialog">
        <div>
          <el-table :data="accountList" v-on:header-click="addAccountLine">
            <el-table-column label="+" width="20">
            </el-table-column>
            <el-table-column label="货币类型">
              <template scope="scope">
                <el-select v-model="scope.row.currency" size="small">
                  <el-option :value="1" label="美元"></el-option>
                  <el-option :value="2" label="人民币"></el-option>
                  <el-option :value="3" label="斯里兰卡卢布"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="银行名称">
              <template scope="scope">
                <el-input v-model="scope.row.bank_name" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="开户支行">
              <template scope="scope">
                <el-input v-model="scope.row.deposit_bank" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="收款人名称">
              <template scope="scope">
                <el-input v-model="scope.row.payee" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="收款人账号">
              <template scope="scope">
                <el-input v-model="scope.row.account" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="SWIFT CODE">
              <template scope="scope">
                <el-input v-model="scope.row.swift_code" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="备注">
              <template scope="scope">
                <el-input v-model="scope.row.note" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click="submitAccount(scope)">保存</el-button>
                <el-button size="small" @click="deleteAccount(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <el-dialog title="联系人"
                 v-model="dialogContact"
                 size="large" v-on:close="closeContactDialog">
        <div>
          <el-table :data="contactList" v-on:header-click="addContactLine">
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
        hotelList: [],
        filter: {
          country_id: null,
          city_id: null,
          company_id:null,
          nickname_en:null,
          number: 20,
          page: 1
        },
        currentHotelId: null,
        total: null,
        companyList: [],
        countryArr: [],
        loading: false,
        submitting: false,
        countryList: [],
        dialogAccount:false,
        dialogContact:false,
        contactList:[],
        accountList:[],
        star: [
          {value: 1, label: '中餐'},
          {value: 2, label: '特色'},
          {value: 3, label: '西餐'},
          {value: 4, label: '综合'},
          {value: 4, label: '其他'},
        ]
      }
    },
    created() {
      axios.all([this.loadCountryList(), this.loadHotelList(1),this.loadCompanyList()
      ]).then(axios.spread((res1, res2,res3) => {
        console.log("done");
      }));

    },
    methods: {
      openContact(id){
        this.dialogContact = true;
        this.currentHotelId = id;
        this.$http.get('/hotel/contact/hotel/' + id).then(res => {
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
      addContactLine(column, event){
        this.contactList.push({
          id: null,
          hotel_id: this.currentHotelId,
          contact: null,
          position: null,
          telephone: null,
          email: null
        });
      },
      closeContactDialog(){
        this.contactList=[]
      },
      submitContact(scope){
        if (scope.row.id) {
          this.$http.put('/hotel/contact/' + scope.row.id, _.omitBy(scope.row, function (item) {
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
          this.$http.post('/hotel/contact/create', _.omitBy(scope.row, function (item) {
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
            this.$http.delete('/hotel/contact/' + scope.row.id).then(res => {
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
      openAccount(id){
        this.dialogAccount = true;
        this.currentHotelId = id;
        this.$http.get('/hotel/account/hotel/' + id).then(res => {
          if (res.data.code === 200) {
            this.accountList = res.data.data;
          } else {
            console.log(res.data.message)
          }
        })
      },
      closeDialog(){
        this.accountList = [];
      },
      deleteAccount(scope){
        if (scope.row.id) {
          this.$confirm('此操作将永久删除该收款账号, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete('/hotel/account/' + scope.row.id).then(res => {
              if (res.data.code === 200) {
                this.accountList.splice(scope.$index, 1);
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
          this.accountList.splice(scope.$index, 1);
        }
      },
      addAccountLine(column, event){
        this.accountList.push({
          id: null,
          hotel_id:this.currentHotelId,
          currency: null,
          bank_name: null,
          deposit_bank: null,
          payee: null,
          account: null,
          swift_code: null,
          note: null
        });
      },
      submitAccount(scope){
        if (scope.row.id) {
          this.$http.put('/hotel/account/' + scope.row.id, _.omitBy(scope.row, function (item) {
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
          this.$http.post('/hotel/account/create', _.omitBy(scope.row, function (item) {
            return item === '' || item === null;
          })).then(res => {
            if (res.data.code === 200) {
              scope.row.id = res.data.data.account_id;
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
      addHotel() {
        this.$router.push({name: "ADD HOTEL"})
      },
      editHotel(id) {
        this.$router.push({name: "EDIT HOTEL", params: {id: id}});
      },
      deleteHotel(scope) {
        this.$confirm('此操作将永久删除该酒店, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/hotel/' + scope.row.id).then(res => {
            if (res.data.code === 200) {
              this.hotelList.splice(scope.$index, 1);
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
        })
      },
      loadCompanyList() {
        this.$http.get('/hotel/company/search', {params: {page: 1, number: 10000}}).then(res => {
          if (res.data.code === 200) {
            this.companyList = res.data.data.company_data;
          } else {
            console.log(res.data.data.message);
          }
        }, err => {
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
      loadHotelList(page) {
        this.filter.page = page ? page : this.filter.page;
        this.loading = true;
        this.$http.get('/hotel/search', {
          params: _.omitBy(this.filter, function (item) {
            return item === ''
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.hotelList = res.data.data.hotel_data;
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
        this.loadHotelList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadHotelList();
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
      }
    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>
