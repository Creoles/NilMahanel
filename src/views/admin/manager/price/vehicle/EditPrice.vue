<template>
  <div>
    <content-top></content-top>
    <div>
      <el-form :inline="true"
               label-position="top"
               :model="filter"
               class="vehicle-filter">
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
        <el-form-item label="型号">
          <el-cascader
            :options="typeList"
            v-model="typeArr"
            @active-item-change="handleItemChange"
            :props="props"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="filter.license"></el-input>
        </el-form-item>
        <el-form-item style="vertical-align: bottom;">
          <el-button type="primary"
                     @click="loadVehicleList(1)">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="vehicleList"
              v-loading.body="loading"
              style="width: 100%">
      <el-table-column prop="company_id"
                       label="所属公司" :formatter="companyFormatter">
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
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="openPrice(scope.row.company_id,scope.row.vehicle_type_id)">价格
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
    <el-dialog title="编辑价格"
               v-model="dialogPrice"
               size="large" v-on:close="closeDialog">
      <div>
        <el-table :data="priceList" v-on:header-click="addLine">
          <el-table-column label="+" width="20">
          </el-table-column>
          <el-table-column label="开始时间">
            <template scope="scope">
              <el-date-picker
                v-model="scope.row.start_time"
                type="date"
                placeholder="start">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="结束时间">
            <template scope="scope">
              <el-date-picker
                v-model="scope.row.end_time"
                type="date"
                placeholder="end">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="每公里价格">
            <template scope="scope">
              <el-input v-model.number="scope.row.unit_price" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="价格确认人">
            <template scope="scope">
              <el-input v-model="scope.row.confirm_person" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="submitPrice(scope)">保存</el-button>
              <el-button size="small" @click="deletePrice(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
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
          company_id: null,
          vehicle_type_id: null,
          license: null,
          number: 20,
          page: 1,
        },
        typeArr: [],
        countryArr: [],
        companyList: [],
        priceList: [],
        dialogPrice: false,
        currentCompanyId: null,
        currentVehicleTypeId: null,
        loading: false,
        total: 100,
        typeList: [{
          brand: 'CAR',
          id: 1,
          children: []
        }, {
          brand: 'VAN',
          id: 2,
          children: []
        }, {
          brand: 'BIG_VAN',
          id: 3,
          children: []
        }, {
          brand: 'MINI_COACH',
          id: 4,
          children: []
        }, {
          brand: 'COACH',
          id: 5,
          children: []
        }, {
          brand: 'LONG_COACH',
          id: 6,
          children: []
        }, {
          brand: 'other',
          id: 7,
          children: []
        }],
        props: {
          label: 'brand',
          children: 'children',
          value: 'id'
        }
      }
    },
    watch: {
      "typeArr": function (val) {
        this.filter.vehicle_type_id = val[1];
      }
    },
    created() {
      this.loadCompanyList();
    },
    methods: {
      addVehicle() {
        this.$router.push({name: "ADD VEHICLE"})
      },
      openPrice(company_id, vehicle_type_id){
        this.dialogPrice = true;
        this.currentCompanyId = company_id;
        this.currentVehicleTypeId = vehicle_type_id;
        this.$http.get('/vehicle/fee/search', {
          params: {company_id: company_id, vehicle_type_id: vehicle_type_id}
        }).then(res => {
          if (res.data.code === 200) {
            let data = res.data.data.vehicle_fee_list;
            _.forOwn(data, (item) => {
              item.start_time *= 1000;
              item.end_time *= 1000;
            });
            this.priceList = data;
          } else {
            console.log(res.data.message);
          }
        })
      },
      submitPrice(scope){
        let params = _.cloneDeep(scope.row);
        params.start_time = Date.parse(new Date(params.start_time)) / 1000;
        params.end_time = Date.parse(new Date(params.end_time)) / 1000;
        if (scope.row.id) {
          this.$http.put('/vehicle/fee/' + scope.row.id, _.omitBy(params, function (item) {
            return item === '' || item === null;
          })).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '价格修改成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
        } else {
          this.$http.post('/vehicle/fee/create', _.omitBy(params, function (item) {
            return item === '' || item === null;
          })).then(res => {
            if (res.data.code === 200) {
              scope.row.id = res.data.data.fee_id;
              this.$message({
                type: 'success',
                message: '价格保存成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
        }
      },
      deletePrice(scope){
        if (scope.row.id) {
          this.$confirm('此操作将永久删除该条价格, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete('/vehicle/fee/' + scope.row.id).then(res => {
              if (res.data.code === 200) {
                this.priceList.splice(scope.$index, 1);
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
          this.priceList.splice(scope.$index, 1);
        }
      },
      loadVehicleList(page) {
        this.filter.page = page ? page : this.filter.page;
        this.loading = true;
        this.$http.get('/vehicle/search', {
          params: _.omitBy(this.filter, function (item) {
            return item === '' || item === null
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.vehicleList = res.data.data.vehicle_data;
            if (res.data.data.total) {
              this.total = res.data.data.total;
            }
            this.loading = false;
          } else {
            this.loading = false;
            console.log(res.data.message);
          }
        }).catch(err => {
          console.error(err);
        })
      },
      closeDialog(){
        this.priceList = [];
      },
      addLine(column, event){
        this.priceList.push({
          id: null,
          company_id: this.currentCompanyId,
          vehicle_type_id: this.currentVehicleTypeId,
          start_time: null,
          end_time: null,
          unit_price: null,
          confirm_person: null,
          attachment_hash: "asdasd"
        });
      },
      handleSizeChange(size) {
        this.filter.number = size;
        this.loadVehicleList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadVehicleList();
      },
      loadCompanyList() {
        this.$http.get('/vehicle/company/search', {params: {page: 1, number: 10000}}).then(res => {
          if (res.data.code === 200) {
            this.companyList = res.data.data.vehicle_company_list;
          } else {
            console.log(res.data.data.message);
          }
        }, err => {
          console.log(err);
        })
      },
      handleItemChange(val){
        this.$http.get('/vehicle/type/search', {params: {vehicle_type: val[0], page: 1, number: 10000}}).then(res => {
          if (res.data.code === 200) {
            this.typeList[val[0] - 1].children = res.data.data.vehicle_type_list;
          }
        })
      },
      companyFormatter(row, column){
        let company = _.find(this.companyList, company => company.id === row.company_id)['name'];
        return company;
      }
    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>
