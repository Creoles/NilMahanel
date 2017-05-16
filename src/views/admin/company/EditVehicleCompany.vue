<template>
  <div v-loading.body="loading">
    <content-top></content-top>
    <el-form :model="createModel" :inline="true" label-position="top">
      <el-form-item label="国家及城市">
        <country-select :country="countryArr"
                        v-on:country-change="onFilterCountryChange($event)"></country-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="createModel.company_type">
          <el-option :value="1" label="公司"></el-option>
          <el-option :value="2" label="个人"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="中文名称">
        <el-input v-model="createModel.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称">
        <el-input v-model="createModel.name_en"></el-input>
      </el-form-item>
      <el-form-item label="英文简称">
        <el-input v-model="createModel.nickname_en"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="车辆数量">
        <el-input v-model.number="createModel.vehicle_number"></el-input>
      </el-form-item>
      <el-form-item label="公司注册号">
        <el-input v-model="createModel.register_number"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" :loading="true" v-if="submitting" @click="submit">正在提交...</el-button>
    <el-button type="primary" v-if="!submitting" @click="submit">保存</el-button>
  </div>
</template>
<script>
  import CountrySelect from "src/views/components/CountrySelect.vue"
  import ContentTop from "src/views/components/ContentTop.vue"
  export default {
    data(){
      return {
        createModel: {
          company_type: null,
          country_id: null,
          city_id: null,
          name: null,
          name_en: null,
          nickname_en: null,
          vehicle_number: null,
          register_number: null
        },
        countryArr: [],
        submitting: false,
        loading: false,
      }
    },
    created(){
      this.loadCompany();
    },
    methods: {
      submit() {
        this.submitting = true;
        if (this.$route.params.id) {
          this.$http.put('/vehicle/company/' + this.$route.params.id, this.createModel).then(res => {
            if (res.data.code === 200) {
              this.submitting = false;
              this.$message({
                type: 'success',
                message: "修改成功"
              });
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          this.$http.post('/vehicle/company/create', this.createModel).then(res => {
            if (res.data.code === 200) {
              this.submitting = false;
              this.$message({
                type: 'success',
                message: "添加成功"
              });
              this.$router.push({name: "VEHICLE COMPANY"});
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
              this.submitting = false;
            }
          }).catch(err => {
            console.log(err);
          })
        }

      },
      loadCompany(){
        if (this.$route.params.id) {
          this.loading = true;
          this.$http.get('/vehicle/company/' + this.$route.params.id).then(res => {
            if (res.data.code === 200) {
              this.createModel = res.data.data;
              this.countryArr.push(this.createModel.country_id, this.createModel.city_id);
              this.loading = false;
            } else {
              console.log(res.data.message);
              this.loading = false;
            }
          });
        }
      },
      onFilterCountryChange(msg) {
        this.createModel.country_id = msg[0];
        this.createModel.city_id = msg[1];
      }
    },
    components: {
      CountrySelect,
      ContentTop
    }
  }
</script>