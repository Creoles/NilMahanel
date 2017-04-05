<template>
  <div>
    <content-top></content-top>
    <el-form :model="params"
             label-position="top"
             :inline="true">
      <el-form-item label="国家及城市"
                    class="inline select">
        <country-select v-on:country-change="onCountryChange($event)"
                        :country="countryArr">
        </country-select>
      </el-form-item>
      <el-form-item label="所属集团">
        <el-select clearable
                   v-model="params.company_id">
          <el-option v-for="item in companyList"
                     :key="item.id"
                     value="item.id"
                     label="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称">
        <el-input v-model="params.name_en"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="地址"
                    style="width:500px;">
        <el-input v-model="params.address"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="类型"
                    class="inline select">
        <el-select v-model="params.restaurant_type"
                   class="restaurant-region"
                   placeholder="select">
          <el-option label="中餐"
                     :value="1"></el-option>
          <el-option label="西餐"
                     :value="2"></el-option>
          <el-option label="特色"
                     :value="3"></el-option>
          <el-option label="综合"
                     :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人员"
                    class="inline contact">
        <el-input v-model="params.concact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话"
                    class="inline contact">
        <el-input v-model="params.telephone"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="币种">
        <el-select v-model="params.currency">
          <el-option label="美元"
                     :value="1"></el-option>
          <el-option label="人民币"
                     :value="2"></el-option>
          <el-option label="斯里兰卡卢比"
                     :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行名称">
        <el-input v-model="params.bank_name"></el-input>
      </el-form-item>
      <el-form-item label="开户支行">
        <el-input v-model="params.deposit_bank"></el-input>
      </el-form-item>
      <el-form-item label="收款人名称">
        <el-input v-model="params.payee"></el-input>
      </el-form-item>
      <el-form-item label="收款人账号">
        <el-input v-model="params.account"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="备注">
        <el-input v-model="params.note"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="中文介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.intro_cn">
        </el-input>
      </el-form-item>
      <el-form-item label="英文介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.intro_en">
        </el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submit">提 交</el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...</el-button>
      </el-form-item>
  
    </el-form>
  </div>
</template>
<style lang="scss">

</style>
<script>
import CountrySelect from "src/views/components/CountrySelect.vue"
import ContentTop from "src/views/components/ContentTop.vue"
export default {
  data() {
    return {
      params: {
        name: null,
        name_en: null,
        country_id: null,
        city_id: null,
        company_id: null,
        restautant_type: null,
        address: null,
        teltephone: null,
        intro_cn: null,
        intro_en: null,
        contact: null,
        currency: null,
        bank_name: null,
        deposit_bank: null,
        peyee: null,
        account: null,
        note: null
      },
      countryArr: [],
      submitting: false,
      companyList: [],
      submitting: false

    }
  },
  created() {
    this.loadCompanyList();
    if (this.$route.params.id) {
      let id = this.$route.params.id;
      this.loadRestaurantById(id).then(res => {
        this.params = res.data.data;
        this.countryArr.push(this.params.country_id, this.params.city_id);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  methods: {
    onCountryChange(msg) {
      this.params.country_id = msg[0];
      this.params.city_id = msg[1];
    },
    loadCompanyList() {
      this.$http.get('/restautant_company/search').then(res => {
        if (res.code === 200) {
          this.companyList = res.data.data;
        } else {
          console.log(res.message);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    addType() {
      if (this.params.price.length < 3) {
        this.params.price.push({ type: '' })
      }
    },
    loadRestaurantById(id) {
      return this.$http.get('/restautant/' + id);
    },
    removeType(item) {
      var index = this.params.price.indexOf(item);
      if (index !== -1) {
        this.params.price.splice(index, 1)
      }
    },
    submit() {
      this.submitting = true;
      //判断是新建 还是 编辑
      if (this.params.id) {
        this.$http.put('/restautant/' + this.params.id, this.params).then(res => {
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
          this.submitting = false;
        }, err => {
          console.log(err);
          this.submitting = false;
        })
      } else {
        this.$http.post('/restautant/create_restautant', this.params).then(res => {
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
          this.submitting = false;
        })
      }
    }
  },
  components: {
    ContentTop,
    CountrySelect
  }
}
</script>
