<template>
    <div>
        <content-top></content-top>
        <el-form :model="params" label-position="top" class="restaurant-form">
            <el-form-item label="酒店名称">
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
                </el-select>
            </el-form-item>
            <el-form-item label="联系人员" class="inline contact">
                <el-input v-model="params.people"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" class="inline contact">
                <el-input v-model="params.phone"></el-input>
            </el-form-item>
            <el-form-item label="酒店介绍">
                <el-input
                        type="textarea"
                        autosize
                        v-model="params.textarea">
                </el-input>
            </el-form-item>
            <el-form-item class="inline" label="酒店图片">
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
            <el-form-item>
                <el-button type="primary" v-if="!submitting">提 交</el-button>
                <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    .restaurant-form {
        width:500px;
        .inline {
            display: inline-block;
        }
        .select {
            width:163px;
        }
        .contact {
            width:247px;
        }
        .restaurant-upload {
            width: 250px;
            text-align: center;
            cursor: pointer;
            border: 2px solid #fff;
            padding-top: 8px;
            .el-icon-upload {
                font-size: 40px;
                color: #ccc;
            }
        }
    }

</style>
<script>
    import ContentTop from "../../../../components/ContentTop.vue"
    export default{
        data(){
            return{
                params:{

                },
                submitting:false

            }
        },
        components:{
            ContentTop
        }
    }
</script>
