<template>
  <el-cascader :options="options"
               v-model="selectArr"
               @change="handleChange"
               :props="config[$lang]"
               change-on-select
               clearable
               placeholder="select">
  </el-cascader>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      selectArr: this.country,
      config: {
        "zh-cn": {
          label: "name",
          value: "id",
          children: "city_data"
        },
        "en": {
          label: "name_en",
          value: "id",
          children: "city_data"
        }
      }
    }
  },
  props: ['country'],
  created() {
    this.loadCountry();

  },
  methods: {
    loadCountry() {
      this.$http.get('/country/all').then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data;
        } else {
          console.log(res.data.message);
        }
      }, err => {
        console.log(err);
      });
    },
    handleChange() {
      this.$emit('country-change', this.selectArr);
    }
  }
}
</script>