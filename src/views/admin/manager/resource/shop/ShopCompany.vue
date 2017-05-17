<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="dialogShopCompany = true">
        添加商店集团
      </el-button>
    </content-top>
    <el-table :data="shopCompanyList"
              style="width: 100%">
      <el-table-column label="id"
                       prop="id">
      </el-table-column>
      <el-table-column :label="$t('tableth.name')"
                       prop="name">
      </el-table-column>
      <el-table-column :label="$t('tableth.name_en')"
                       prop="name_en">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editShopCompany(scope.row)">编辑</el-button>
          <el-button type="text"
                     @click="deleteShopCompany(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="shopCompanyModel.id?'编辑集团':'添加集团'"
               v-model="dialogShopCompany"
               size="tiny"
               v-on:close="onDialogClose">
      <el-form :model="shopCompanyModel">
        <el-form-item label="中文名称">
          <el-input v-model="shopCompanyModel.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="shopCompanyModel.name_en"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogShopCompany = false">取 消</el-button>
        <el-button type="primary"
                   @click="addShopCompany">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">

</style>
<script>
import ContentTop from 'src/views/components/ContentTop.vue'
export default {
  data() {
    return {
      dialogShopCompany: false,
      shopCompanyModel: {
        id: '',
        name: '',
        name_en: ''
      },
      shopCompanyList: [
        { id: 1, name: "萨达所", name_en: "asdasd" }
      ]

    }
  },
  created() {
    this.loadShopCompanyList();
  },
  locales: {
    en: {
      tableth: {
        name: 'chinese name',
        name_en: 'english name'
      }
    }, 'zh-cn': {
      tableth: {
        name: '中文名称',
        name_en: '英文名称'
      }
    }
  },
  methods: {
    addShopCompany() {
      if (this.shopCompanyModel.id) {
        this.$http.put('/shop_company/' + this.shopCompanyModel.id, this.shopCompanyModel).then(res => {
          if (res.code === 200) {
            this.shopCompanyModel = false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.loadShopCompanyList();
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }, err => {
          console.log(err);
        })
      } else {
        this.$http.post('/shop_company/create_company', this.shopCompanyModel).then(res => {
          if (res.data.code === 200) {
            this.shopCompanyModel = false;
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.loadShopCompanyList();
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        }, err => {
          console.log(err);
        })
      }

    },
    editShopCompany(item) {
      this.dialogShopCompany = true;
      this.shopCompanyModel = item;
    },
    deleteShopCompany(scope) {
      this.$http.delete('/shop_company/' + scope.row.id).then(res => {
        if (res.code === 200) {
          this.shopCompanyList.splice(scope.$index, 1);
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }, err => {
        console.log(err);
      })
    },
    onDialogClose() {
      this.shopCompanyModel = { id: '', name: '', name_en: '' }
    },
    loadShopCompanyList() {
      this.$http.get('/shop_company/search').then(res => {
        if (res.data.code === 200) {

        } else {
          console.log(res.message);
        }
      }, err => {
        console.log(err);
      })
    },
  },
  components: {
    ContentTop
  }
}
</script>