<template>
    <div>
        <content-top>
            <el-button class="add-btn el-icon-plus" type="primary"  @click="addShop">
                添加商店
            </el-button>
        </content-top>
        <div>
            <el-form :inline="true" label-position="left"  :model="shopFilter" class="shop-filter">
                <el-form-item label="国家地区">
                    <el-select v-model="shopFilter.country" placeholder="country">
                        <el-option label="Srilanka" value="0"></el-option>
                        <el-option label="New Zealand" value="1"></el-option>
                        <el-option label="Nepal" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市">
                    <el-select v-model="shopFilter.city" placeholder="city">
                        <el-option label="Srilanka" value="0"></el-option>
                        <el-option label="New Zealand" value="1"></el-option>
                        <el-option label="Nepal" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商店类型">
                    <el-select v-model="shopFilter.type" placeholder="type">
                        <el-option label="Srilanka" value="0"></el-option>
                        <el-option label="New Zealand" value="1"></el-option>
                        <el-option label="Nepal" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="fitler">查询</el-button>
                </el-form-item>
            </el-form>
       </div>
        <el-table
                :data="shopList"
                style="width: 100%">
            <el-table-column
                    prop="country"
                    label="国家"
                    width="130"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="城市"
                    width="130"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="category"
                    label="类型">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格与成本">
                <template scope="props">
                    <div  v-if="props.gridData">
                        <el-popover
                                ref="popover"
                                placement="bottom"
                                width="400"
                                trigger="click">
                            <el-table :data="props.gridData">
                                <el-table-column width="150" property="date" label="日期"></el-table-column>
                                <el-table-column width="100" property="name" label="姓名"></el-table-column>
                                <el-table-column width="300" property="address" label="地址"></el-table-column>
                            </el-table>
                        </el-popover>
                        <i v-popover:popover class="el-icon-view"></i>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    prop="people"
                    label="联系人">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话">
            </el-table-column>
            <el-table-column
                    label="操作">
            </el-table-column>
        </el-table>
    </div>
</template>
<style>

</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    export default{
        data(){
            return{
                shopFilter:{

                },
                shopList:[

                ]
            }
        },
         methods:{
            addShop(){
                this.$router.push({name:"ADD SHOP"})
            },
            fitler(){

            }
        },
        components:{
            ContentTop
        }
    }
</script>
