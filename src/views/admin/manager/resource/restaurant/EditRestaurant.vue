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
                <el-button :disabled="!(params.price.length<3)" @click.prevent="addType()">增加一种</el-button>
                <div  v-for="item in params.price" style="width:590px">
                    <el-form-item class="inline" :label="等级">
                        <el-select v-model="item.type" class="price" placeholder="select">
                            <el-option label="标准餐"  value="1"></el-option>
                            <el-option label="升级餐"  value="2"></el-option>
                            <el-option label="豪华餐"  value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="inline price" label="成人报价(USD)">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                    <el-form-item class="inline price" label="成人成本(USD)">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                    <el-form-item class="inline price" label="儿童报价(USD)">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                    <el-form-item class="inline price" label="儿童成本(USD)">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                    <el-button @click.prevent="removeType(item)">删除</el-button>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" v-if="!submitting" @click="submit">提 交</el-button>
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
        .price {
            width: 100px;
        }
    }

</style>
<script>
    import ContentTop from "../../../../components/ContentTop.vue"
    export default{
        data(){
            return{
                params:{
                    price:[]

                },
                submitting:false

            }
        },
        computed:{

        },
        methods:{
            addType(){
                if (this.params.price.length<3){
                    this.params.price.push({type:''})
                }
            },
            removeType(item){
                var index = this.params.price.indexOf(item);
                if (index !== -1) {
                  this.params.price.splice(index, 1)
                }
            },
            submit(){
                console.log(this.params);
            }
        },
        components:{
            ContentTop
        }
    }
</script>
