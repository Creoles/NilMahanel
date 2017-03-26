<template>
  <div>
    <content-top></content-top>
    <el-form :model="params"
             :inline="true"
             label-position="top"
             class="scenic-form"
             ref="scenicForm">
      <el-form-item label="城市及国家">
        <country-select :country="countryArr"
                        v-on:country-change="onFilterCountryChange($event)"></country-select>
      </el-form-item>
      <br>
      <el-form-item label="景点名称"
                    prop="name"
                    style="width:235px;">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称"
                    prop="name_en"
                    style="width:235px;">
        <el-input v-model="params.name_en"></el-input>
      </el-form-item>
      <el-form-item label="地址"
                    prop="address"
                    style="width:490px;">
        <el-input v-model="params.address"></el-input>
      </el-form-item>
      </br>
      <el-form-item label="中文介绍"
                    class="textearea-width">
        <el-input type="textarea"
                  :rows="4"
                  v-model="params.intro_cn">
        </el-input>
      </el-form-item>
      <el-form-item label="英文介绍"
                    class="textearea-width">
        <el-input type="textarea"
                  :rows="4"
                  v-model="params.intro_en">
        </el-input>
      </el-form-item>
      <el-form-item label="成人票价">
        <el-input v-model="params.adult_fee"></el-input>
      </el-form-item>
      <el-form-item label="成人票价">
        <el-input v-model="params.child_fee"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitScenic('scenicForm')">提 交</el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
.scenic-form {
  width: 500px;
  .textearea-width {
    width: 236px;
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
        name: null,
        name_en: null,
        address: null,
        intro_cn: null,
        intro_en: null,
        adult_fee: null,
        child_fee: null
      },
      countryArr: [],
      submitting: false
    }

  },
  created() {
    if (this.$route.params.id) {
      let id = this.$route.params.id;
      this.loadScenicById(id).then(res => {
        if (res.code === 200) {
          this.params = this.res.data;
        } else {
          console.log(res.message);
        }
      }, err => {
        console.log(err);
      })
    }
    this.countryArr.push(this.params.country_id, this.params.city_id);
  },
  methods: {
    onFilterCountryChange(msg) {
      this.params.country_id = msg[0];
      this.params.city_id = msg[1];
    },
    submitScenic(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitting = true;
          if (this.params.id) {
            this.$http.put('/attraction/' + this.params.id, this.params).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: ' 修改成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            }, err => {
              console.log(err)
            })
            this.submitting = false;
          } else {
            this.$http.post('/attraction/create_attration', this.params).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: ' 添加成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                });
              }
            }, err => {
              console.log(err);
            })
            this.submitting = false;
          }

        } else {
          console.log('error submit!!');
          this.submitting = false;
          return false;
        }
      });
    },
    loadScenicById(id) {
      return this.$http.get('/attraction/' + id);
    }
  },
  components: {
    ContentTop,
    CountrySelect
  },
}
</script>