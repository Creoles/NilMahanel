<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus" type="primary"  @click="dialogVehicleCompany = true">
          添加车辆集团
      </el-button>
    </content-top>
    <el-table
        :data="vehicleCompanyList"
        style="width: 100%">
      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column :label="$t('tableth.name')" prop="name">
      </el-table-column>
      <el-table-column :label="$t('tableth.name_en')" prop="name_en">
      </el-table-column>
      <el-table-column label="收款账号">
        <template scope="scope">
          <el-popover
            ref="account"
            placement="bottom"
            width="600"
            trigger="hover"
            v-on:show="currentCompAccountList($event,scope.row.id)" 
            v-on:hide="clearCompAccountList($event)">
            <el-table :data="compAccountList">
              <el-table-column  property="currency" label="币种"></el-table-column>
              <el-table-column  property="bank_name" label="银行名称"></el-table-column>
              <el-table-column  property="deposit_bank" label="开户支行"></el-table-column>
              <el-table-column  property="payee" label="收款人名称"></el-table-column>
              <el-table-column  property="account" label="收款人账号"></el-table-column>
              <el-table-column  property="note" label="备注"></el-table-column>
            </el-table>
          </el-popover>
          <i class="el-icon-view" v-popover:account></i>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text" @click="editvehicleCompany(scope.row)">编辑</el-button>
          <el-button type="text" @click="addOneCompAccount(scope.row.id)">添加收款账号</el-button>
          <el-button type="text" @click="deletevehicleCompany(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="vehicleCompanyModel.id?'编辑集团':'添加集团'" v-model="dialogVehicleCompany" size="tiny" v-on:close="onDialogClose">
      <el-form :model="vehicleCompanyModel">
        <el-form-item label="中文名称">
          <el-input v-model="vehicleCompanyModel.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="vehicleCompanyModel.name_en" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVehicleCompany = false">取 消</el-button>
        <el-button type="primary" @click="addVehicleCompany">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="vehicleAccountModel.user_id||vehicleAccountModel.company_id?'编辑账号':'添加账号'" v-model="dialogVehicleAccount" size="tiny" v-on:close="onDialogClose">
      <el-form :model="vehicleAccountModel">
        <el-form-item label="币种">
          <el-select v-model="vehicleAccountModel.currency">
            <el-option label="美元(USD)" value="1"></el-option>
            <el-option label="人民币(CNY)" value="2"></el-option>
            <el-option label="斯里兰卡卢比(LKR)" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行名称">
          <el-input v-model="vehicleAccountModel.bank_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-input v-model="vehicleAccountModel.deposit_bank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款人名称">
          <el-input v-model="vehicleAccountModel.payee" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款账号">
          <el-input v-model="vehicleAccountModel.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="vehicleAccountModel.note" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVehicleAccount = false">取 消</el-button>
        <el-button type="primary" @click="addVehicleAccount">确 定</el-button>
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
        dialogVehicleCompany:false,
        vehicleCompanyModel:{
          id:'',
          name:'',
          name_en:''
        },
        vehicleCompanyList:[
          {id:1,name:"萨达所",name_en:"asdasd"}
        ],
        compAccountList:[],
        vehicleAccountModel:{
          user_id:'',
          company_id:'',
          currency:'',
          bank_name:'',
          deposit_bank:'',
          payee:'',
          account:'',
          note:''
        },

      }
    },
    created(){
      this.loadVehicleCompanyList();
    },
    locales:{
      en:{
        tableth:{
          name:'chinese name',
          name_en:'english name'
        }
      },'zh-cn':{
        tableth:{
          name:'中文名称',
          name_en:'英文名称'
        }
      }
    },
    methods:{
      addVehicleCompany(){
        if(this.vehicleCompanyModel.id){
          this.$http.put('/vehicle_company/'+this.vehicleCompanyModel.id,this.vehicleCompanyModel).then(res=>{
            if (res.code === 200){
              this.vehicleCompanyModel = false;
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.loadVehicleCompanyList();
            }else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          },err =>{
            console.log(err);
          })
        }else {
          this.$http.post('/vehicle_company/create_company',this.vehicleCompanyModel).then(res=>{
            if(res.code === 200){
              this.vehicleCompanyModel = false;
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.loadVehicleCompanyList();
            }else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          },err=>{
            console.log(err);
          })
        }
        
      },
      openOneCompAccount(id){
        this.dialogVehicleAccount = true;
        this.vehicleAccountModel.company_id = id;

      },
      submitOneCompAccount(){

      },
      currentCompAccountList($event,id){
        this.$http.get('/vehicle_account/get?company_id='+id).then(res=>{
          if(res.code === 200){
            this.compAccountList = res.data;
          }else {
            console.log(res.message);
          }
        },err=>{
          console.log(err);
        })
      },
      clearCompAccountList($event){
        this.compAccountList = [];
      },
      editVehicleCompany(item){
        this.dialogVehicleCompany = true;
        this.vehicleCompanyModel = item;
      },
      deleteVehicleCompany(scope){
        this.$http.delete('/vehicle_company'+scope.row.id).then(res=>{
          if (res.code === 200){
            this.vehicelCompanyList.splice(scope.$index,1);
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        },err=>{
          console.log(err);
        })
      },
      onDialogClose(){
        this.vehicleCompanyModel = {id:'',name:'',name_en:''}
      },
      loadVehicleCompanyList(){
        this.$http.get('/vehicle_company').then(res=>{
          if (res.code === 200){
            //todo list 返回体
            this.vehicelCompanyList;
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