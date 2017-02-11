<template>
    <div>
        <content-top></content-top>
        <div class="month-block">
            <el-date-picker
                    v-model="month"
                    type="month"
                    placeholder="选择月">
            </el-date-picker>
        </div>
        <el-table
                :data="roomList"
                style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="Date"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="Name"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="Address">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                    label="酒店名称"
                    prop="hotelName">
            </el-table-column>
            <el-table-column
                    label="位置"
                    prop="location">
            </el-table-column>
            <el-table-column
                    label="切房总数"
                    prop="cutNum">
            </el-table-column>
            <el-table-column
                    label="已使用"
                    prop="used">
            </el-table-column>
            <el-table-column
                    label="剩余房量"
                    prop="surplus">
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="scss">
    .month-block {
        text-align: right;
    }
</style>
<script>
    import ContentTop from "../../components/ContentTop.vue"
    export default{
        data(){
            return{
                month:'',
                roomList:[

                ]

            }
        },
        components:{
            ContentTop
        }
    }
</script>
