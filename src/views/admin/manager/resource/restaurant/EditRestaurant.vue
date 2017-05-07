<template>
  <div>
    <content-top></content-top>
    <el-form :model="params"
             label-position="top"
             :inline="true"
             class="restaurant-form">
      <el-form-item label="国家及城市"
                    class="inline select">
        <country-select v-on:country-change="onCountryChange($event)"
                        :country="countryArr">
        </country-select>
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名称">
        <el-input v-model="params.name_en"></el-input>
      </el-form-item>
      <el-form-item label="英文简称">
        <el-input v-model="params.nickname_en"></el-input>
      </el-form-item>
      <el-form-item label="类型"
                    class="inline select">
        <el-select v-model="params.restaurant_type"
                   class="restaurant-region"
                   placeholder="select">
          <el-option label="中餐"
                     :value="1"></el-option>
          <el-option label="特色"
                     :value="2"></el-option>
          <el-option label="西餐"
                     :value="3"></el-option>
          <el-option label="综合"
                     :value="4"></el-option>
          <el-option label="其他"
                     :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="环境水平">
        <el-select v-model="params.environ_level">
          <el-option label="卓越" :value="1"></el-option>
          <el-option label="非常好" :value="2"></el-option>
          <el-option label="好" :value="3"></el-option>
          <el-option label="一般" :value="4"></el-option>
          <el-option label="差" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="口味水平">
        <el-select v-model="params.taste_level">
          <el-option label="卓越" :value="1"></el-option>
          <el-option label="非常好" :value="2"></el-option>
          <el-option label="好" :value="3"></el-option>
          <el-option label="一般" :value="4"></el-option>
          <el-option label="差" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务水平">
        <el-select v-model="params.service_level">
          <el-option label="卓越" :value="1"></el-option>
          <el-option label="非常好" :value="2"></el-option>
          <el-option label="好" :value="3"></el-option>
          <el-option label="一般" :value="4"></el-option>
          <el-option label="差" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消费水平">
        <el-select v-model="params.cost_level">
          <el-option label="昂贵" :value="1"></el-option>
          <el-option label="一般" :value="2"></el-option>
          <el-option label="便宜" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作程度">
        <el-select v-model="params.cooperation_level">
          <el-option label="核心" :value="1"></el-option>
          <el-option label="一般" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐程度">
        <el-select v-model="params.recommend_level">
          <el-option label="5星" :value="1"></el-option>
          <el-option label="4星" :value="2"></el-option>
          <el-option label="3星" :value="3"></el-option>
          <el-option label="2星" :value="4"></el-option>
          <el-option label="1星" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="地址"
                    style="width:500px;">
        <el-input v-model="params.address"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="联系人员1"
                    class="inline contact">
        <el-input v-model="params.contact_one"></el-input>
      </el-form-item>
      <el-form-item label="联系人员1职位"
                    class="inline contact">
        <el-input v-model="params.position_one"></el-input>
      </el-form-item>
      <el-form-item label="联系人员1手机"
                    class="inline contact">
        <el-input v-model="params.telephone_one"></el-input>
      </el-form-item>
      <el-form-item label="联系人员1邮箱"
                    class="inline contact">
        <el-input v-model="params.email_one"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="联系人员2"
                    class="inline contact">
        <el-input v-model="params.contact_two"></el-input>
      </el-form-item>
      <el-form-item label="联系人员2职位"
                    class="inline contact">
        <el-input v-model="params.position_two"></el-input>
      </el-form-item>
      <el-form-item label="联系人员2手机"
                    class="inline contact">
        <el-input v-model="params.telephone_two"></el-input>
      </el-form-item>
      <el-form-item label="联系人员2邮箱"
                    class="inline contact">
        <el-input v-model="params.email_two"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="联系人员3"
                    class="inline contact">
        <el-input v-model="params.contact_three"></el-input>
      </el-form-item>
      <el-form-item label="联系人员3职位"
                    class="inline contact">
        <el-input v-model="params.position_three"></el-input>
      </el-form-item>
      <el-form-item label="联系人员3手机"
                    class="inline contact">
        <el-input v-model="params.telephone_three"></el-input>
      </el-form-item>
      <el-form-item label="联系人员3邮箱"
                    class="inline contact">
        <el-input v-model="params.email_three"></el-input>
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
      <el-form-item label="标准餐介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.standard_meal_intro_cn">
        </el-input>
      </el-form-item>
      <el-form-item label="标准餐英文介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.standard_meal_intro_en">
        </el-input>
      </el-form-item>
      <br>
      <el-form-item label="升级餐介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.upgrade_meal_intro_cn">
        </el-input>
      </el-form-item>
      <el-form-item label="升级餐英文介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.upgrade_meal_intro_en">
        </el-input>
      </el-form-item>
      <br>
      <el-form-item label="豪华餐介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.luxury_meal_intro_cn">
        </el-input>
      </el-form-item>
      <el-form-item label="豪华餐英文介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.luxury_meal_intro_en">
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
        nickname_en: null,
        country_id: null,
        city_id: null,
        restaurant_type: null,
        environ_level: null,
        taste_level: null,
        service_level: null,
        cost_level: null,
        cooperation_level: null,
        recommend_level: null,
        contact_one: null,
        position_one: null,
        telephone_one: null,
        email_one: null,
        contact_two: null,
        position_two: null,
        telephone_two: null,
        email_two: null,
        contact_three: null,
        position_three: null,
        telephone_three: null,
        email_three: null,
        standard_meal_intro_cn: null,
        standard_meal_intro_en: null,
        upgrade_meal_intro_cn: null,
        upgrade_meal_intro_en: null,
        luxury_meal_intro_cn: null,
        luxury_meal_intro_en: null,
        address: null,
        intro_cn: null,
        intro_en: null,
      },
      countryArr: [],
      submitting: false,
      companyList: [],
      submitting: false

    }
  },
  created() {
    if (this.$route.params.id) {
      let id = this.$route.params.id;
      this.loadRestaurantById(id).then(res => {
        if (res.data.code === 200) {
          this.params = res.data.data;
          this.countryArr.push(this.params.country_id, this.params.city_id);
        } else {
          console.log(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  },
  methods: {
    onCountryChange(msg) {
      this.params.country_id = msg[0];
      this.params.city_id = msg[1];
    },
    loadRestaurantById(id) {
      return this.$http.get('/restaurant/' + id);
    },
    submit() {
      this.submitting = true;
      //判断是新建 还是 编辑
      if (this.params.id) {
        this.$http.put('/restaurant/' + this.params.id, this.params).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: ' 修改成功!'
            });
            this.$router.push({name: 'RESTAURANT LIST'})
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
        this.$http.post('/restaurant/create', this.params).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: ' 添加成功!'
            });
            this.$router.push({name: 'RESTAURANT LIST'})
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
    }
  },
  components: {
    ContentTop,
    CountrySelect
  }
}
</script>
