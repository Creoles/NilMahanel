<template>
    <div>
        <content-top></content-top>
        <el-form :model="params" label-position="top" label-width="100px" class="hotel-form">
            <el-form-item label="酒店名称">
                <el-input v-model="params.name"></el-input>
            </el-form-item>
            <el-form-item label="酒店区域" class="inline">
                <el-select v-model="params.region" class="hotel-region" placeholder="select">
                    <el-option label="1" value="shanghai"></el-option>
                    <el-option label="2" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="具体地址" class="inline hotel-address">
                <el-input v-model="params.address"></el-input>
            </el-form-item>
            <el-form-item label="星级" class="inline hotel-star" >
                <el-select v-model="params.star" placeholder="select">
                    <el-option label="一星级" value="1"></el-option>
                    <el-option label="二星级" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房间总数" class="inline hotel-total">
                <el-input v-model="params.total"></el-input>
            </el-form-item>
            <el-form-item class="inline" label="酒店图片">
                <el-upload class="hotel-upload"
                           action="//jsonplaceholder.typicode.com/posts/"
                           type="select"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :on-success="handleSuccess"
                           :on-error="handleError"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-dragger__text"><em>点击上传</em></div>
                    <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
            </el-form-item>
            <el-form-item label="酒店介绍">
                <el-input
                        type="textarea"
                        autosize
                        v-model="params.textarea">
                </el-input>
            </el-form-item>
            <el-form-item label="订房部联系人" class="inline">
                <el-input v-model="params.costPerson"></el-input>
            </el-form-item>
            <el-form-item label="订房部电话" class="inline cost-phone">
                <el-input placeholder="" v-model="params.costPhone">
                    <el-select style="width:85px" v-model="params.quhao" slot="prepend" placeholder="select">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item label="销售部联系人" class="inline">
                <el-input v-model="params.costPerson"></el-input>
            </el-form-item>
            <el-form-item label="销售部电话" class="inline cost-phone">
                <el-input placeholder="" v-model="params.costPhone">
                    <el-select style="width:85px" v-model="params.quhao" slot="prepend" placeholder="select">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <div class="room">
                <el-form-item label="单人间数量" class="inline hotel-single">
                <el-input v-model="params.single"></el-input>
            </el-form-item>
                <el-form-item label="单人间成本(USD)" class="inline hotel-single">
                    <el-input v-model="params.singleCost"></el-input>
                </el-form-item>
                <el-form-item label="单人间报价(USD)" class="inline hotel-single">
                    <el-input v-model="params.singleOffer"></el-input>
                </el-form-item>
                <el-form-item label="双人间数量" class="inline hotel-double">
                    <el-input v-model="params.double"></el-input>
                </el-form-item>
                <el-form-item label="双人间成本(USD)" class="inline hotel-double">
                    <el-input v-model="params.doubleCost"></el-input>
                </el-form-item>
                <el-form-item label="双人间报价(USD)" class="inline hotel-triple">
                    <el-input v-model="params.doubleOffer"></el-input>
                </el-form-item>
                <el-form-item label="三人间数量" class="inline hotel-double">
                    <el-input v-model="params.double"></el-input>
                </el-form-item>
                <el-form-item label="三人间成本(USD)" class="inline hotel-triple">
                    <el-input v-model="params.doubleCost"></el-input>
                </el-form-item>
                <el-form-item label="三人间报价(USD)" class="inline hotel-triple">
                    <el-input v-model="params.doubleOffer"></el-input>
                </el-form-item>

            </div>
            <el-form-item>
                <el-button type="primary" v-if="!submitting">提 交</el-button>
                <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
            </el-form-item>



        </el-form>
    </div>
</template>
<style lang="scss">
    .hotel-form {
        width: 500px;
    }
    .hotel-region {
        width: 100px;
    }
    .hotel-address {
        width: 394px;
    }
    .hotel-star {
        width: 100px;
    }
    .hotel-total {
        width: 200px;
    }
    .hotel-single {
        width: 150px;
    }
    .hotel-double {
        width: 150px;
    }
    .hotel-triple {
        width: 150px;
    }
    .cost-phone {
        width:325px;
    }
    .hotel-upload {
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
    .room {
        border: 3px solid #fff;
        padding: 5px;
        margin-bottom: 10px;
    }
    .inline {
        display: inline-block;
    }

</style>
<script>
    import ContentTop from "../../../components/ContentTop.vue"
    export default{
        data(){
            return{
                params:{
                    quhao:"0094"

                },
                submitting:false
            }
        },

        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file)
            }
        },
        components:{
            ContentTop
        }
    }
</script>
