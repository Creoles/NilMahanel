<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="addCicerone">
        添加人员
      </el-button>
    </content-top>
    <div>
      <el-form :inline="true"
               label-position="left"
               :model="filter">
        <el-form-item label="国家">
          <el-select v-model="filter.country_id"
                     clearable>
            <el-option v-for="item in countryList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员类型">
          <el-select clearable
                     v-model="filter.type">
            <el-option v-for="item in ciceroneType"
                       :key="item.id"
                       :value="item.id"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadCiceroneList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="ciceroneList"
              v-loading.body="loading"
              border
              style="width: 100%">
      <el-table-column fixed
                       prop="date"
                       label="国家"
                       :formatter="countryFormatter">
      </el-table-column>
      <el-table-column fixed
                       prop="name"
                       label="中文名"
                       width="120">
      </el-table-column>
      <el-table-column fixed
                       prop="name_en"
                       label="英文名"
                       width="120">
      </el-table-column>
      <el-table-column prop="name"
                       label="类别"
                       :formatter="typeFormatter">
      </el-table-column>
  
      <el-table-column prop="address"
                       label="性别"
                       :formatter="sexFormatter">
      </el-table-column>
      <el-table-column prop="zip"
                       label="年龄"
                       width="120"
                       :formatter="oldFormatter">
      </el-table-column>
      <el-table-column prop="zip"
                       label="工作经验"
                       width="120"
                       :formatter="experienceFromatter">
      </el-table-column>
      <el-table-column prop="zip"
                       label="语言"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="证件类型"
                       width="120"
                       :formatter="idFromatter">
      </el-table-column>
      <el-table-column prop="zip"
                       label="证件编号"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="导游证编号"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="签证国别"
                       width="120">
      </el-table-column>
      <el-table-column prop="zip"
                       label="联系电话"
                       width="120">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="180">
        <template scope="scope">
          <el-button type="text"
                     size="small"
                     @click="editCicerone(scope.row.id)">编辑信息</el-button>
          <el-button type="text"
                     size="small"
                     @click="editPrice(scope)">编辑费用</el-button>
          <el-button type="text"
                     size="small"
                     @click="deleteCicerone(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:30px;"
                   v-if="ciceroneList.length !== 0"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="filter.page"
                   :page-sizes="[20, 50, 100, 200]"
                   :page-size="filter.number"
                   layout="total,sizes, prev, pager, next"
                   :total="total">
    </el-pagination>
    <el-dialog id="-price"
               title="编辑价格"
               v-model="dialogPrice"
               size="small"
               v-on:close="onDialogClose">
      <el-form :inline="true"
               label-position="top">
        <el-form-item label="中文名称">
          <span>{{currentPriceName.name}}</span>
        </el-form-item>
        <el-form-item label="英文名称">
          <span>{{currentPriceName.name_en}}</span>
        </el-form-item>
        <br>
        <el-form-item label="货币类型">
          <el-select v-model="priceModel.currency">
            <el-option label="美元"
                       :value="1"></el-option>
            <el-option label="人民币"
                       :value="2"></el-option>
            <el-option label="斯里兰卡卢比"
                       :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="priceModel.jibengongzi"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="服务费类型">
          <el-select v-model="priceModel.fuwufeiType">
            <el-option label="固定服务费"
                       :value="1"></el-option>
            <el-option label="按人头费"
                       :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务费">
          <el-input v-model="priceModel.fuwufei"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogPrice = false"
                   v-if="!submitting">取 消</el-button>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitPrice">确 定</el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitPrice">正在提交...</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ContentTop from "src/views/components/ContentTop.vue"
