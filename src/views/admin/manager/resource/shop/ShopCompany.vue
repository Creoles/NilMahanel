<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus" type="primary"  @click="dialogShopCompany = true">
          添加商店集团
      </el-button>
    </content-top>
    <el-table
        :data="shopCompanyList"
        style="width: 100%">
      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column label="中文名称" prop="name">
      </el-table-column>
      <el-table-column label="英文名称" prop="name_en">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text" @click="editShopCompany(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteShopCompany">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加商店集团" v-model="dialogShopCompany" size="tiny">
      <el-form :model="shopConpmayModel">
        <el-form-item label="中文名称">
          <el-input v-model="shopConpmayModel.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="shopConpmayModel.name_en" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShopCompany = false">取 消</el-button>
        <el-button type="primary" @click="addShopCompany">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
  
</style>
<script>
  import ContentTop from 'src/views/components/ContentTop.vue'
  export default {
    data(){
      return {
        dialogShopCompany:false,
        shopConpmayModel:{
          name:'',
          name_en:''
        },
        shopCompanyList:[
          {id:1,name:"萨达所",name_en:"asdasd"}
        ]

      }
    },
    created(){
      this.loadShopCompanyList();

    },
    methods:{
      addShopCompany(){
        this.$http.post('/shop_company/create',this.shopConpmayModel).then(res=>{
          if(res.code === 200){
            this.shopConpmayModel = false;
            this.$message({
                type: 'success',
                message: '添加成功!'
            });
            this.dialogShopCompany()
          }else {
            this.$message({
                type: 'error',
                message: res.message
            });
          }
        },err=>{
          console.log(err);
        })
      },
      loadShopCompanyList(){
        this.$http.get('/shop_company').then(res=>{
          if (res.code === 200){
            //todo list 返回体
            this,shopCompanyList;
          }else {
            console.log(res.message);
          }
        },err => {
          console.log(err);
        })
      },
    },
    components:{
      ContentTop
    }
  }
</script>