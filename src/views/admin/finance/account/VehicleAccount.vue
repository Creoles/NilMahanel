<template>
  <div>
    <content-top>
    </content-top>
    <div>
      <el-form :inline="true"
               label-position="left"
               :model="filter">
        <el-form-item label="国家及城市">
          <country-select :country="countryArr"
                          v-on:country-change="onFilterCountryChange($event)"></country-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="filter.company_type" clearable>
            <el-option :value="1" label="公司"></el-option>
            <el-option :value="2" label="个人"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadVehicleCompanyList(1)">查询
          </el-button>
        </el-form-item>
      </el-form>

    </div>
    <el-table :data="vehicleCompanyList"
              style="width: 100%"
              v-loading.body="loading">
      <el-table-column prop="country_id"
                       label="国家"
                       :formatter="countryFormatter">
      </el-table-column>
      <el-table-column prop="city_id"
                       label="城市"
                       :formatter="cityFormatter">
      </el-table-column>
      <el-table-column prop="company_type"
                       label="类型"
                       :formatter="typeFormatter">
      </el-table-column>
      <el-table-column prop="name"
                       label="供应商全称">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="openAccount(scope.row.id)">账号
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:30px;"
                   v-if="vehicleCompanyList.length !== 0"
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
        <el-table :data="accountList" v-on:header-click="addLine">
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

  </div>
</template>
<style lang="scss">

</style>
<script>
  import ContentTop from 'src/views/components/ContentTop.vue'
  import CountrySelect from 'src/views/components/CountrySelect.vue'
  export default {
    data() {
      return {
        vehicleCompanyList: [],
        filter: {
          country_id: null,
          city_id: null,
          company_type: null,
          number: 20,
          page: 1
        },
        total: null,
        countryArr: [],
        loading: false,
        accountList: [],
        currentCompanyId: null,
        dialogAccount: false
      }
    },
    created() {
      axios.all([this.loadCountryList(), this.loadVehicleCompanyList(1)
      ])
    },
    methods: {
      loadVehicleCompanyList(page) {
        this.loading = true;
        this.filter.page = page ? page : this.filter.page;
        this.$http.get('/vehicle/company/search', {
          params: _.omitBy(this.filter, function (item) {
            return item === '' || item === null
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.vehicleCompanyList = res.data.data.vehicle_company_list;
            this.total = res.data.data.total;
            this.loading = false;
          } else {
            this.loading = false;
            console.log(res.data.data.message);
          }
        }).catch(err => {
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
      openAccount(id){
        this.dialogAccount = true;
        this.currentCompanyId = id;
        this.$http.get('/vehicle/company/' + id).then(res => {
          if (res.data.code === 200) {
            this.accountList = res.data.data.account_list;
          } else {
            console.log(res.data.message)
          }
        })
      },
      submitAccount(scope){
        if (scope.row.id) {
          this.$http.put('/vehicle/account/' + scope.row.id, _.omitBy(scope.row, function (item) {
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
          this.$http.post('/vehicle/account/create', _.omitBy(scope.row, function (item) {
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
      deleteAccount(scope){
        if (scope.row.id) {
          this.$confirm('此操作将永久删除该收款账号, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete('/vehicle/account/' + scope.row.id).then(res => {
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
      closeDialog(){
        this.accountList = [];
      },
      addLine(column, event){
        this.accountList.push({
          id: null,
          company_id: this.currentCompanyId,
          currency: null,
          bank_name: null,
          deposit_bank: null,
          payee: null,
          account: null,
          swift_code: null,
          note: null
        });
      },
      onFilterCountryChange(msg){
        this.filter.country_id = msg[0];
        this.filter.city_id = msg[0];
      },
      handleSizeChange(size) {
        this.filter.number = size;
        this.loadVehicleCompanyList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadVehicleCompanyList();
      },
      countryFormatter(row, column) {
        let country = _.find(this.countryList, country => country.id === row.country_id)['name'];
        return country;
      },
      cityFormatter(row, column) {
        let cityList = _.find(this.countryList, country => country.id === row.country_id)['city_data'];
        let city = _.find(cityList, city => city.id === row.city_id)['name'];
        return city;
      },
      typeFormatter(row, column){
        let arr = [
          {value: 1, label: '公司'},
          {value: 2, label: '个人'}
        ];
        let type = _.find(arr, type => type.value === row.company_type)['label'];
        return type
      }
    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>