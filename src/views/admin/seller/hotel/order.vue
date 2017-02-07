<template>
    <div>
        <content-top></content-top>
        <div class="status-change">
            <span>{{orderConfig.choose}}</span>
            <el-select size="small" v-model="statusValue">
                <el-option
                        v-for="item in orderConfig.status"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-table
                :data="tableData3"
                style="width: 100%"
        >
            <el-table-column
                    prop="orderId"
                    :label="orderConfig.thead.orderId"
                    width="95">
            </el-table-column>
            <el-table-column
                    prop="groupId"
                    :label="orderConfig.thead.groupId"
                    width="97">
            </el-table-column>
            <el-table-column
                    prop="date"
                    :label="orderConfig.thead.date"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="hotelName"
                    :label="orderConfig.thead.hotelName"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="singleRoom"
                    :label="orderConfig.thead.single"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="doubleRoom"
                    :label="orderConfig.thead.double"
                    width="85">
            </el-table-column>
            <el-table-column
                    prop="tripleRoom"
                    :label="orderConfig.thead.triple"
                    width="80">
            </el-table-column>
            <el-table-column
                    :label="orderConfig.thead.status">
                <template scope="scope">
                    <el-tag :type="{'0':'primary','1':'success'}[scope.row.status]"
                            v-text="{'0':'unconfirmed','1':'confirmed'}[scope.row.status]"></el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    :label="orderConfig.thead.options">
                <template scope="scope">
                    <el-button  v-if="scope.row.status === 0" size="mini" type="primary">{{orderConfig.option.confirm}}</el-button>
                    <el-popover
                            ref="popover5"
                            placement="bottom"
                            width="160"
                            v-model="visible2">
                        <p>{{orderConfig.reason}}</p>
                        <div style="text-align: right; margin: 0">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    v-model="textarea">
                            </el-input>
                            <el-button size="mini" type="text" @click="visible2 = false">{{orderConfig.option.chancel}}</el-button>
                            <el-button type="primary" size="mini" @click="visible2 = false">{{orderConfig.option.confirm}}</el-button>
                        </div>
                    </el-popover>

                    <el-button  v-if="scope.row.status === 0" size="mini" type="danger" v-popover:popover5>{{orderConfig.option.reject}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="sizes, prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<style lang="scss">
    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }

    .block {
        text-align: right;
        margin-top: 20px;
    }

    .status-change {
        float: right;
        margin-bottom: 10px;
    }
</style>
<script>
    import ContentTop from "../../../components/contentTop.vue"
    import { mapGetters, mapActions } from "vuex"
    import OrderLang from "../../../../assets/lang/hotel-seller.json"

    export default{
        data(){
            return {
                currentPage:1,
                status:[
                    {label:"All",value:-1},
                    {label:"Unconfirmed",value:0},
                    {label:"Confirmed",value:1},
                    {label:"Reject",value:2},
                    {label:"Done",value:3}
                ],
                statusValue:-1,
                tableData3: [{
                    orderId:"xxxxxx",
                    groupId:"xxxxxx",
                    date:"2016-05-02",
                    hotelName:"wtf hotel",
                    singleRoom:2,
                    doubleRoom:5,
                    tripleRoom:7,
                    status:0,
                }, {
                    orderId:"xxxxxx",
                    groupId:"xxxxxx",
                    date:"2016-05-02",
                    hotelName:"wtf hotel",
                    singleRoom:1,
                    doubleRoom:5,
                    tripleRoom:7,
                    status:1
                }]
            }
        },
        computed:{
            ...mapGetters({
                lang:"getLang"
            }),
            orderConfig(){
                return OrderLang.filter(config => config.lang === this.lang)[0]['order']
            }
        },
        methods:{
            handleSizeChange(val){
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            }
        },
        components:{
            ContentTop
        }
    }



</script>
