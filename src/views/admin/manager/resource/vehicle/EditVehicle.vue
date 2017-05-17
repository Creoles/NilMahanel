<template>
  <div>
    <content-top></content-top>
    <el-form :model="params"
             :inline="true"
             label-position="top"
             class="vehicle-form"
             ref="vehicleForm">
      <el-form-item label="国家及城市">
        <country-select v-on:country-change="onCountryChange($event)"
                        :country="countryArr">
        </country-select>
      </el-form-item>
      <el-form-item label="所属车辆公司">
        <el-select clearable
                   v-model="params.company_id">
          <el-option v-for="item in companyList"
                     :key="item.id"
                     :value="item.id"
                     :label="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="车辆型号"
                    prop="vehicle_type"
                    class="width-class">
        <el-cascader
          :options="typeList"
          v-model="typeArr"
          @active-item-change="handleItemChange"
          :props="props"
        ></el-cascader>
      </el-form-item>
      <!--<div style="display: inline-block">-->
      <!--<el-form-item label="车辆品牌">-->
      <!--<span>{{item.brand}}</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="理论座位数">-->
      <!--<span>{{item.seat}}</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="实际可用座位数">-->
      <!--<span>{{item.available_seat}}</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="建议乘客人数">-->
      <!--<span>{{item.passenger_count}}</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="车型备注">-->
      <!--<span>{{item.note}}</span>-->
      <!--</el-form-item>-->
      <!--</div>-->
      <br>
      <el-form-item label="年限"
                    prop="start_use"
                    class="width-class">
        <el-input v-model="params.start_use"></el-input>
      </el-form-item>
      <el-form-item label="车牌号"
                    prop="license"
                    class="width-class">
        <el-input v-model="params.license"></el-input>
      </el-form-item>
      <el-form-item label="旅游局登记号"
                    prop="register_number"
                    class="width-class">
        <el-input v-model="params.register_number"></el-input>
      </el-form-item>
      <el-form-item label="保险号"
                    prop="insurance_number"
                    class="width-class">
        <el-input v-model="params.insurance_number"></el-input>
      </el-form-item>
      <br>
      <!--<div style="display: inline-block">-->
      <!--<el-form-item label="联系人名称">-->
      <!--<span>{{currentCompanyInfo.brand}}</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="联系人职位">-->
      <!--<span>{{currentCompanyInfo.seat}}</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="个人手机">-->
      <!--<span>{{currentCompanyInfo.available_seat}}</span>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="个人邮件">-->
      <!--<span>{{currentCompanyInfo.passenger_count}}</span>-->
      <!--</el-form-item>-->
      <!--</div>-->
    </el-form>
    <el-button type="primary"
               v-if="!submitting"
               @click="submit('vehicleForm')">提 交
    </el-button>
    <el-button type="primary"
               v-if="submitting"
               :loading="submitting">正在提交...
    </el-button>
  </div>
</template>
<style lang="scss">
  .vehicle-form {
    .width-class {
      width: 192px;
    }
  }
</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  import CountrySelect from "src/views/components/CountrySelect.vue"
  export default {
    data() {
      return {
        params: {
          id: null,
          country_id: null,
          city_id: null,
          company_id: null,
          vehicle_type_id: null,
          start_use: null,
          license: null,//车牌号
          register_number: null,//登记号,
          insurance_number: null
        },
        typeArr: [],
        currentCompanyInfo: {},
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
        },
        countryArr: [],
        companyList: [],
        submitting: false

      }
    },
    created() {
      this.loadVehicleCompanyList();
      if (this.$route.params.id) {
        let id = this.$route.params.id;
        this.loadVehicleById(id).then(res => {
          if (res.data.code === 200) {
            this.params = res.data.data;
            this.countryArr.push(this.params.country_id, this.params.city_id);
          } else {
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
        }).then(() => {
          this.formatType(this.params.vehicle_type_id);
        })
      }
      this.countryArr.push(this.params.country_id, this.params.city_id);
    },
    methods: {
      onCountryChange(msg) {
        this.params.country_id = msg[0];
        this.params.city_id = msg[1]
      },
      loadVehicleById(id) {
        return this.$http.get('/vehicle/' + id);
      },
      loadVehicleCompanyList() {
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
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.params.vehicle_type_id = this.typeArr[1];
            this.submitting = true;
            //判断是新建 还是 编辑
            if (this.params.id) {
              this.$http.put('/vehicle/' + this.params.id, this.params).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: ' 修改成功!'
                  });
                  this.$router.push({name: "VEHICLE LIST"})
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.message
                  });
                }
                this.submitting = false;
              }, err => {
                console.log(err);
                this.submitting = false;
              })
            } else {
              this.$http.post('/vehicle/create', this.params).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: ' 添加成功!'
                  });
                  this.$router.push({name: "VEHICLE LIST"})
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.message
                  });
                }
                this.submitting = false;
              }, err => {
                console.log(err);
                this.submitting = false;
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleItemChange(val){
        this.$http.get('/vehicle/type/search', {params: {vehicle_type: val[0], page: 1, number: 10000}}).then(res => {
          if (res.data.code === 200) {
            this.typeList[val[0] - 1].children = res.data.data.vehicle_type_list;
          }
        })
      },
      formatType(vehicle_type_id){
        this.$http.get('/vehicle/type/' + vehicle_type_id).then(res => {
          let data = res.data.data;
          this.typeArr = [data.vehicle_type, data.id];
          this.handleItemChange([data.vehicle_type]);
        })
      }

    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>
