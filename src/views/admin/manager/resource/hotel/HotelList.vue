<template>
    <div>
        <content-top></content-top>
        <el-table
                :data="tableData3"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="酒店名称"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="star"
                    label="星级"
                    width="50">
            </el-table-column>
            <el-table-column label="酒店基本信息">
                <el-table-column label="地址">
                    <el-table-column
                            prop="city"
                            label="区域"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址"
                            width="150">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="联系方式">
                    <el-table-column
                            prop="lianxiren1"
                            label="订房部联系人"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="lianxiren1Phone"
                            label="订房部电话"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="lianxiren2"
                            label="销售部联系人"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="lianxiren2Phone"
                            label="销售部电话"
                            width="100">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="房间信息">

                </el-table-column>
            </el-table-column>
            <el-table-column label="操作">

            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="scss">
    .el-table div.cell {
        padding-left:0;
        padding-right:0;
        text-align:center;
    }
</style>
<script>
    import ContentTop from "../../../../components/ContentTop.vue"
    export default{
        data(){
            return{
                tableData3:[]
            }
        },

        methods: {

        },
        components:{
            ContentTop
        }
    }
</script>
