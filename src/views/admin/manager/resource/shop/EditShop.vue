<template>
    <div>
        <content-top></content-top>
        <el-form :model="params" label-position="top" class="shop-form">
            <el-form-item label="商店名称">
                <el-input v-model="params.name"></el-input>
            </el-form-item>
            <el-form-item label="国家" class="inline select">
                <el-select v-model="params.region" class="restaurant-region" placeholder="select">
                    <el-option label="1" value="Srilanka"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="城市" class="inline select">
                <el-select v-model="params.region" class="restaurant-region" placeholder="select">
                    <el-option label="1" value="shanghai"></el-option>
                    <el-option label="2" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型" class="inline select">
                <el-select v-model="params.region" class="restaurant-region" placeholder="select">
                    <el-option label="1" value="中餐"></el-option>
                    <el-option label="2" value="西餐"></el-option>
                    <el-option label="3" value="特色"></el-option>
                    <el-option label="4" value="综合"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="联系人员" class="inline contact">
                <el-input v-model="params.people"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" class="inline contact">
                <el-input v-model="params.phone"></el-input>
            </el-form-item>
            <el-form-item label="餐厅介绍">
                <el-input
                        type="textarea"
                        autosize
                        v-model="params.textarea">
                </el-input>
            </el-form-item>
            <el-form-item class="inline" label="餐厅图片">
                <el-upload class="restaurant-upload"
                           action="//jsonplaceholder.typicode.com/posts/"
                           type="select"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :on-success="handleSuccess"
                           :on-error="handleError"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-dragger__text"><em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item label="就餐等级">

            </el-form-item>

            <el-form-item>
                <el-button type="primary" v-if="!submitting" @click="submit">提 交</el-button>
                <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    .shop-form {
        width: 500px;
        .inline {
            display: inline-block;
        }
    }
</style>
<script>
    import ContentTop from "../../../../components/ContentTop.vue"
    export default{
        data(){
            return{
                params:[]
            }
        },
        components:{
            ContentTop
        },
        created(){
            this.test();
        },
        methods:{
            test(){
                this.$http.get('http://baidu.com').then(res=>{
                    console.log(res);
                })
            }
        }
    }
</script>
