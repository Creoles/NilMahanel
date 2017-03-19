<template>
    <div>
        <content-top></content-top>
        <el-form :model="params" :rules="rule" label-position="top" class="shop-form" ref="shopForm">
            <el-form-item label="国家及城市">
                <country-select v-on:country-change="onCountryChange($event)" :country="countryArr"></country-select>
            </el-form-item>
            <el-form-item label="所属集团" class="inline select">
                <el-select placeholder="select" v-model="params.belong"></el-select>
            </el-form-item>
            <el-form-item label="类型" class="inline select" prop="type">
                <el-select v-model="params.shop_type" class="restaurant-region" placeholder="select">
                    <el-option label="中餐" value="1"></el-option>
                    <el-option label="西餐" value="2"></el-option>
                    <el-option label="特色" value="3"></el-option>
                    <el-option label="综合" value="4"></el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="中文店名" prop="name" class="inline-input">
                <el-input v-model="params.name"></el-input>
            </el-form-item>
            <el-form-item label="英文店名" prop="name" class="inline-input">
                <el-input v-model="params.name_en"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="商店地址" prop="address" class="inline-input">
                <el-input v-model="params.address"></el-input>
            </el-form-item>
            <el-form-item label="联系人员" class="inline contact" prop="people">
                <el-input v-model="params.contcat"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" class="inline contact" prop="phone">
                <el-input v-model="params.telephone"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="中文介绍" class="inline-input">
                <el-input
                        type="textarea"
                        :rows="4"
                        v-model="params.intro_cn">
                </el-input>
            </el-form-item>
            <el-form-item label="英文介绍" class="inline-input">
                <el-input
                        type="textarea"
                        :rows="4"
                        v-model="params.intro_en">
                </el-input>
            </el-form-item>
            <br>
            <!--<el-form-item class="inline" label="商店图片">-->
                <!--<el-upload class="restaurant-upload"-->
                           <!--action="//jsonplaceholder.typicode.com/posts/"-->
                           <!--type="select"-->
                           <!--:on-preview="handlePreview"-->
                           <!--:on-remove="handleRemove"-->
                           <!--:on-success="handleSuccess"-->
                           <!--:on-error="handleError"-->
                <!--&gt;-->
                    <!--<i class="el-icon-upload"></i>-->
                    <!--<div class="el-dragger__text"><em>点击上传</em></div>-->
                <!--</el-upload>-->
            <!--</el-form-item>-->
            <el-form-item class="inline" label="人头费" prop="rentou">
                <el-input v-model="params.fee_person"></el-input>
            </el-form-item>
            <el-form-item class="inline" label="返佣比例(%)" prop="bili">
                <el-input v-model="params.commission_ratio"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-if="!submitting" @click="submit('shopForm')">提 交</el-button>
                <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    .shop-form {
        .inline {
            display: inline-block;
        }
        .inline-input {
            display:inline-block;
            width:500px;
        }
    }
</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    import editRule from "src/assets/valid/editShop.json"
    import  ValidPrice from 'src/util/priceValid.js'
    import CountrySelect from 'src/views/components/CountrySelect.vue'
    export default{
        data(){
            return{
                params:{
                    name:null,
                    name_en:null,
                    address:null,
                    telephone:null,
                    country_id:null,
                    city_id:null,
                    belong:null,
                    shop_type:null,
                    contcat:null,
                    fee_person:null,
                    commission_ratio:null,
                    intro_cn:null,
                    intro_en:null
                },
                rule:editRule,
                submitting:false,
                countryArr:[],
                isEdit:false
            }

        },
        components:{
            ContentTop,
            CountrySelect
        },
        created(){
            this.rule.rentou.push({ validator: ValidPrice, trigger: 'blur' });
            this.rule.bili.push({ validator: ValidPrice, trigger: 'blur' });
            if (this.$route.params.id){
                let id = this.$route.params.id;
                this.isEdit = true;
                this.loadShopById(id).then(res=>{
                    this.params = this.res.data;
                    
                    this.countryArr.push(this.params.country_id,this.params.city_id);
                },err=>{
                    console.log(err);
                })
            }
            this.countryArr.push(this.params.country_id,this.params.city_id);
        },
        methods:{
            submit(formName){
                
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         this.submitting = true;
                        // this.$http.post('/shop/create_shop',this.params).then()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            loadShopById(id){
                return  this.$http.get('/shop/'+id)

            },
            onCountryChange(msg){
                this.params.country_id = msg[0];
                this.params.city_id = msg[1];
            }
        }
    }
</script>
