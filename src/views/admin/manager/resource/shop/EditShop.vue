<template>
  <div>
    <content-top></content-top>
    <el-form :model="params"
             label-position="top"
             class="shop-form"
             ref="shopForm"
             :inline="true">
      <el-form-item label="国家及城市">
        <country-select v-on:country-change="onCountryChange($event)"
                        :country="countryArr"></country-select>
      </el-form-item>
      <el-form-item label="所属集团">
        <el-select placeholder="select"
                   v-model="params.company_id">
          <el-option :key="item.id"
                     :value="item.id"
                     :label="item.name"
                     v-for="item in companyList"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="params.shop_type" placeholder="select">
          <el-option label="珠宝"
                     :value="1"></el-option>
          <el-option label="红茶"
                     :value="2"></el-option>
          <el-option label="其他"
                     :value="3"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="中文店名">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="英文店名">
        <el-input v-model="params.name_en"></el-input>
      </el-form-item>
      <el-form-item label="英文简称">
        <el-input v-model="params.nickname_en"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="商店地址" style="width: 70%">
        <el-input v-model="params.address"></el-input>
      </el-form-item>
      <el-form-item label="备注" style="width: 70%">
        <el-input v-model="params.note"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="中文介绍" style="width: 35%">
        <el-input type="textarea"
                  :rows="4"
                  v-model="params.intro_cn">
        </el-input>
      </el-form-item>
      <el-form-item label="英文介绍" style="width: 35%">
        <el-input type="textarea"
                  :rows="4"
                  v-model="params.intro_en">
        </el-input>
      </el-form-item>
      <br>
      <!--<el-form-item class="inline" label="商店图片">-->
      <!--<el-upload class="restaurant-upload"-->
      <!--action="//jsonplaceholder.typicode.com/posts/"-->
      <!--type="select"-->
      <!--:on-preview="handlePreview"-->
      <!--:on-remove="handleRemove"-->
      <!--:on-success="handleSuccess"-->
      <!--:on-error="handleError"-->
      <!--&gt;-->
      <!--<i class="el-icon-upload"></i>-->
      <!--<div class="el-dragger__text"><em>点击上传</em></div>-->
      <!--</el-upload>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submit('shopForm')">提 交
        </el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  import CountrySelect from 'src/views/components/CountrySelect.vue'
  export default {
    data() {
      return {
        params: {
          id: null,
          name: null,
          name_en: null,
          nickname_en: null,
          address: null,
          country_id: null,
          city_id: null,
          company_id: null,
          shop_type: null,
          intro_cn: null,
          intro_en: null,
          note: null
        },
        submitting: false,
        countryArr: [],
        isEdit: false,
        companyList: []
      }

    },
    components: {
      ContentTop,
      CountrySelect
    },
    created() {
      this.loadCompanyList();
      if (this.$route.params.id) {
        let id = this.$route.params.id;
        this.isEdit = true;
        this.loadShopById(id).then(res => {
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

    },
    methods: {
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitting = true;
            if (this.params.id) {
              this.$http.put('/shop/' + this.params.id, _.omitBy(this.params, function (item) {
                return item === '' || item === null
              })).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: ' 修改成功!'
                  });
                  this.$router.push({name: 'SHOP LIST'});
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.message
                  });
                }
              }, err => {
                console.log(err)
              });
              this.submitting = false;
            } else {
              this.$http.post('/shop/create', _.omitBy(this.params, function (item) {
                return item === '' || item === null
              })).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  this.$router.push({name: 'SHOP LIST'});
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.message
                  });
                }
              }, err => {
                console.log(err);
              });
              this.submitting = false;
            }

          } else {
            console.log('error submit!!');
            this.submitting = false;
            return false;
          }
        });
      },
      loadShopById(id) {
        return this.$http.get('/shop/' + id)
      },
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
      onCountryChange(msg) {
        this.params.country_id = msg[0];
        this.params.city_id = msg[1];
      }
    }
  }
</script>
