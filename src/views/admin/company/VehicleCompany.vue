<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="dialogVehicleCompany = true">
        添加车辆所属
      </el-button>
    </content-top>
    <el-table :data="vehicleCompanyList"
              style="width: 100%">

      <el-table-column>

      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editVehicleCompany(scope.row)">编辑
          </el-button>
          <el-button type="text"
                     @click="openOneCompAccount(scope.row.id)">添加收款账号
          </el-button>
          <el-button type="text"
                     @click="deleteVehicleCompany(scope)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="vehicleCompanyModel.id?'编辑集团':'添加集团'"
               v-model="dialogVehicleCompany"
               size="tiny"
               v-on:close="onDialogClose">
      <el-form :model="vehicleCompanyModel">
        <el-form-item label="中文名称">
          <el-input v-model="vehicleCompanyModel.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="vehicleCompanyModel.name_en"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVehicleCompany = false">取 消</el-button>
        <el-button type="primary"
                   @click="addVehicleCompany">确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="vehicleAccountModel.owner_id||vehicleAccountModel.owner_id?'添加账号':'编辑账号'"
               v-model="dialogVehicleAccount"
               size="tiny"
               v-on:close="onAccountDialogClose">
      <el-form :model="vehicleAccountModel">
        <el-form-item label="币种">
          <el-select v-model="vehicleAccountModel.currency">
            <el-option label="美元(USD)"
                       :value="1"></el-option>
            <el-option label="人民币(CNY)"
                       :value="2"></el-option>
            <el-option label="斯里兰卡卢比(LKR)"
                       :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行名称">
          <el-input v-model="vehicleAccountModel.bank_name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-input v-model="vehicleAccountModel.deposit_bank"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款人名称">
          <el-input v-model="vehicleAccountModel.payee"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款账号">
          <el-input v-model="vehicleAccountModel.account"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="vehicleAccountModel.note"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="closeAccountDialog">取 消</el-button>
        <el-button type="primary"
                   @click="submitAccount">确 定
        </el-button>
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
        dialogVehicleCompany: false,
        dialogVehicleAccount: false,
        vehicleCompanyModel: {
          id: '',
          name: '',
          name_en: ''
        },
        vehicleCompanyList: [
          {id: 1, name: "萨达所", name_en: "asdasd"}
        ],
        compAccountList: [],
        vehicleAccountModel: {
          id: '',//新建为空，编辑有值
          owner_id: '',//公司时 是公司id,个人时是个人id
          user_id: '',
          company_id: '',
          currency: '',
          bank_name: '',
          deposit_bank: '',
          payee: '',
          account: '',
          note: '',
          account_type: ''//1:公司账号,2:个人账号
        },

      }
    },
    created() {
      this.loadVehicleCompanyList();
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
      addVehicleCompany() {
        if (this.vehicleCompanyModel.id) {
          this.$http.put('/vehicle_company/' + this.vehicleCompanyModel.id, this.vehicleCompanyModel).then(res => {
            if (res.data.code === 200) {
              this.vehicleCompanyModel = false;
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.loadVehicleCompanyList();
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
          this.$http.post('/vehicle_company/create_company', this.vehicleCompanyModel).then(res => {
            if (res.data.code === 200) {
              this.dialogVehicleCompany = false;
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.loadVehicleCompanyList();
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
      //打开添加公司账号窗口
      openOneCompAccount(id) {
        this.dialogVehicleAccount = true;
        this.vehicleAccountModel.owner_id = id;
        this.vehicleAccountModel.account_type = 1;
      },

      closeAccountDialog() {
        this.dialogVehicleAccount = false;
        this.vehicleAccountModel = {};
      },
      submitAccount() {
        if (this.vehicleAccountModel.id) {
          this.$http.put('/vehicle_account/' + this.vehicleAccountModel.id, this.vehicleAccountModel).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '编辑成功'
              });
              this.dialogVehicleAccount = false;
              this.vehicleAccountModel = {};
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          }, err => {
            console.log(err);
          })
        } else {
          this.$http.post('/vehicle_account/create_account', this.vehicleAccountModel).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.dialogVehicleAccount = false;
              this.vehicleAccountModel = {};
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          }, err => {
            console.log(err);
          })
        }
      },
      //打开编辑 收款公司账号  url参数为account_id
      openEditCompAccount(row) {
        this.dialogVehicleAccount = true;
        this.vehicleAccountModel = row;
      },
      deleteCompAccount(id) {
        this.$confirm('此操作将永久删除该收款账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/vehicle_account/' + id).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
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
      //加载 当前公司 收款账户
      currentCompAccountList($event, owner_id) {
        //account_type=1 公司  =2 个人
        this.$http.get('/vehicle_account/' + owner_id + "?account_type=1").then(res => {
          if (res.data.code === 200) {
            this.compAccountList = res.data.data;
          } else {
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
        })
      },
      clearCompAccountList($event) {
        this.compAccountList = [];
      },
      editVehicleCompany(item) {
        this.dialogVehicleCompany = true;
        this.vehicleCompanyModel = item;
      },
      deleteVehicleCompany(scope) {
        this.$confirm('此操作将永久删除该公司, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/vehicle_company/' + scope.row.id).then(res => {
            if (res.data.code === 200) {
              this.vehicleCompanyList.splice(scope.$index, 1);
              this.$message({
                type: 'success',
                message: '删除成功'
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onDialogClose() {
        this.vehicleCompanyModel = {id: '', name: '', name_en: ''}
      },
      onAccountDialogClose() {
        this.vehicleAccountModel = {};
      },
      loadVehicleCompanyList() {
        this.$http.get('/vehicle_company/search', {params: {is_all: true}}).then(res => {
          if (res.data.code === 200) {
            this.vehicleCompanyList = res.data.data;
          } else {
            console.log(res.data.message);
          }
        }, err => {
          console.log(err);
        })
      },
      currencyFormatter(row, column) {
        let currency = [
          {id: 1, name: '美元', name_en: 'USD'},
          {id: 2, name: '人民币', name_en: 'CNY'},
          {id: 3, name: '斯里兰卡卢比', name_en: 'LKR'}
        ];
        let result = currency.filter(currency =>
          currency.id === row.currency
        )[0]['name'];
        return result;
      }
    },
    components: {
      ContentTop
    }
  }
</script>