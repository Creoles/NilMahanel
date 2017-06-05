<template>
  <div>
    <content-top>
      <el-button class="add-btn el-icon-plus"
                 type="primary"
                 @click="addHotelCompany">
        添加酒店公司
      </el-button>
    </content-top>
    <div>
      <el-form :inline="true"
               label-position="left"
               :model="filter">
        <el-form-item label="国家及城市">
          <country-select :country="countryArr"
                          v-on:country-change="onFilterCountryChange($event)"></country-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="loadHotelCompanyList(1)">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="hotelCompanyList"
              style="width: 100%"
              v-loading.body="loading">
      <el-table-column prop="country_id"
                       label="国家"
                       :formatter="countryFormatter">
      </el-table-column>
      <el-table-column prop="city_id"
                       label="城市"
                       :formatter="cityFormatter">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称">
      </el-table-column>
      <el-table-column prop="name_en" label="英文名称"></el-table-column>
      <el-table-column prop="nickname_en"
                       label="简称">
      </el-table-column>
      <el-table-column prop="register_number"
                       label="公司注册编号">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text"
                     @click="editHotelCompany(scope.row.id)">编辑
          </el-button>
          <el-button type="text"
                     @click="openContact(scope.row.id)">公司联系人
          </el-button>
          <el-button type="text"
                     @click="deleteHotelCompany(scope)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align:right;margin-top:30px;"
                   v-if="shopCompanyList.length !== 0"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="filter.page"
                   :page-sizes="[20, 50, 100, 200]"
                   :page-size="filter.number"
                   layout="total,sizes, prev, pager, next"
                   :total="total">
    </el-pagination>
    <el-dialog title="联系人"
               v-model="dialogContact"
               size="large" v-on:close="closeDialog">
      <div>
        <el-table :data="contactList" v-on:header-click="addLine">
          <el-table-column label="+" width="20">
          </el-table-column>
          <el-table-column label="联系人名称">
            <template scope="scope">
              <el-input v-model="scope.row.contact"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="联系人职位">
            <template scope="scope">
              <el-input v-model="scope.row.position" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="电话">
            <template scope="scope">
              <el-input v-model="scope.row.telephone" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="email">
            <template scope="scope">
              <el-input v-model="scope.row.email" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="submitContact(scope)">保存</el-button>
              <el-button size="small" @click="deleteContact(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CountrySelect from "src/views/components/CountrySelect.vue"
  export default {
    data(){
      return {
        hotelCompanyList: [],
      }
    },
    methods: {
      loadHotelCompanyList(){
        this.$http.get('/hotel/company/search', {params: {page: 1, number: 10000}}).then(res => {
          if (res.data.code === 200) {
            this.hotelCompanyList = res.data.data;
          } else {
            console.log(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      addHotelCompany(){

      },
      editHotelCompany(){

      },
      countryFormatter(row, column) {
        let country = _.find(this.countryList, country => country.id === row.country_id)['name'];
        return country;
      },
      cityFormatter(row, column) {
        let cityList = _.find(this.countryList, country => country.id === row.country_id)['city_data'];
        let city = _.find(cityList, city => city.id === row.city_id)['name'];
        return city;
      },
    },
    components: {
      CountrySelect
    }
  }
</script>