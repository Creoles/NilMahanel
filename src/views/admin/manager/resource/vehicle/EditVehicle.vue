<template>
    <div>
        <content-top></content-top>
        <el-form :model="params" :inline="true" :rules="rule" label-position="top" class="vehicle-form">
            <el-form-item label="国家" prop="country">
                <el-select v-model="params.region" placeholder="Select">
                    <el-option label="Srilanka" value="1"></el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="公司名称"  prop="name">
                <el-input v-model="params.name"></el-input>
            </el-form-item>
            <el-form-item label="英文名称" prop="name_en">
                <el-input v-model="params.name_en"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="车辆型号" prop="model" class="width-class">
                <el-input v-model="params.xinghao"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" prop="ID" class="width-class">
                <el-input v-model="params.carId"></el-input>
            </el-form-item>
            <el-form-item label="座位数" prop="set" class="width-class">
                <el-input v-model="params.zuoweishu"></el-input>
            </el-form-item>
            <el-form-item label="年限" prop="year" class="width-class">
                <el-input v-model="params.year"></el-input>
            </el-form-item>
            <el-form-item label="保险号" prop="baoxian" class="width-class">
                <el-input v-model="params.year"></el-input>
            </el-form-item>
            <el-form-item label="旅游局登记号" prop="dengji" class="width-class">
                <el-input v-model="params.year"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="people" class="width-class">
                <el-input v-model="params.people"></el-input>
            </el-form-item>
            <el-form-item label="预定电话" prop="phone" class="width-class">
                <el-input v-model="params.phone"></el-input>
            </el-form-item>
            <el-form-item label="价格/每公里(USD)" class="width-class" prop="price">
                <el-input v-model="params.price"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" v-if="!submitting">提 交</el-button>
        <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
    </div>
</template>
<style lang="scss">
    .vehicle-form {
        width:725px;
        .width-class {
            width:192px;
        }
    }
</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    import editRule from "src/assets/valid/editVehicle.json"
    //验证价格信息
    import priceValid from 'src/util/priceValid.js'
    export default{
        data(){
            return{
                params:{

                },
                rule:editRule

            }
        },
        created(){
            //验证价格信息
            this.rule.price.push({ validator: priceValid, trigger: 'blur' });
        },
        components:{
            ContentTop
        }
    }
</script>
