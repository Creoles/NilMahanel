<template>
  <el-cascader
    :options="options"
    v-model="selectArr"
    @change="handleChange"
    :props="config['zh-CN']"
    change-on-select
    clearable
    placeholder="select">
  </el-cascader>
</template>
<script>
  export default {
    data(){
      return {
        options:[],
        selectArr:this.country,
        config:{
          "zh-CN":{
            label:"name",
            value:"id",
            children:"city_data"
          },
          "en-US":{
            label:"name_en",
            value:"id",
            chidren:"city_data"
          }
        }
      }
    },
    props:['country'],
    created(){
      this.loadCountry();

    },
    methods:{
      loadCountry(){
        // this.$http.get('/country/all').then(res=>{
        //   let obj = {id:1,name:"斯里兰卡",name_en:"Srilanka","city_data":[{id:1,name:"科伦坡",name_en:"asdas"}]};
        // })
        this.options = [{id:1,name:"斯里兰卡",name_en:"Srilanka","city_data":[{id:1,name:"科伦坡",name_en:"asdas"}]}];
      },
      handleChange(){
        this.$emit('country-change',this.selectArr);
      }
    }
  }
</script>