<template>
  <div class="edit-hotel">
    <content-top></content-top>
    <el-form :model="params" label-position="top" label-width="100px" :inline="true">
      <el-form-item label="国家及地区">
        <country-select :country="countryArr"
                        v-on:country-change="onFilterCountryChange($event)"></country-select>
      </el-form-item>
      <el-form-item label="所属集团">
        <el-select v-model="params.company_id"
                   clearable>
          <el-option :key="item.id"
                     :value="item.id"
                     :label="item.name"
                     v-for="item in companyList"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="酒店名称">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="酒店英文名称">
        <el-input v-model="params.name_en"></el-input>
      </el-form-item>
      <el-form-item label="英文简称">
        <el-input v-model="params.nickname_en"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="开业时间">
        <el-input v-model.number="params.start_year"></el-input>
      </el-form-item>
      <el-form-item label="星级">
        <hotel-star :hotel-star="params.star_level" v-on:star-change="onStarChange($event)"></hotel-star>
      </el-form-item>
      <el-form-item label="网上星级">
        <hotel-star :hotel-star="params.comment_level" v-on:star-change="onOnlineStarChange($event)"></hotel-star>
      </el-form-item>
      <el-form-item label="具体地址" style="width: 65%">
        <el-input v-model="params.address"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="大床房数量">
        <el-input v-model.number="params.standard_room_number"></el-input>
      </el-form-item>
      <el-form-item label="双人间数量">
        <el-input v-model.number="params.standard_double_room_number"></el-input>
      </el-form-item>
      <el-form-item label="三人间数量">
        <el-input v-model.number="params.triple_room_number"></el-input>
      </el-form-item>
      <el-form-item label="套房数量">
        <el-input v-model.number="params.suite_room_number"></el-input>
      </el-form-item>
      <el-form-item label="导游房数量">
        <el-input v-model.number="params.tour_guide_room_number"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="预定邮箱">
        <el-input v-model="params.email"></el-input>
      </el-form-item>
      <el-form-item label="预定电话">
        <el-input v-model="params.telephone"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="中文介绍" style="width: 20%">
        <el-input type="textarea"
                  :rows="4"
                  v-model="params.intro_cn">
        </el-input>
      </el-form-item>
      <el-form-item label="英文介绍" style="width: 20%">
        <el-input type="textarea"
                  :rows="4"
                  v-model="params.intro_en">
        </el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" v-if="!submitting" @click="submit">提 交</el-button>
        <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  import HotelStar from 'src/views/components/HotelStar.vue'
  import CountrySelect from "src/views/components/CountrySelect.vue"
  export default{
    data(){
      return {
        star: {
          value1: 1,
          value2: 2,
          value3: 3,
          value4: 4,
          value5: 5
        },
        countryArr: [],
        companyList: [],
        params: {
          country_id: null,
          city_id: null,
          star_level: null,
          company_id: 1,
          name: null,
          name_en: null,
          nickname_en: null,
          address: null,
          comment_level: null,
          tour_guide_room_number: null,
          standard_room_number: null,
          standard_double_room_number: null,
          triple_room_number: null,
          suite_room_number: null,
          start_year: null,
          telephone: null,
          email: null,
          intro_cn: null,
          intro_en: null
        },
        submitting: false
      }
    },
    created(){
      this.loadHotelById()
    },
    methods: {
      onStarChange(msg){
        this.params.star_level = msg;
      },
      onOnlineStarChange(msg){
        this.params.comment_level = msg;
      },
      loadCompanyList(){
        this.$http.get('/hotel/company/search', {params: {page: 1, number: 10000}}).then(res => {
          if (res.data.code === 200) {
            this.companyList = res.data.data.hotel_company_list;
          } else {
            console.log(res.data.message);
          }
        })
      },
      submit(){
        this.submitting = true;
        if (this.$route.params.id) {
          this.$http.put('/hotel/' + this.$route.params.id,
            _.omit(this.params, ['created_at', 'updated_at'])
          ).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.submitting = false;
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
              this.submitting = false;
            }
          }).catch(err => {
            console.log(err);
            this.submitting = false;
          })
        }
        else {
          this.$http.post('/hotel/create', this.params).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.submitting = false;
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
              this.submitting = false;
            }
          }).catch(err => {
            console.log(err);
            this.submitting = false;
          })
        }
      },
      loadCountryList()
      {
        this.$http.get('/country/all').then(res => {
          if (res.data.code === 200) {
            this.countryList = res.data.data;
          }
        }, err => {
          console.log(new Error(err))
        });
      }
      ,
      loadHotelById()
      {
        if (this.$route.params.id) {
          this.$http.get('/hotel/' + this.$route.params.id).then(res => {
            if (res.data.code === 200) {
              this.params = _.assign(this.params, res.data.data)
              this.countryArr.push(this.params.country_id, this.params.city_id);
            } else {
              console.log(res.data.message)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
      ,
      onFilterCountryChange(msg)
      {
        this.params.country_id = msg[0];
        this.params.city_id = msg[0];
      }
    },
    components: {
      ContentTop,
      CountrySelect,
      HotelStar
    }
  }
</script>
