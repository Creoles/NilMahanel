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
                     v-model="filter.guide_type">
            <el-option v-for="item in ciceroneType"
                       :key="item.id"
                       :value="item.id"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadCiceroneList(1)">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="ciceroneList"
              v-loading.body="loading"
              border
              style="width: 100%">
      <el-table-column fixed
                       prop="country_id"
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
      <el-table-column prop="guide_type"
                       label="类别"
                       :formatter="typeFormatter">
      </el-table-column>

      <el-table-column prop="gender"
                       label="性别"
                       :formatter="sexFormatter">
      </el-table-column>
      <el-table-column prop="birthday"
                       label="年龄"
                       width="120"
                       :formatter="oldFormatter">
      </el-table-column>
      <el-table-column prop="start_work"
                       label="工作经验"
                       width="120"
                       :formatter="experienceFormatter">
      </el-table-column>
      <el-table-column prop="first_language"
                       label="语言"
                       width="120">
      </el-table-column>
      <el-table-column prop="certificate_type"
                       label="证件类型"
                       width="120"
                       :formatter="idFormatter">
      </el-table-column>
      <el-table-column prop="certificate_number"
                       label="证件编号"
                       width="120">
      </el-table-column>
      <el-table-column prop="tour_guide_number"
                       label="导游证编号"
                       width="120">
      </el-table-column>
      <el-table-column prop="passport_country"
                       label="签证国别"
                       width="120">
      </el-table-column>
      <el-table-column prop="telephone_one"
                       label="联系电话"
                       width="120">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="180">
        <template scope="scope">
          <el-button type="text"
                     size="small"
                     @click="editCicerone(scope.row.id)">编辑信息
          </el-button>
          <el-button type="text"
                     size="small"
                     @click="deleteCicerone(scope)">删除
          </el-button>
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

  </div>
</template>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  export default {
    data() {
      return {
        ciceroneList: [],
        filter: {
          country_id: null,
          guide_type: null,
          page: 1,
          number: 20
        },
        ciceroneType: [
          {id: 1, label: '国际导游'},
          {id: 2, label: '司机导游'},
          {id: 3, label: '景点导游'},
          {id: 4, label: '中国翻译'},
          {id: 5, label: '领队'}
        ],
        submitting: false,
        total: null,
        countryList: [],
        loading: false,
        dialogAccount: false,
        accountLoading: false
      }

    },
    created() {
      axios.all([this.loadCountryList(), this.loadCiceroneList(1)
      ]).then(axios.spread((res1, res2) => {
        console.log("done");
      }));
    },
    methods: {
      addCicerone() {
        this.$router.push({name: "ADD CICERONE"})
      },
      editCicerone(id) {
        this.$router.push({name: "EDIT CICERONE", params: {id: id}});
      },
      onDialogClose() {
        this.priceModel = {};
        this.currentPriceName = {};
      },
      deleteCicerone(scope) {
        this.$confirm('此操作将永久删除此人员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/tour_guide/' + scope.row.id).then(res => {
            if (res.data.code === 200) {
              this.ciceroneList.splice(scope.$index, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.loadCiceroneList();
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
      loadCountryList() {
        this.$http.get('/country/all').then(res => {
          if (res.data.code === 200) {
            this.countryList = res.data.data;
          } else {
            console.log(res.message);
          }
        }, err => {
          console.log(err);
        });
      },
      countryFormatter(row, column) {
        let country = _.find(this.countryList, country => country.id === row.country_id)['name'];
        return country;
      },
      typeFormatter(row, column) {
        let type = _.find(this.ciceroneType, type => type.id === row.guide_type)['label'];
        return type;
      },
      oldFormatter(row, column) {
        let year = new Date().getFullYear();
        let old = year - row.birthday;
        return old;
      },
      sexFormatter(row, column) {
        let s = [{id: 1, label: '男'}, {id: 2, label: '女'}];
        let sex = _.find(s, sex => sex.id === row.gender)['label'];
        return sex;
      },
      experienceFormatter(row, column) {
        let year = new Date().getFullYear();
        let experience = year - row.start_work;
        return experience + 'year';
      },
      idFormatter(row, column) {
        let typeList = [{id: 1, label: "身份证"}, {id: 2, label: "护照"}];
        let idType = _.find(typeList, type => type.id === row.certificate_type)['label'];
        return idType;
      },
      loadCiceroneList(page) {
        this.filter.page = page ? page : this.filter.page;
        this.loading = true;
        this.$http.get('/tour_guide/search', {
          params: _.omitBy(this.filter, function (item) {
            return item === ''
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.ciceroneList = res.data.data.tour_guide_data;
            if (page === 1) {
              this.total = res.data.data.total;
            }
            this.loading = false;
          } else {
            this.loading = false;
            console.log(res.data.message);
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