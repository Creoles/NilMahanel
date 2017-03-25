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
                        :country="countryArr"></country-select>
      </el-form-item>
      <el-form-item label="所属车辆公司">
        <el-select clearable
                   v-model="params.company_id">
          <el-option v-for="item in companyList"
                     :key="item.id"
                     value="item.id"
                     label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="公司名称"
                    prop="name">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称"
                    prop="name_en">
        <el-input v-model="params.name_en"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="车辆型号"
                    prop="model"
                    class="width-class">
        <el-input v-model="params.vehicle_type"></el-input>
      </el-form-item>
      <el-form-item label="车牌号"
                    prop="ID"
                    class="width-class">
        <el-input v-model="params.license"></el-input>
      </el-form-item>
      <el-form-item label="座位数"
                    prop="set"
                    class="width-class">
        <el-input v-model="params.seat"></el-input>
      </el-form-item>
      <el-form-item label="年限"
                    prop="year"
                    class="width-class">
        <el-input v-model="params.start_use"></el-input>
      </el-form-item>
      <el-form-item label="保险号"
                    prop="baoxian"
                    class="width-class">
        <el-input v-model="params.year"></el-input>
      </el-form-item>
      <el-form-item label="旅游局登记号"
                    prop="dengji"
                    class="width-class">
        <el-input v-model="params.register_number"></el-input>
      </el-form-item>
      <el-form-item label="联系人"
                    prop="people"
                    class="width-class">
        <el-input v-model="params.contact"></el-input>
      </el-form-item>
      <el-form-item label="预定电话"
                    prop="phone"
                    class="width-class">
        <el-input v-model="params.telephone"></el-input>
      </el-form-item>
      <el-form-item label="价格/每公里(USD)"
                    class="width-class"
                    prop="price">
        <el-input v-model="params.unit_price"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary"
               v-if="!submitting"
               @click="submit('vehicleForm')">提 交</el-button>
    <el-button type="primary"
               v-if="submitting"
               :loading="submitting">正在提交...</el-button>
  </div>
</template>
<style lang="scss">
.vehicle-form {
  width: 725px;
  .width-class {
    width: 192px;
  }
}
</style>
<script>
import ContentTop from "src/views/components/ContentTop.vue"
import editRule from "src/assets/valid/editVehicle.json"
import CountrySelect from "src/views/components/CountrySelect.vue"
//验证价格信息
import priceValid from 'src/util/priceValid.js'
export default {
  data() {
    return {
      params: {
        contry_id: '',
        city_id: '',
        company_id: '',
        name: '',
        name_en: '',
        vehicle_type: '',
        seat: '',
        license: '',//车牌号
        register_number: '',//登记号,
        contact: '',
        telephone: '',
        unit_price: ''
        //保险号？
      },
      countryArr: [],
      companyList: [],
      rule: editRule,
      submitting: false

    }
  },
  created() {
    //验证价格信息
    this.rule.price.push({ validator: priceValid, trigger: 'blur' });
    this.loadVehicleCompanyList();
  },
  methods: {
    onCountryChange(msg) {
      this.params.contry_id = msg[0];
      this.params.city_id = msg[1]
    },
    loadVehicleCompanyList() {
      this.$http.get('/vehicle_company').then(res => {
        if (res.code === 200) {
          this.companyList = res.data;
        } else {
          console.log(res.message);
        }
      }, err => {
        console.log(err);
      })
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitting = true;
          this.$http.post('/vehicle/create_vehicle', this.params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: ' 添加成功!'
              });
            } else {
              console.log(res.message);
            }
            this.submitting = false;
          }, err => {
            console.log(err);
          })
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
