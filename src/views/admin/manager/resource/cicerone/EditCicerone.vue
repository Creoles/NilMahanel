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
                     :label="item.label"
                     :value="item.id"
                     :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员类型">
        <el-select v-model="params.type">
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
        <el-input v-model="params.sex"></el-input>
      </el-form-item>
      <el-form-item label="语言">
        <el-input v-model="params.language"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="出生年份">
        <el-input v-model="params.age"></el-input>
      </el-form-item>
      <el-form-item label="工作经验(开始工作年份)">
        <el-input v-model.number="params.gongzuojingy"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="params.telephone"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="证件类型">
        <el-select v-model="params.zhengjianleixing">
          <el-option v-for="idType in idTypeList"
                     :label="idType.label"
                     :value="idType.id"
                     :key="idType.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件编号">
        <el-input v-model="params.idNum"></el-input>
      </el-form-item>
      <el-form-item label="导游证编号">
        <el-input v-model="tourId"></el-input>
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
      <el-form-item label="自我介绍"
                    style="width:300px">
        <el-input type="textarea"
                  v-model="params.intro_cn">
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
        type: null,
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
    axios.all([this.loadCountryList]).then(axios.spread((res1) => {

    }));
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
    loadCountryList() {
      this.$http.get('/country/all').then(res => {
        this.countryList = res.data.data;
      })
    },
    loadRestaurantById(id) {
      return this.$http.get('/restautant/' + id);
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