export default {
  data() {
    return {
      ciceroneList: [{
        country_id: 1,
        type: 1,
        sex: 1,
        old: "1993",
        experience: 1990,
        idType: 1,
        name: 'asda',
        name_en: 'asd'
      }, {
        country_id: 1,
        type: 1,
        sex: 2,
        old: "1993",
        experience: 1991,
        idType: 2,
        name: 'asddddd',
        name_en: 'bbbbb'
      }],
      filter: {
        country_id: null,
        type: null,
        page: 1,
        number: 20
      },
      ciceroneType: [
        { id: 1, label: '国际导游' },
        { id: 2, label: '司机导游' },
        { id: 3, label: '景点导游' },
        { id: 4, label: '中国翻译' }
      ],
      countryList: [],
      loading: false,
      dialogPrice: false,
      priceModel: {
        id: null,
        currency: null,
        jibengongzi: null,
        fuwufeiType: null,
        price: null
      },
      currentPriceName: {
        name: null,
        name_en: null,
      },
      submitting: false,
      total: 100
    }

  },
  created() {
    this.loadCiceroneList(1);
    this.loadContryList();
  },
  methods: {
    addCicerone() {
      this.$router.push({ name: "ADD CICERONE" })
    },
    editCicerone(id) {
      this.$router.push({ name: "EDIT CICERONE", params: { id: 1 } });
    },
    editPrice(scope) {
      this.currentPriceName.name = scope.row.name;
      this.currentPriceName.name_en = scope.row.name_en;
      this.$http.get('/xxxx/xxx/' + scope.row.id).then(res => {
        if (res.code === 200) {
          this.priceModel = res.data.data;
        } else {
          console.log(res.mssage);
        }
      }).catch(err => {
        console.log(err);
      })
      this.dialogPrice = true;
    },
    submitPrice() {
      if (priceModel) { }
    },
    onDialogClose() {
      this.priceModel = {};
      this.currentPriceName = {};
    },
    deleteCicerone() {
      //todo
      this.$confirm('此操作将永久删除此人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/shop/' + scope.row.id).then(res => {
          if (res.code === 200) {
            this.shopList.splice(scope.$index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        }, err => {
          console.log(err);
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(size) {
      this.filter.number = size;
      this.loadCiceroneList();
    },
    handleCurrentChange(page) {
      this.filter.page = page;
      this.loadCiceroneList();
    },
    loadContryList() {
      this.$http.get('/country/all').then(res => {
        if (res.code === 200) {
          this.countryList = res.data;
        } else {
          console.log(res.message);
        }
      }, err => {
        console.log(err);
      })
      this.countryList = [{ id: 1, name: "斯里兰卡", name_en: "Srilanka", "city_data": [{ id: 1, name: "科伦坡", name_en: "asdas" }] }];
    },
    countryFormatter(row, column) {
      let country = _.find(this.countryList, country => country.id === row.country_id)['name'];
      return country;
    },
    typeFormatter(row, column) {
      let type = _.find(this.ciceroneType, type => type.id === row.type)['label'];
      return type;
    },
    oldFormatter(row, column) {
      let year = new Date().getFullYear();
      let old = year - row.old;
      return old;
    },
    sexFormatter(row, column) {
      let s = [{ id: 1, label: '男' }, { id: 2, label: '女' }];
      let sex = _.find(s, sex => sex.id === row.sex)['label'];
      return sex;
    },
    experienceFromatter(row, column) {
      let year = new Date().getFullYear();
      let experience = year - row.experience;
      return experience + 'year';
    },
    idFromatter(row, column) {
      let typeList = [{ id: 1, label: "身份证" }, { id: 2, label: "护照" }];
      let idType = _.find(typeList, type => type.id === row.idType)['label'];
      return idType;
    },
    loadCiceroneList(page) {
      this.filter.page = page ? page : this.filter.page;
      this.loading = true;
      //todo
      this.$http.get('/vehicle/search', {
        params: this.filter
      }).then(res => {
        if (res.code === 200) {
          this.ciceroneList = res.data.cicerone_data;
          if (paga === 1) {
            this.total = res.data.total;
          }
          this.loading = false;
        } else {
          this.loading = false;
          console.log(res.message);
        }
      }, err => {
        console.log(err);
        this.loading = false;
      })
    }

  },
  components: {
    ContentTop
  }
}
</script>
<style lang="scss">

</style>