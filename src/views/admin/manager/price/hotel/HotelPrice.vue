<template>
  <div>
    <content-top></content-top>
    <div>
      英文名全称：<span>{{hotelInfo.name_en}}</span> 中文名全称：<span>{{hotelInfo.name}}</span>
    </div>
    <hr>
    <div>
      <el-form :inline="true">
        <el-form-item label="免房政策">
          <el-select v-model="fee.free_policy">
            <el-option label="按客户数"
                       :value="1"></el-option>
            <el-option label="按房间数"
                       :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="多少免一">
          <el-input v-model.number="fee.free"></el-input>
        </el-form-item>
        <el-form-item label="价格确认人">
          <el-input v-model="fee.confirm_person"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="fee.note"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primay" @click="submitFee">保存</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div v-if="hotel_fee_id!=null">
      <hr>
      <div>
        <el-form :inline="true">
          <div>
            房间价格&nbsp;&nbsp;
            <el-button type="primary" size="small"
                       style="margin-bottom:10px;"
                       @click="addOneRoomPrice">添加一条
            </el-button>
          </div>
          <div v-for="(item,index) in roomPriceList">
            <el-form-item label="房间类型">
              <el-select v-model="item.room_type">
                <el-option label="大床房"
                           :value="1"></el-option>
                <el-option label="双人间"
                           :value="2"></el-option>
                <el-option label="三人间"
                           :value="3"></el-option>
                <el-option label="套房"
                           :value="4"></el-option>
                <el-option label="导游房"
                           :value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="item.start_time"
                type="date"
                placeholder="start" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="item.end_time"
                type="date"
                placeholder="end" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="价格（usd）">
              <el-input v-model="item.price"></el-input>
            </el-form-item>
            <el-form-item label="note">
              <el-input v-model="item.note"></el-input>
            </el-form-item>
            <el-form-item scope="scope">
              <i class="el-icon-circle-cross"
                 style="cursor:pointer"
                 @click="deleteRoomPrice(item.id,index)"></i>
            </el-form-item>
          </div>
          <div>
            <el-button type="primary" @click="submitRoomPrice">保存房间价格</el-button>
          </div>
        </el-form>
        <hr>
        <el-form :inline="true">
          <div>
            餐饮价格&nbsp;&nbsp;
            <el-button type="primary" size="small"
                       style="margin-bottom:10px;"
                       @click="addOneMealPrice">添加一条
            </el-button>
          </div>
          <div v-for="(item,index) in mealPriceList">
            <el-form-item label="餐饮类型">
              <el-select v-model="item.meal_type">
                <el-option label="早餐"
                           :value="1"></el-option>
                <el-option label="午餐"
                           :value="2"></el-option>
                <el-option label="晚餐"
                           :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="item.start_time"
                type="date"
                placeholder="start" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="item.end_time"
                type="date"
                placeholder="end" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="价格（usd）">
              <el-input v-model="item.price"></el-input>
            </el-form-item>
            <el-form-item label="note">
              <el-input v-model="item.note"></el-input>
            </el-form-item>
            <el-form-item scope="scope">
              <i class="el-icon-circle-cross"
                 style="cursor:pointer"
                 @click="deleteMealPrice(item.id,index)"></i>
            </el-form-item>
          </div>
          <div>
            <el-button type="primary" @click="submitMealPrice">保存房间价格</el-button>
          </div>
        </el-form>
      </div>
      <hr style="margin-top: 20px">
    </div>

  </div>
