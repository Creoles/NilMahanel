<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="dialogRestCompany = true">
        添加餐饮集团
      </el-button>
    </content-top>
    <el-table :data="restCompanyList"
              style="width: 100%">
      <el-table-column label="id"
                       prop="id">
      </el-table-column>
      <el-table-column label="名称"
                       prop="name">
      </el-table-column>
      <el-table-column label="英文名称"
                       prop="name_en">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editRestCompany(scope.row)">编辑</el-button>
          <el-button type="text"
                     @click="deleteRestCompany(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="restCompanyModel.id?'编辑集团':'添加集团'"
               v-model="dialogRestCompany"
               size="tiny"
               v-on:close="onDialogClose">
      <el-form :model="restCompanyModel">
        <el-form-item label="中文名称">
          <el-input v-model="restCompanyModel.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="restCompanyModel.name_en"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogRestCompany = false">取 消</el-button>
        <el-button type="primary"
                   @click="addRestCompany">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="lang">

</style>
<script>
import ContentTop from 'src/views/components/ContentTop.vue'
export default {
  data() {
    return {
      dialogRestCompany: false,
      restCompanyModel: {
        id: '',
        name: '',
        name_en: ''
      },
      restCompanyList: [
        { id: 1, name: '啊实打实的', name_en: 'asddas' }
      ]
    }
  },
  methods: {
    loadRestCompanyList() {
      this.$http.get('/restaurant_company/search').then(res => {
        if (res.code === 200) {
          this.restCompanyList = res.data.data;
        } else {
          console.log(res.message)
        }
      }, err => {
        console.log(err);
      })
    },
    onDialogClose() {
      this.restCompanyModel = {};
    },
    addRestCompany() {
      if (this.restCompanyModel.id) {
        this.$http.put('/restaurant_company/' + this.restCompanyModel.id, this.restCompanyModel).then(res => {
          if (res.code === 200) {
            this.restCompanyModel = false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.loadRestCompanyList();
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
        this.$http.post('/restaurant_company/create_company', this.restCompanyModel).then(res => {
          if (res.code === 200) {
            this.restCompanyModel = false;
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.loadRestCompanyList();
          } else {
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }, err => {
          console.log(err);
        })
      }
    },
    editRestCompany(item) {
      this.dialogRestCompany = true;
      this.restCompanyModel = item;
    },
    deleteRestCompany(scope) {
      this.$http.delete('/restautant_company/' + scope.row.id).then(res => {
        if (res.code === 200) {
          this.restCompanyList.splice(scope.$index, 1);
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
    }
  },
  components: {
    ContentTop
  }
}
</script>