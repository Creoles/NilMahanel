<template>
  <div>
    <content-top></content-top>
    <el-form :model="params"
             label-position="top"
             :inline="true">
      <el-form-item label="国家"
                    class="inline select">
        <el-select v-model="params.country_id">
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
      <br>
      <el-form-item label="中文名">
        <el-input v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="params.name_en"></el-input>
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
      <el-form-item label="语言">
        <el-input v-model="params.language"></el-input>
      </el-form-item>
      <el-form-item label="出生年份">
        <el-input v-model="params.birthday"></el-input>
      </el-form-item>
      <el-form-item label="工作经验(开始工作年份)">
        <el-input v-model.number="params.start_work"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="params.telephone"></el-input>
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
      <el-form-item label="签证国别">
        <el-input v-model="params.passport_country"></el-input>
      </el-form-item>
      <el-form-item label="证件编号">
        <el-input v-model="params.certificate_number"></el-input>
      </el-form-item>
      <el-form-item label="导游证编号">
        <el-input v-model="params.tour_guide_number"></el-input>
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
        guide_type: null,
        gender: null,
        birthday: null,
        start_work: null,
        language: null,
        certificate_type: null,
        certificate_number: null,
        tour_guide_number: null,
        passport_country: null,
        telephone: null,
        intro: null,
        image_hash: "dasdasdas",
      },
      countryList: [],
      submitting: false,
      companyList: [],
      submitting: false,
      typeList: [
        { id: 1, label: "国际导游" },
        { id: 2, label: "司机导游" },
        { id: 3, label: "景点导游" },
        { id: 4, label: "中国翻译" }
      ],
      idTypeList: [
        { id: 1, label: "身份证" },
        { id: 2, label: "护照" }
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
    loadRestaurantById(id) {
      return this.$http.get('/tour_guide/' + id);
    },
    submit() {
      this.submitting = true;
      //判断是新建 还是 编辑
      if (this.params.id) {
        this.$http.put('/tour_guide/' + this.params.id, this.params).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: ' 修改成功!'
            });
            this.$router.push({name: "CICERONE LIST"});
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
        this.$http.post('/tour_guide/create_tour_guide', this.params).then(res => {
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