</template>
<script>
  import ContentTop from "src/views/components/ContentTop.vue"
  export default {
    data(){
      return {
        hotelInfo: {},
        roomPriceList: [],
        mealPriceList: [],
        deleteRoomPriceList: [],
        deleteMealPriceList: [],
        hotel_fee_id: null,
        fee: {
          id: null,
          hotel_id: this.$route.params.id,
          confirm_person: null,
          free_policy: null,
          free: null,
          note: null,
          attachment_hash: 'sadasd'
        },

      }
    },
    created(){
      this.loadFee();
    },
    methods: {
      loadFee(){
        this.$http.get('/hotel/fee/hotel/' + this.$route.params.id).then(res => {
          if (res.data.code === 200) {
            this.fee = _.assign(this.fee, res.data.data);
            this.hotel_fee_id = res.data.data.id;
            this.roomPriceList = res.data.data.room_price;
            this.mealPriceList = res.data.data.meal_price;
            _.forOwn(this.roomPriceList, (item) => {
              item.start_time = new Date(item.start_time * 1000);
              item.end_time = new Date(item.end_time * 1000);
            });
            _.forOwn(this.mealPriceList, (item) => {
              item.start_time = new Date(item.start_time * 1000);
              item.end_time = new Date(item.end_time * 1000);
            });
          } else {
            console.log(res.data.message);
          }
        })
      },
      submitFee(){
        if (this.fee.id) {
          this.$http.put('/hotel/fee/' + this.fee.id,
            _.omit(this.fee, ['created_at', 'updated_at'])
          ).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '保存费率基础信息成功'
              });
              this.submitting = false;
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
              this.submitting = false;
            }
          }).catch(err => {
            console.log(err);
            this.submitting = false;
          })
        }
        else {
          this.$http.post('/hotel/fee/create', this.fee).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '保存费率基础信息成功'
              });
              this.hotel_fee_id = res.data.fee_id;
              this.submitting = false;
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
              this.submitting = false;
            }
          }).catch(err => {
            console.log(err);
            this.submitting = false;
          })
        }
      },
      addOneRoomPrice(){
        this.roomPriceList.push({
          id: null,
          hotel_fee_id: this.hotel_fee_id,
          room_type: null,
          start_time: null,
          end_time: null,
          price: null,
          note: null
        });
      },
      deleteRoomPrice(id, index) {
        if (id) {
          this.deleteRoomPriceList.push(id);
        }
        this.roomPriceList.splice(index, 1);
      },
      deleteMealPrice(id, index) {
        if (id) {
          this.deleteMealPriceList.push(id);
        }
        this.mealPriceList.splice(index, 1);
      },
      addOneMealPrice(){
        this.mealPriceList.push({
          id: null,
          hotel_fee_id: this.hotel_fee_id,
          meal_type: null,
          start_time: null,
          end_time: null,
          price: null,
          note: null
        })
      },
      submitMealPrice(){
        this.submitting = true;
        let updateList = [];
        let createList = [];
        let paramsList = {};
        _.forOwn(this.mealPriceList, item => {
          item.start_time = Date.parse(new Date(item.start_time)) / 1000;
          item.end_time = Date.parse(new Date(item.end_time)) / 1000;
          if (item.id) {
            updateList.push(item);
          } else {
            createList.push(item);
          }
        });
        paramsList['create_list'] = createList;
        paramsList['update_list'] = updateList;
        paramsList['delete_id_list'] = this.deleteMealPriceList;
        this.$http.post('/hotel/meal_price/edit', paramsList).then(res => {
          if (res.data.code === 200) {
            this.submitting = false;
            this.$message({
              type: 'success',
              message: '修改餐饮价格成功!'
            });
            this.dialogMeal = false;
            this.loadFee();
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
      submitRoomPrice(){
        this.submitting = true;
        let updateList = [];
        let createList = [];
        let paramsList = {};
        _.forOwn(this.roomPriceList, item => {
          debugger;
          item.start_time = Date.parse(new Date(item.start_time)) / 1000;
          item.end_time = Date.parse(new Date(item.end_time)) / 1000;
          if (item.id) {
            updateList.push(item);
          } else {
            createList.push(item);
          }
        });
        debugger;
        paramsList['create_list'] = createList;
        paramsList['update_list'] = updateList;
        paramsList['delete_id_list'] = this.deleteRoomPriceList;
        this.$http.post('/hotel/room_price/edit', paramsList).then(res => {
          if (res.data.code === 200) {
            this.submitting = false;
            this.$message({
              type: 'success',
              message: '修改房间价格成功!'
            });
            this.dialogMeal = false;
            this.loadFee();
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
      }
    },
    components: {
      ContentTop
    }
  }
</script>