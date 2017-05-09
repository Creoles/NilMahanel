<template>
  <div>
    <content-top></content-top>
    <el-form :model="params"
             :inline="true"
             :rules="rule"
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
                   v-model="params.company_id" @change="loadAccount($event,params.company_id)">
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
        <el-select v-model="params.vehicle_type">
          <el-option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <div style="display: inline-block">
        <el-form-item label="车辆品牌">
          <span>{{currentType.brand}}</span>
        </el-form-item>
        <el-form-item label="理论座位数">
          <span>{{currentType.seat}}</span>
        </el-form-item>
        <el-form-item label="实际可用座位数">
          <span>{{currentType.available_seat}}</span>
        </el-form-item>
        <el-form-item label="建议乘客人数">
          <span>{{currentType.passenger_count}}</span>
        </el-form-item>
        <el-form-item label="车型备注">
          <span>{{currentType.note}}</span>
        </el-form-item>
      </div>
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
      <div style="display: inline-block">
        <el-form-item label="联系人名称">
          <span>{{currentType.brand}}</span>
        </el-form-item>
        <el-form-item label="联系人职位">
          <span>{{currentType.seat}}</span>
        </el-form-item>
        <el-form-item label="个人手机">
          <span>{{currentType.available_seat}}</span>
        </el-form-item>
        <el-form-item label="个人邮件">
          <span>{{currentType.passenger_count}}</span>
        </el-form-item>
      </div>
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
  import editRule from "src/assets/valid/editVehicle.json"
  import CountrySelect from "src/views/components/CountrySelect.vue"
  export default {
    data() {
      return {
        params: {
          id: null,
          country_id: null,
          city_id: null,
          company_id: null,
          vehicle_type: null,
          license: null,//车牌号
          register_number: null,//登记号,
          unit_price: null,
          insurance_number: null
        },
        currentCompanyInfo: {},
        currentType: [{
          type: 'CAR',
          value: 1,
          children: []
        }, {
          type: 'VAN',
          value: 2,
          children: []
        }, {
          type: 'BIG_VAN',
          value: 3,
          children: []
        }, {
          type: 'MINI_COACH',
          value: 4,
          children: []
        }, {
          type: 'COACH',
          value: 5,
          children: []
        }, {
          type: 'LONG_COACH',
          value: 6,
          children: []
        }, {
          type: 'other',
          value: 7,
          children: []
        }],
        props: {
          label: 'type',
          children: 'children',
          value: 'value'
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
      loadAccount($event, company_id){
        this.$http.get('/vehicle_account/' + company_id + "?account_type=1").then(res => {
          if (res.data.code === 200) {
            if (res.data.data.length === 0) {
              this.$message({
                type: 'error',
                message: '当前公司没有收款账号，请先添加!'
              });
            }
            this.params.account_id = res.data.data[0].id;
          } else {
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
        })
      },
      loadVehicleCompanyList() {
        this.$http.get('/vehicle_company/search', {params: {is_all: true}}).then(res => {
          if (res.data.code === 200) {
            this.companyList = res.data.data;
          } else {
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
        })
      },
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
              this.$http.post('/vehicle/create_vehicle', this.params).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: ' 添加成功!'
                  });
                  this.$router.push({name: "VEHICLE LIST"})
                } else {
                  console.log(res.message);
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

      }

    },
    components: {
      ContentTop,
      CountrySelect
    }
  }
</script>
