<template>
    <div>
        <el-table
                :data="list"
                border
                style="width: 100%"
                class="list-table">
            <el-table-column
                    fixed
                    prop="date"
                    label="出发日期"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="groupId"
                    label="团号"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="city"
                    label="城市"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="flight"
                    label="航班"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="hotel"
                    label="酒店"
                    width="50">
                <template scope="props">
                    <el-popover
                            ref="popover4"
                            placement="bottom"
                            width="400"
                            trigger="click">
                        <el-table :data="props.row.hotel">
                            <el-table-column width="80" property="night" label="晚"></el-table-column>
                            <el-table-column width="240" property="name" label="酒店名称"></el-table-column>
                            <el-table-column width="80" property="status" label="状态"></el-table-column>
                        </el-table>
                    </el-popover>


                    <i v-popover:popover4 class="fa fa-search-plus"></i>
                </template>

            </el-table-column>
            <el-table-column
                    prop="car"
                    label="车辆"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="cater"
                    label="餐饮"
                    width="20">
            </el-table-column>
            <el-table-column
                    prop="shop"
                    label="购物"
                    width="20">
            </el-table-column>
            <el-table-column
                    prop="guide"
                    label="导游"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="translator"
                    label="翻译"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="lead"
                    label="领队"
                    width="100">
            </el-table-column>
        </el-table>
    </div>

</template>
<style lang="scss">
    .list-table.el-table .cell {
        padding: 0;
        text-align: center;
    }
</style>
<script>
    export default{
        data(){
            return{
                list:[
                    {
                        date:"2017-10-10",
                        groupId:"xxxxxx",
                        city:"shanghai",
                        flight:"cz0080",
                        hotel:[
                            {name:"123213",night:"D1",status:1}

                        ],
                        car:{}
                    }
                ]
            }
        },
        computed:{

        },
        components:{

        }
    }
</script>
