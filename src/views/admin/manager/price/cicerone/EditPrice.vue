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
                     @click="editPrice(scope)">编辑费用
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
        <el-form-item label="基本工资(/天)">
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
                   v-if="!submitting">取 消
        </el-button>
        <el-button type="primary"
                   v-if="!submitting"
                   @click="submitPrice">确 定
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
        total: null,
        countryList: [],
        loading: false,
        ciceroneList: [],
        dialogPrice: false,
        currentTourId: null,
        currentPriceName: {
          name: null,
          name_en: null,
        },
        priceModel: {
          id: null,
          tour_guide_id: null,
          currency: null,
          base_fee: null,
          service_type: null,
          service_fee: null
        },
        priceLoading: false,
        submitting: false

      }
    },
    created(){
      this.loadCountryList();
      this.loadCiceroneList(1);
    },
    methods: {
      handleSizeChange(size) {
        this.filter.number = size;
        this.loadCiceroneList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadCiceroneList();
      },
      editPrice(scope) {
        this.currentPriceName.name = scope.row.name;
        this.currentPriceName.name_en = scope.row.name_en;
        this.currentPriceName.tour_guide_id = scope.row.id;
        this.priceLoading = true;
        this.dialogPrice = true;
        this.$http.get('/tour_guide/fee/' + scope.row.id).then(res => {
          if (res.data.code === 200) {
            this.priceModel = _.assign(this.priceModel, res.data.data);
            this.priceLoading = false;
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
            this.priceLoading = false;
          }

        }).catch(err => {
          this.priceLoading = false;
          console.log(err);
        })
      },
      submitPrice() {
        this.submitting = true;
        if (this.priceModel.id) {
          this.$http.put('/tour_guide/fee/' + this.priceModel.id, this.priceModel).then(res => {
            this.submitting = false;
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.dialogPrice = false;
            } else {
              this.submitting = false;
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
          this.$http.post('/tour_guide/fee/create', this.priceModel).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
              this.submitting = false;
              this.dialogPrice = false;
            } else {
              this.submitting = false;
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