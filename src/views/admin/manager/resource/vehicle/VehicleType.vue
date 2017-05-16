<template>
  <div>
    <content-top>
      <el-button class="add-btn"
                 type="primary"
                 icon="add-btn el-icon-plus"
                 @click="openEdit">
        添加车型
      </el-button>
    </content-top>
    <el-form :inline="true">
      <el-form-item label="车辆类型">
        <el-select v-model="filter.vehicle_type" clearable>
          <el-option v-for="item in typeList" :value="item.value" :key="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="loadVehicleTypeList(1)">查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="vehicleTypeList" v-loading.body="loading">
      <el-table-column prop="vehicle_type" label="车型" :formatter="typeFormatter"></el-table-column>
      <el-table-column prop="brand" label="品牌"></el-table-column>
      <el-table-column prop="seat" label="理论座位数"></el-table-column>
      <el-table-column prop="available_seat" label="可用座位数"></el-table-column>
      <el-table-column prop="passenger_count" label="建议座位数"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="openEdit(scope.row.id)">编辑
          </el-button>
          <el-button type="text"
                     @click="deleteType(scope)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:30px;"
                   v-if="vehicleTypeList.length !== 0"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="filter.page"
                   :page-sizes="[20, 50, 100, 200]"
                   :page-size="filter.number"
                   layout="total,sizes, prev, pager, next"
                   :total="total">
    </el-pagination>
    <el-dialog v-model="dialogVehicleType" :title="modelVehicleType.id?'编辑车型':'新增车型'" size="full"
               v-on:close="onDialogClose">
      <el-form :model="modelVehicleType" :inline="true" label-position="top">
        <el-form-item label="车型">
          <el-select v-model="modelVehicleType.vehicle_type">
            <el-option v-for="item in typeList"
                       :value="item.value"
                       :key="item.value"
                       :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="modelVehicleType.brand"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="理论座位数">
          <el-input v-model.number="modelVehicleType.seat"></el-input>
        </el-form-item>
        <el-form-item label="可用座位数">
          <el-input v-model.number="modelVehicleType.available_seat"></el-input>
        </el-form-item>
        <el-form-item label="建议座位数">
          <el-input v-model.number="modelVehicleType.passenger_count"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="备注" style="width: 50%">
          <el-input v-model="modelVehicleType.note"></el-input>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button @click="submit" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import ContentTop from 'src/views/components/ContentTop.vue'
  export default {
    data(){
      return {
        filter: {
          vehicle_type: null,
          page: 1,
          number: 20
        },
        typeList: [
          {label: '轿车', value: 1},
          {label: '货车', value: 2},
          {label: '大货车', value: 3},
          {label: '迷你大巴', value: 4},
          {label: '大巴', value: 5},
          {label: '加长大巴', value: 6},
          {label: '其他', value: 7}
        ],
        modelVehicleType: {
          vehicle_type: null,
          brand: null,
          seat: null,
          available_seat: null,
          passenger_count: null,
          note: null
        },
        dialogVehicleType: false,
        vehicleTypeList: [],
        CompanyList: [],
        loading: false,
        total: null
      }
    },
    created(){
      this.loadVehicleTypeList(1);
    },
    methods: {
      loadVehicleTypeList(page){
        this.filter.page = page ? page : this.filter.page;
        this.$http.get('/vehicle/type/search', {
          params: _.omitBy(this.filter, function (item) {
            return item === '' || item === null
          })
        }).then(res => {
          if (res.data.code === 200) {
            this.vehicleTypeList = res.data.data.vehicle_type_list;
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
      openEdit(type_id){
        this.dialogVehicleType = true;
        if (type_id) {
          this.$http.get('/vehicle/type/' + type_id).then(res => {
            if (res.data.code === 200) {
              this.modelVehicleType = res.data.data;
            } else {
              console.log(res.data.message);
            }
          }, err => {
            console.log(err);
          })
        }
      },
      onDialogClose(){
        _.forOwn(this.modelVehicleType, (value, key) => {
          this.modelVehicleType[key] = null;
        })
      },
      deleteType(scope){
        this.$confirm('此操作将永久删除此车型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/vehicle/type/' + scope.row.id).then(res => {
            if (res.data.code === 200) {
              this.vehicleTypeList.splice(scope.$index, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.loadVehicleTypeList();
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          }).catch(err => {
            console.log(err);
          })
        })
      },
      submit(){
        if (this.modelVehicleType.id) {
          this.$http.put('/vehicle/type/' + this.modelVehicleType.id, _.omit(this.modelVehicleType, ['created_at', 'updated_at'])).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.dialogVehicleType = false;
              this.loadVehicleTypeList();
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          this.$http.post('/vehicle/type/create', this.modelVehicleType).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.dialogVehicleType = false;
              this.loadVehicleTypeList();
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          }).catch(err => {
            console.log(err);
          })
        }
      },
      deleteType(scope) {
        this.$confirm('此操作将永久删除该车型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/vehicle/type/' + scope.row.id).then(res => {
            if (res.data.code === 200) {
              this.vehicleTypeList.splice(scope.$index, 1);
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
      handleSizeChange(size) {
        this.filter.number = size;
        this.loadVehicleTypeList();
      },
      handleCurrentChange(page) {
        this.filter.page = page;
        this.loadVehicleTypeList();
      },
      typeFormatter(row, column){
        let type = _.find(this.typeList, type => type.value === row.vehicle_type)['label'];
        return type;
      }
    },
    components: {
      ContentTop
    }
  }
</script>