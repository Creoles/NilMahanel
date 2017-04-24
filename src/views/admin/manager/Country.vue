<template>
  <div>
    <content-top>
      <el-button class="addCountry"
                 @click="dialogCountry = true"
                 type="primary">添加国家</el-button>
    </content-top>
    <el-collapse accordion>
      <el-collapse-item v-for="item in countryList"
                        :key="item.id">
        <template slot="title">
          {{item.name}}/{{item.name_en}}
          <el-button type="text"
                     @click="openCityModel(item)">添加城市</el-button>
        </template>
        <el-table :data="item.city_data"
                  max-height="250">
          <el-table-column label="ID"
                           prop="city_id"></el-table-column>
          <el-table-column label="城市中文名称"
                           prop="name"></el-table-column>
          <el-table-column label="城市英文名称"
                           prop="name_en"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="text"
                         size="small"
                         @click="removeCity(scope.
                    $index,scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <el-dialog title="添加国家"
               v-model="dialogCountry"
               size="tiny">
      <el-form :model="countryModel">
        <el-form-item label="中文名称">
          <el-input v-model="countryModel.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="countryModel.name_en"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogCountry = false">取 消</el-button>
        <el-button type="primary"
                   @click="addCountry">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加城市"
               v-model="dialogCity"
               size="tiny">
      <el-form :model="cityModel">
        <el-form-item label="中文名称">
          <el-input v-model="cityModel.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="cityModel.name_en"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogCity = false">取 消</el-button>
        <el-button type="primary"
                   @click="addCity">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.addCountry {
  float: right;
}
</style>
<script>
import ContentTop from "src/views/components/ContentTop.vue"
export default {
  data() {
    return {
      countryList: [{
        id: 1, name: '斯里兰卡', name_en: 'Srilanka', city_data: [
          { name: '科伦坡', name_en: 'colloo' }
        ]
      }],
      dialogCountry: false,
      dialogCity: false,
      countryModel: {
        name: '',
        name_en: ''
      },
      cityModel: {
        country_id: null,
        name: '',
        name_en: ''
      },
      currentCountry: ''
    }
  },
  created(){
    this.loadList();
  },
  methods: {
    loadList() {
      this.$http.get('/country/all').then(res => {
        if (res.data.code === 200) {
          this.countryList = res.data.data;
        }
      }, err => {
        console.log(new Error(err))
      })
    },
    addCountry() {
      this.$http.post('/country/create', this.countryModel).then(res => {
        if (res.data.code === 200) {
          this.dialogCountry = false;
          this.countryModel = {};
          this.loadList();
        }
      })

    },
    addCity() {
      this.cityModel['country_id'] = this.currentCountry;
      this.$http.post('/city/create', this.cityModel).then(res => {
        if (res.data.code === 200) {
          this.dialogCity = false;
          this.countryModel = {};
          this.loadList();
        }
      })

    },
    openCityModel(item) {
      event.stopPropagation();
      this.currentCountry = item.id;
      this.dialogCity = true;
    },
    removeCity(index, scope) {
      this.$confirm('此操作将删除该地区, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/city/'+scope.row.id).then(res=>{
          if(res.data.code === 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loadList();
          }else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  components: {
    ContentTop
  }
}
</script>
