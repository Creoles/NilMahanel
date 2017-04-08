<template>
    <div>
        <content-top>
            <el-button class="add-btn el-icon-plus"
                       type="primary"
                       @click="addShop">
                添加商店
            </el-button>
        </content-top>
        <div>
            <el-form :inline="true"
                     label-position="left"
                     :model="shopFilter"
                     class="shop-filter">
                <el-form-item :label="$t('label.filter.country')">
                    <country-select :country="countryArr"
                                    v-on:country-change="onFilterCountryChange($event)"></country-select>
                </el-form-item>
                <el-form-item :label="$t('label.filter.type')">
                    <el-select v-model="shopFilter.shop_type"
                               placeholder="type"
                               clearable>
                        <el-option label="珠宝"
                                   value="1"></el-option>
                        <el-option label="红茶"
                                   value="2"></el-option>
                        <el-option label="其他"
                                   value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('label.filter.company')">
                    <el-select v-model="shopFilter.company_id"
                               placeholder="type"
                               clearable>
                        <el-option :key="item.id"
                                   value="item.id"
                                   label="item.name"
                                   v-for="item in companyList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="fitler">{{$t('label.filter.search')}}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="shopList"
                  v-loading.body="loading"
                  style="width: 100%">
            <el-table-column prop="country_id"
                             label="国家"
                             :formatter="countryFormatter">
            </el-table-column>
            <el-table-column prop="city_id"
                             label="城市"
                             :formatter="cityFormatter">
            </el-table-column>
            <el-table-column prop="name"
                             label="名称"
                             width="130">
            </el-table-column>
            <el-table-column prop="shop_type"
                             label="类型"
                             :formatter="typeFormatter">
            </el-table-column>
            <el-table-column prop="fee_person"
                             label="人头费(USD)">
            </el-table-column>
            <el-table-column prop="commission_ratio"
                             label="返佣比例(%)">
            </el-table-column>
            <el-table-column prop="contcat"
                             label="联系人">
            </el-table-column>
            <el-table-column prop="telephone"
                             label="联系电话">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text"
                               @click="editShop(scope.row.id)">编辑</el-button>
                    <el-button type="text"
                               @click="deleteShop(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align:right;margin-top:30px;"
                       v-if="shopList.length !== 0"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="shopFilter.page"
                       :page-sizes="[20, 50, 100, 200]"
                       :page-size="shopFilter.number"
                       layout="total,sizes, prev, pager, next"
                       :total="shopTotalNum">
        </el-pagination>
    </div>
</template>
<style>

</style>
<script>
import ContentTop from "src/views/components/ContentTop.vue"
import CountrySelect from "src/views/components/CountrySelect.vue"
import { mapGetters } from "vuex"
export default {
    data() {
        return {
            shopFilter: {
                country_id: '',
                city_id: '',
                shop_type: '',
                company_id: '',
                page: 1,
                number: 20
            },
            countryArr: [],
            shopTotalNum: 1000,
            countryList: [],
            companyList: [],
            loading: false,
            shopList: [
                {
                    id: 1,
                    country_id: 1,
                    city_id: 1,
                    address: "chongqing yubei",
                    name: "家乐福",
                    name_en: "family",
                    shop_type: 1,
                    belong: 1,
                    contcat: "rancongjie",
                    telephone: "18523199991",
                    intr_cn: "哈哈哈",
                    intr_en: "hhhh",
                    fee_person: 14.6,
                    commission_ratio: 14.6

                },
                {
                    id: 2,
                    country_id: 1,
                    city_id: 1,
                    address: "chongqing yubei",
                    name: "沃尔玛",
                    name_en: "family",
                    shop_type: 1,
                    belong: 1,
                    contcat: "rancongjie",
                    telephone: "18523199991",
                    intr_cn: "哈哈哈",
                    intr_en: "hhhh",
                    fee_person: 14.6,
                    commission_ratio: 14.6
                }
            ]
        }
    },
    created() {
        this.loadCountryList();
        this.loadCompanyList();
        this.loadShopList(1);
    },
    computed: {
        ...mapGetters({
            lang: "getLang"
        })
    },
    locales: {
        en: {
            name: 'name_en',
            label: {
                filter: {
                    country: 'country&city',
                    type: 'shop type',
                    company: 'company',
                    search: 'search'
                }
            }
        },
        'zh-cn': {
            name: 'name',
            label: {
                filter: {
                    country: '国家及城市',
                    type: '商店类型',
                    company: '所属公司',
                    search: '查询'
                }
            }
        }
    },
    methods: {
        addShop() {
            this.$router.push({ name: "ADD SHOP" })
        },
        fitler() {
            this.loadShopList(1);
        },
        handleSizeChange(size) {
            this.shopFilter.number = size;
            this.loadShopList();
        },
        handleCurrentChange(page) {
            this.shopFilter.page = page;
            this.loadShopList();
        },
        editShop(id) {
            this.$router.push({ name: "EDIT SHOP", params: { id: id } });
        },
        deleteShop(scope) {
            this.$confirm('此操作将永久删除 ' + scope.row.name + ' 这家商店吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete('/shop/' + scope.row.id).then(res => {
                    if (res.code === 200) {
                        this.shopList.splice(scope.$index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
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
        //只有第一页有total
        loadShopList(page) {
            this.shopFilter.page = page ? page : this.shopFilter.page;
            this.loading = true;
            this.$http.get('/shop/search', {
                params: this.shopFilter
            }).then(res => {
                if (res.code === 200) {
                    this.shopList = res.data.shop_data;
                    if (paga === 1) {
                        this.total = res.data.total;
                    }
                    this.loading = false;
                } else {
                    this.loading = false;
                    console.log(res.message);
                }
            }, err => {
                console.log(err);
                this.loading = false;
            })
        },
        //城市选择器 事件
        onFilterCountryChange(msg) {
            this.shopFilter.country_id = msg[0];
            this.shopFilter.city_id = msg[1];
        },
        //获得城市列表
        loadCountryList() {
            //todo api
            this.countryList = [{ id: 1, name: "斯里兰卡", name_en: "Srilanka", "city_data": [{ id: 1, name: "科伦坡", name_en: "asdas" }] }];
        },
        //获得公司列表
        loadCompanyList() {
            this.$http.get('/shop_company').then(res => {
                if (res.code === 200) {
                    //todo
                    this.companyList = res.data.data;
                } else {
                    console.log(res.mssage);
                }
            }, err => {
                console.log(err);
            })
        },
        typeFormatter(row, column) {
            let type = { 1: "珠宝", 2: "红茶", 3: "其他" };
            return type[row.shop_type];
        },
        countryFormatter(row, column) {
            let country = this.countryList.filter(country =>
                country.id === row.country_id
            )[0][this.$t('name')]
            return country;
        },
        cityFormatter(row, column) {
            let cityList = this.countryList.filter(country =>
                country.id === row.country_id
            )[0]['city_data'];
            let city = cityList.filter(city =>
                city.id === row.city_id
            )[0][this.$t('name')];
            return city;
        }
    },
    components: {
        ContentTop,
        CountrySelect
    }
}
</script>
