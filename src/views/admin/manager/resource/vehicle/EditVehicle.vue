<template>
    <div>
        <content-top></content-top>
        <el-form :model="params" label-position="top" class="vehicle-form">
            <el-form-item label="公司名称">
                <el-input v-model="params.name"></el-input>
            </el-form-item>
            <el-form-item label="车辆型号">
                <el-input v-model="params.xinghao"></el-input>
            </el-form-item>
            <el-form-item label="车牌号">
                <el-input v-model="params.carId"></el-input>
            </el-form-item>
            <el-form-item label="座位数">
                <el-input v-model="params.zuoweishu"></el-input>
            </el-form-item>
            <el-form-item label="年限">
                <el-input v-model="params.year"></el-input>
            </el-form-item>
            <el-form-item label="保险号">
                <el-input v-model="params.year"></el-input>
            </el-form-item>
            <el-form-item label="旅游局登记号">
                <el-input v-model="params.year"></el-input>
            </el-form-item>
            <el-form-item label="预定电话">
                <el-input v-model="params.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-if="!submitting">提 交</el-button>
                <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    .vehicle-form {
        width:500px;
    }
</style>
<script>
    import ContentTop from "../../../../components/ContentTop.vue"
    export default{
        data(){
            return{
                params:{

                }

            }
        },
        components:{
            ContentTop
        }
    }
</script>
