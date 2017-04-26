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
      <el-table-column prop="language"
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
      <el-table-column prop="telephone"
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
                     @click="editAccount(scope)">收款账号</el-button>
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
    <el-dialog id="cicerone-account"
               title="收款账号"
               v-model="dialogAccount"
               size="large">
      <div>
        <el-button type="primary"
                   style="margin-bottom:10px;"
                   @click="addOneAccount">添加一条</el-button>
      </div>
      <el-form :inline="true"
               label-position="top"
               v-loading.body="accountLoading">
        <div v-for="(account,index) in accountList"
             class="account-box">
          <el-form>
            <el-form-item label="币种">
              <el-select v-model="account.currency"
                         class="account-width">
                <el-option label="美元"
                           :value="1"></el-option>
                <el-option label="人民币"
                           :value="2"></el-option>
                <el-option label="斯里兰卡卢比"
                           :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行名称">
              <el-input v-model="account.bank_name"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="开户支行">
              <el-input v-model="account.deposit_bank"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="收款人名称">
              <el-input v-model="account.payee"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="收款人账号">
              <el-input v-model="account.account"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="account.note"
                        class="account-width"></el-input>
            </el-form-item>
            <el-form-item scope="scope"
                          label="删除">
              <i class="el-icon-circle-cross"
                 style="cursor:pointer"
                 @click="deleteOneAccount(account.id,index)"></i>
            </el-form-item>
          </el-form>
        </div>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAccount = false"
                   v-if="!submitting">取 消</el-button>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitAccount">确 定</el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑价格"
               v-model="dialogPrice"
               size="small"
               v-on:close="onDialogClose">
      <el-form :inline="true"
               label-position="top"
               v-loading.body="priceLoading">
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
          <el-input v-model="priceModel.base_fee"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="服务费类型">
          <el-select v-model="priceModel.service_type">
            <el-option label="固定服务费"
                       :value="1"></el-option>
            <el-option label="按人头费"
                       :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务费">
          <el-input v-model="priceModel.service_fee"></el-input>
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
                   :loading="submitting">正在提交...</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ContentTop from "src/views/components/ContentTop.vue"
export default {
  data() {
    return {
      ciceroneList: [],
      accountList: [],
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
      priceModel: {
        id: null,
        tour_guide_id: null,
        currency: null,
        base_fee: null,
        service_type: null,
        service_fee: null
      },
      currentTourId: null,
      currentPriceName: {
        name: null,
        name_en: null,
      },
      submitting: false,
      total: null,
      countryList: [],
      loading: false,
      dialogAccount: false,
      dialogPrice: false,
      accountLoading: false,
      priceLoading: false,
      deleteList: [],
    }

  },
  created() {
    this.loadCountryList();
    this.loadCiceroneList(1);
  },
  methods: {
    addCicerone() {
      this.$router.push({ name: "ADD CICERONE" })
    },
    editCicerone(id) {
      this.$router.push({name: "EDIT CICERONE", params: {id: id}});
    },
    editPrice(scope) {
      this.currentPriceName.name = scope.row.name;
      this.currentPriceName.name_en = scope.row.name_en;
      this.currentPriceName.tour_guide_id = scope.row.id;
      this.priceLoading = true;
      this.dialogPrice = true;
      this.$http.get('/tour_guide/fee/' + scope.row.id).then(res => {
        if (res.data.code === 200) {
          this.priceModel = res.data.data;
          this.priceLoading = false;
        } else {
          console.log(res.data.message);
          this.priceLoading = false;
        }
      }).catch(err => {
        this.priceLoading = false;
        console.log(err);
      })
    },
    editAccount(scope) {
      this.dialogAccount = true;
      this.currentTourId = scope.row.id;
      this.$http('/tour_guide/account/' + scope.row.id).then(res => {
        this.accountLoading = true;
        if (res.data.code === 200) {
          this.accountList = res.data.data;
          this.accountLoading = false;
        } else {
          console.log(res.message);
          this.accountLoading = false;
        }
      }).catch(err => {
        this.accountLoading = false;
        console.log(err);
      })
    },
    submitAccount() {
      this.submitting = true;
      let updateList = [];
      let createList = [];
      let paramsList = {};
      _.forIn(this.accountList, item => {
        if (item.id) {
          updateList.push(item);
        } else {
          createList.push(item);
        }
      });
      paramsList['create_account_list'] = createList;
      paramsList['update_account_list'] = updateList;
      paramsList['delete_id_list'] = this.deleteList;
      this.$http.post('/tour_guide/account/edit', paramsList).then(res => {
        if (res.data.code === 200) {
          this.submitting = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.dialogAccount = false;
          this.loadRestList();
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
          this.submitting = false;
        }
      }, err => {
        this.submitting = false;
        console.log(err);
      })
    },
    addOneAccount() {
      this.accountList.push({
        id: null,
        account: null,
        bank_name: null,
        currency: null,
        deposit_bank: null,
        note: null,
        payee: null,
        tour_guide_id: this.currentTourId
      });
    },
    deleteOneAccount(id, index) {
      if (id) {
        this.deleteList.push(id);
      }
      this.accountList.splice(index, 1);
    },
    submitPrice() {
      if (this.priceModel.id) {
        this.$http.put('/tour_guide/fee/' + this.priceModel.id, this.priceModel).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        }, err => {
          console.log(err);
        })
      } else {
        this.priceModel.tour_guide_id = this.currentPriceName.tour_guide_id;
        this.$http.post('/tour_guide/fee/create_tour_guide_fee', this.priceModel).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '创建成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        }, err => {
          console.log(err)
        })
      }
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
      let type = _.find(this.ciceroneType, type => type.id === row.certificate_type)['label'];
      return type;
    },
    oldFormatter(row, column) {
      let year = new Date().getFullYear();
      let old = year - row.birthday;
      return old;
    },
    sexFormatter(row, column) {
      let s = [{ id: 1, label: '男' }, { id: 2, label: '女' }];
      let sex = _.find(s, sex => sex.id === row.gender)['label'];
      return sex;
    },
    experienceFormatter(row, column) {
      let year = new Date().getFullYear();
      let experience = year - row.start_work;
      return experience + 'year';
    },
    idFormatter(row, column) {
      let typeList = [{ id: 1, label: "身份证" }, { id: 2, label: "护照" }];
      let idType = _.find(typeList, type => type.id === row.certificate_type)['label'];
      return idType;
    },
    loadCiceroneList(page) {
      this.filter.page = page ? page : this.filter.page;
      this.loading = true;
      this.$http.get('/tour_guide/search', {
        params: this.filter
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
#cicerone-account {
  .el-dialog--large {
    width: 80%;
    left: 58%;
  }
  .account-box {
    .account-width {
      width: 140px;
    }
  }
}
</style>