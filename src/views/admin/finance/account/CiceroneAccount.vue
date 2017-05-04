<template>
  <div>
    <content-top></content-top>
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
      <el-table-column prop="name"
                       label="中文名">
      </el-table-column>
      <el-table-column prop="name_en"
                       label="英文名">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button type="text"
                     size="small"
                     @click="editAccount(scope)">编辑收款账号
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
    <el-dialog id="cicerone-account"
               title="收款账号"
               v-model="dialogAccount"
               size="large">
      <div>
        <el-button type="primary"
                   style="margin-bottom:10px;"
                   @click="addOneAccount">添加一条
        </el-button>
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
            <el-form-item label="swift" class="swift">
              <el-input v-model="account.swift_code"
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
                   v-if="!submitting">取 消
        </el-button>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitAccount">确 定
        </el-button>
        <el-button type="primary"
                   v-if="submitting"
                   :loading="submitting">正在提交...
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  export default {
    data(){
      return {
        filter: {
          country_id: null,
          guide_type: null,
          page: 1,
          number: 20
        },
        accountList: [],
        total: null,
        countryList: [],
        loading: false,
        ciceroneList: [],
        currentTourId: null,
        currentPriceName: {
          name: null,
          name_en: null,
        },
        dialogAccount: false,
        accountLoading: false,
        submitting: false,
        deleteList: []
      }
    },
    created(){
      this.loadCountryList();
      this.loadCiceroneList(1);
    },
    methods: {
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
      },
      handleSizeChange(size) {
        this.filter.number = size;
        this.loadCiceroneList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadCiceroneList();
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
          swift_code: '',
          tour_guide_id: this.currentTourId
        });
      },
      deleteOneAccount(id, index) {
        if (id) {
          this.deleteList.push(id);
        }
        this.accountList.splice(index, 1);
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
    },
    components: {
      ContentTop
    }
  }
</script>
<style lang="scss">
  #cicerone-account {
    .el-dialog--large {
      width: 82%;
      left: 58%;
      .el-form-item {
        margin-right: 0;
      }
      .swift {
        width: 80px;
        input {
          width: 80px;
        }
      }
    }
    .account-box {
      .account-width {
        width: 140px;
      }
    }
  }
</style>