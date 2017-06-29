<template>
  <div>
    <content-top>
      <div style="padding: 10px 0;text-align: right">
        英文名全称：<span>{{hotelInfo.name_en}}</span> 中文名全称：<span>{{hotelInfo.name}}</span>
      </div>
    </content-top>

    <div>
      <el-form :inline="true" label-position="top">
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
        <el-form-item label="操作">
          <el-button type="primay" @click="submitFee">保存</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div v-if="hotel_fee_id!=null" style="margin-bottom: 100px">
      <hr>
      <div>
        <el-form :inline="true" label-position="top">
          <div>
            房间价格&nbsp;&nbsp;
            <el-button type="primary" size="mini"
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
          <div style="text-align: right;margin-right: 50px">
            <el-button type="primary" @click="submitRoomPrice">保存房间价格</el-button>
          </div>
        </el-form>
        <hr style="margin-top: 20px">
        <el-form :inline="true" label-position="top">
          <div>
            餐饮价格&nbsp;&nbsp;
            <el-button type="primary" size="mini"
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
          <div style="text-align: right;margin-right: 50px">
            <el-button type="primary" @click="submitMealPrice">保存房间价格</el-button>
          </div>
        </el-form>
      </div>
      <hr style="margin-top: 20px">
      <el-form :inline="true" label-position="top">
        <div>
          房间级别附加费&nbsp;&nbsp;
          <el-button type="primary" size="mini"
                     style="margin-bottom:10px;"
                     @click="addOneLevelPrice">添加一条
          </el-button>
        </div>
        <div v-for="(item,index) in levelPriceList">
          <el-form-item label="房间类型">
            <el-select v-model="item.room_level">
              <el-option label="标准间"
                         :value="1"></el-option>
              <el-option label="豪华间"
                         :value="2"></el-option>
              <el-option label="套间"
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
          <el-form-item label="附加费用（usd）">
            <el-input v-model="item.price"></el-input>
          </el-form-item>
          <el-form-item label="note">
            <el-input v-model="item.note"></el-input>
          </el-form-item>
          <el-form-item scope="scope">
            <i class="el-icon-circle-cross"
               style="cursor:pointer"
               @click="deleteLevelPrice(item.id,index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: right;margin-right: 50px">
          <el-button type="primary" @click="submitLevelPrice">保存房间级别附加费</el-button>
        </div>
      </el-form>
      <hr style="margin-top: 20px">
      <el-form :inline="true" label-position="top">
        <div>
          节庆附加费&nbsp;&nbsp;
          <el-button type="primary" size="mini"
                     style="margin-bottom:10px;"
                     @click="addOneFestivalPrice">添加一条
          </el-button>
        </div>
        <div v-for="(item,index) in festivalPriceList">
          <el-form-item label="节假日类型">
            <el-select v-model="item.festival_type">
              <el-option label="平安夜"
                         :value="1"></el-option>
              <el-option label="圣诞节"
                         :value="2"></el-option>
              <el-option label="元旦"
                         :value="3"></el-option>
              <el-option label="中国新年"
                         :value="4"></el-option>
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
          <el-form-item label="附加费用（usd）">
            <el-input v-model="item.price"></el-input>
          </el-form-item>
          <el-form-item label="note">
            <el-input v-model="item.note"></el-input>
          </el-form-item>
          <el-form-item scope="scope">
            <i class="el-icon-circle-cross"
               style="cursor:pointer"
               @click="deleteFestivalPrice(item.id,index)"></i>
          </el-form-item>
        </div>
        <div style="text-align: right;margin-right: 50px">
          <el-button type="primary" @click="submitFestivalPrice">保存节假日附加费</el-button>
        </div>
      </el-form>
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
        levelPriceList:[],
        festivalPriceList:[],
        deleteRoomPriceList: [],
        deleteMealPriceList: [],
        deleteLevelPriceList:[],
        deleteFestivalPriceList:[],
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
      this.loadInfo();
    },
    methods: {
      loadInfo(){
        this.$http.get('/hotel/'+this.$route.params.id).then(res=>{
          if(res.data.code === 200){
            this.hotelInfo = res.data.data;
          }else {
            console.log(res.data.message);
          }
        })
      },
      loadFee(){
        this.$http.get('/hotel/fee/hotel/' + this.$route.params.id).then(res => {
          if (res.data.code === 200) {
            this.fee = _.assign(this.fee, res.data.data);
            this.hotel_fee_id = res.data.data.id;
            _.forOwn(res.data.data.room_price, (item) => {
              item.start_time = new Date(item.start_time * 1000).toLocaleString();
              item.end_time = new Date(item.end_time * 1000).toLocaleString();
            });
            _.forOwn(res.data.data.meal_price, (item) => {
              item.start_time = new Date(item.start_time * 1000).toLocaleString();
              item.end_time = new Date(item.end_time * 1000).toLocaleString();
            });
            _.forOwn(res.data.data.room_additional_charge, (item) => {
              item.start_time = new Date(item.start_time * 1000).toLocaleString();
              item.end_time = new Date(item.end_time * 1000).toLocaleString();
            });
            _.forOwn(res.data.data.festival_additional_charge, (item) => {
              item.start_time = new Date(item.start_time * 1000).toLocaleString();
              item.end_time = new Date(item.end_time * 1000).toLocaleString();
            });
            this.roomPriceList = res.data.data.room_price;
            this.mealPriceList = res.data.data.meal_price;
            this.levelPriceList = res.data.data.room_additional_charge;
            this.festivalPriceList = res.data.data.festival_additional_charge
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
      addOneLevelPrice(){
        this.levelPriceList.push({
          id: null,
          hotel_fee_id: this.hotel_fee_id,
          room_level: null,
          start_time: null,
          end_time: null,
          price: null,
          note: null
        })
      },
      addOneFestivalPrice(){
        this.festivalPriceList.push({
          id: null,
          hotel_fee_id: this.hotel_fee_id,
          festival_type: null,
          start_time: null,
          end_time: null,
          price: null,
          note: null
        })
      },
      deleteFestivalPrice(id, index) {
        if (id) {
          this.deleteFestivalPriceList.push(id);
        }
        this.festivalPriceList.splice(index, 1);
      },
      deleteLevelPrice(id, index) {
        if (id) {
          this.deleteLevelPriceList.push(id);
        }
        this.levelPriceList.splice(index, 1);
      },
      submitLevelPrice(){
        this.submitting = true;
        let updateList = [];
        let createList = [];
        let paramsList = {};
        _.forOwn(this.levelPriceList, item => {
          item.start_time = moment.utc(item.start_time).valueOf()/1000;
          item.end_time = moment.utc(item.end_time).valueOf()/1000;
          if (item.id) {
            updateList.push(item);
          } else {
            createList.push(item);
          }
        });
        paramsList['create_list'] = createList;
        paramsList['update_list'] = updateList;
        paramsList['delete_id_list'] = this.deleteLevelPriceList;
        this.$http.post('/hotel/room_additional_charge', paramsList).then(res => {
          if (res.data.code === 200) {
            this.submitting = false;
            this.$message({
              type: 'success',
              message: '修改房间级别附加费成功!'
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
      submitFestivalPrice(){
        this.submitting = true;
        let updateList = [];
        let createList = [];
        let paramsList = {};
        _.forOwn(this.festivalPriceList, item => {
          item.start_time = moment.utc(item.start_time).valueOf()/1000;
          item.end_time = moment.utc(item.end_time).valueOf()/1000;
          if (item.id) {
            updateList.push(item);
          } else {
            createList.push(item);
          }
        });
        paramsList['create_list'] = createList;
        paramsList['update_list'] = updateList;
        paramsList['delete_id_list'] = this.deleteFestivalPriceList;
        this.$http.post('/hotel/festival_additional_charge/edit', paramsList).then(res => {
          if (res.data.code === 200) {
            this.submitting = false;
            this.$message({
              type: 'success',
              message: '修改房间级别附加费成功!'
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
      submitMealPrice(){
        this.submitting = true;
        let updateList = [];
        let createList = [];
        let paramsList = {};
        _.forOwn(this.mealPriceList, item => {
          item.start_time = moment.utc(item.start_time).valueOf()/1000;
          item.end_time = moment.utc(item.end_time).valueOf()/1000;
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
          item.start_time = moment.utc(item.start_time).valueOf()/1000;
          item.end_time = moment.utc(item.end_time).valueOf()/1000;
          if (item.id) {
            updateList.push(item);
          } else {
            createList.push(item);
          }
        });
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