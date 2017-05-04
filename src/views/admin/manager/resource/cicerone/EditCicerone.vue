<template>
  <div>
    <content-top></content-top>
    <el-form :model="params"
             label-position="top"
             :inline="true">
      <el-form-item label="服务国家"
                    class="inline select">
        <el-select v-model="params.country_id" @change="onSelectCountry($event)">
          <el-option v-for="item in countryList"
                     :label="item.name"
                     :value="item.id"
                     :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员类型">
        <el-select v-model="params.guide_type">
          <el-option v-for="item in typeList"
                     :key="item.id"
                     :value="item.id"
                     :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员所属">
        <el-select v-model="params.company_id">
          <el-option :value="0" label="youlanka"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="中文名">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="params.name_en"></el-input>
      </el-form-item>
      <el-form-item label="英文名简称">
        <el-input v-model="params.nickname_en"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="params.gender">
          <el-option label="男"
                     :value="1"></el-option>
          <el-option label="女"
                     :value="2"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="出生年份">
        <el-input v-model="params.birthday"></el-input>
      </el-form-item>
      <el-form-item label="工作经验(开始工作年份)">
        <el-input v-model.number="params.start_work"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="语言1">
        <el-input v-model="params.first_language"></el-input>
      </el-form-item>
      <el-form-item label="语言1等级">
        <el-select v-model="params.first_language_level" clearable>
          <el-option :value="1" label="极好"></el-option>
          <el-option :value="2" label="优秀"></el-option>
          <el-option :value="3" label="良好"></el-option>
          <el-option :value="4" label="普通"></el-option>
          <el-option :value="5" label="差"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="语言2">
        <el-input v-model="params.second_language"></el-input>
      </el-form-item>
      <el-form-item label="语言2等级">
        <el-select v-model="params.second_language_level" clearable>
          <el-option :value="1" label="极好"></el-option>
          <el-option :value="2" label="优秀"></el-option>
          <el-option :value="3" label="良好"></el-option>
          <el-option :value="4" label="普通"></el-option>
          <el-option :value="5" label="差"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="语言3">
        <el-input v-model="params.third_language"></el-input>
      </el-form-item>
      <el-form-item label="语言3等级">
        <el-select v-model="params.third_language_level" clearable>
          <el-option :value="1" label="极好"></el-option>
          <el-option :value="2" label="优秀"></el-option>
          <el-option :value="3" label="良好"></el-option>
          <el-option :value="4" label="普通"></el-option>
          <el-option :value="5" label="差"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <el-form-item label="证件类型">
        <el-select v-model="params.certificate_type">
          <el-option v-for="idType in idTypeList"
                     :label="idType.label"
                     :value="idType.id"
                     :key="idType.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件编号">
        <el-input v-model="params.certificate_number"></el-input>
      </el-form-item>
      <el-form-item label="导游证编号">
        <el-input v-model="params.tour_guide_number"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="签证类型">
        <el-select v-model="params.passport_type">
          <el-option label="工作签" :value="3"></el-option>
          <el-option label="商务签" :value="2"></el-option>
          <el-option label="旅游签" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="签证国别">
        <el-input v-model="params.passport_country"></el-input>
      </el-form-item>
      <el-form-item label="签证备注">
        <el-input v-model="params.passport_note"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="联系电话">
        <el-input v-model="params.telephone_one"></el-input>
      </el-form-item>
      <el-form-item label="备用电话">
        <el-input v-model="params.telephone_two"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="params.email"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="自我介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.intro">
        </el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submit">提 交
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
          guide_type: null,
          company_id: null,
          gender: null,
          birthday: null,
          start_work: null,
          first_language: null,
          first_language_level: null,
          second_language: null,
          second_language_level: null,
          third_language: null,
          third_language_level: null,
          certificate_type: null,
          certificate_number: null,
          tour_guide_number: null,
          passport_type: null,
          passport_country: null,
          passport_note: null,
          telephone_one: null,
          telephone_two: null,
          email: null,
          intro: null,
          image_hash: "dasdasdas",
        },
        countryList: [],
        submitting: false,
        companyList: [],
        typeList: [
          {id: 1, label: "国际导游"},
          {id: 2, label: "司机导游"},
          {id: 3, label: "景点导游"},
          {id: 4, label: "中国翻译"},
          {id: 5, label: "领队"}
        ],
        idTypeList: [
          {id: 1, label: "身份证"},
          {id: 2, label: "护照"}
        ]

      }
    },
    created() {
      this.loadCountryList();
      if (this.$route.params.id) {
        let id = this.$route.params.id;
        this.loadRestaurantById(id).then(res => {
          if (res.data.code === 200) {
            this.params = res.data.data;
          } else {
            console.log(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
    methods: {
      loadCountryList() {
        this.$http.get('/country/all').then(res => {
          if (res.data.code === 200) {
            this.countryList = res.data.data;
          } else {
            console.log(res.data.message)
          }

        })
      },
      onSelectCountry(country_id){
        let info = _.find(this.countryList,
          country => country.id === country_id);
        this.params.first_language = info['language'];
        this.params.telephone_one = '+' + info['area_code'];

      },
      loadRestaurantById(id) {
        return this.$http.get('/tour_guide/' + id);
      },
      submit() {
        this.submitting = true;
        //判断是新建 还是 编辑
        if (this.params.id) {
          this.$http.put('/tour_guide/' + this.params.id,
            _.omitBy(this.params, function (item) {
              return item === null || item === ''
            })).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: ' 修改成功!'
              });
              this.$router.push({name: "CICERONE LIST"});
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
          this.$http.post('/tour_guide/create_tour_guide',
            _.omitBy(this.params, function (item) {
              return item === null || item === ''
            })).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: ' 添加成功!'
              });
              this.$router.push({name: "CICERONE LIST"});
            } else {
              console.log(res.data.message);
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
