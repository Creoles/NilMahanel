<template>
    <div>
        <content-top>
            <el-button class="add-btn" type="primary" icon="el-icon-plus" @click="addVehicle">
                添加车辆
            </el-button>
        </content-top>

        <el-table
                :data="vehicleList"
                style="width: 100%">
            <el-table-column
                    prop="company"
                    label="公司"
                    width="180">
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
                vehicleList:[]
            }
        },
        methods:{
            addVehicle(){
                this.$router.push({name:"ADD VEHICLE"})
            }
        },
        components:{
            ContentTop
        }
    }
</script>
