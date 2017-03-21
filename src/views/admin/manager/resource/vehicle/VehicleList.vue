<template>
    <div>
        <content-top>
            <el-button class="add-btn" type="primary" icon="el-icon-plus" @click="addVehicle">
                添加车辆
            </el-button>
        </content-top>
         <div>
            <el-form :inline="true" label-position="left"  :model="filter" class="vehicle-filter">
                <el-form-item label="城市及国家">
                    <country-select :country="countryArr" v-on:country-change="onFilterCountryChange($event)"></country-select>
                </el-form-item>
                <el-form-item label="座位数">
                    
                </el-form-item>
                <el-form-item label="所属公司">
                    <el-select v-model="filter.company_id"  placeholder="type" clearable>
                        <el-option :key="item.id" value="item.id" label="item.name" v-for="item in companyList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="fitler">{{$t('label.filter.search')}}</el-button>
                </el-form-item>
            </el-form>
       </div>
        <el-table
                :data="vehicleList"
                style="width: 100%">
            <el-table-column
                    prop="country_id"
                    label="国家"
                    :formatter="countryFormatter">
            </el-table-column>
             <el-table-column
                    prop="city_id"
                    label="城市"
                    :formatter="cityFormatter">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="型号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="zuoweishu"
                    label="座位数">
            </el-table-column>
            <el-table-column
                    prop="chepai"
                    label="车牌号">
            </el-table-column>
            <el-table-column
                    prop="lvyouju"
                    label="旅游局注册号">
            </el-table-column>
            <el-table-column
                    prop="year"
                    label="年限">
            </el-table-column>
            <el-table-column
                    prop="baoxianhao"
                    label="保险号">
            </el-table-column>
            <el-table-column
                    prop="baoxianhao"
                    label="联系电话">
            </el-table-column>
        </el-table>
        <el-pagination 
            style="text-align:right;margin-top:30px;"
            v-if="shopList.length !== 0"
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
<style lang="scss">
    .add-btn {
        float:right;

    }
</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    export default{
        data(){
            return{
                vehicleList:[],
                filter:{
                    contry_id:'',
                    city_id:'',
                    seat:'',
                    company_id:'',
                    number:20,
                    page:1,
                    //1:小于 2 等于 3 大于
                    operation:1,
                },
                countryList:[],
                companyList:[],
                loading:false,
                total:'',
            }
        },
        methods:{
            addVehicle(){
                this.$router.push({name:"ADD VEHICLE"})
            },
            loadVehicleList(page){
                this.filter.page = page ? page : this.filter.page;
                this.loading = true;
                this.$http.get('/vehicle/search',{
                    params:this.filter
                }).then(res=>{
                    if(res.code === 200){
                        this.vehicleList = res.data.vehicle_data;
                        if(paga === 1){
                            this.total = res.data.total;
                        }
                        this.loading = false;
                    }else {
                        this.loading = false;
                        console.log(res.message);
                    }
                },err => {
                    console.log(err);
                    this.loading = false;
                })
            },
            handleSizeChange(size){
                this.filter.number = size;
                this.loadVehicleList();
            },
            handleCurrentChange(page){
                this.filter.page = page;
                this.loadVehicleList();
            },
            loadContryList(){
                //todo
                this.countryList = [{id:1,name:"斯里兰卡",name_en:"Srilanka","city_data":[{id:1,name:"科伦坡",name_en:"asdas"}]}];
            },
            loadCompanyList(){
                this.$http.get('/vehicle_company').then(res=>{
                    if(res.code === 200){
                        //todo
                        this.companyList = res.data.data;
                    }else {
                        console.log(res.mssage);
                    }
                },err=>{
                    console.log(err);
                })
            },
            countryFormatter(row,column){
                let country = this.countryList.filter(country=>
                    country.id === row.country_id
                )[0][this.$t('name')]
                return country;
            },
            cityFormatter(row,column){
                let cityList = this.countryList.filter(country=>
                    country.id === row.country_id
                )[0]['city_data'];
                let city = cityList.filter(city=>
                    city.id === row.city_id
                )[0][this.$t('name')];
                return city;
            }
        },
        components:{
            ContentTop
        }
    }
</script>
