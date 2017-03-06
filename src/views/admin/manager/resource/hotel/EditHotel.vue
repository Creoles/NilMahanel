<template>
    <div>
        <content-top></content-top>
        <el-steps :space="300" center="true" :active="1" align-center="true">
            <el-step title="基础信息"></el-step>
            <el-step title="费率"></el-step>
            <el-step title="介绍&图片"></el-step>
        </el-steps>
        <el-row>
            <el-col :span="11" style="padding-right:30px;">
                中文
                <el-form label-position="right" label-width="100px" style="margin-top:10px;">
                    <el-form-item label="所属集团" >
                        <el-input v-model="params.name"></el-input>
                    </el-form-item> 
                    <el-form-item label="名称">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                    <el-form-item label="简称">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                    <el-form-item label="特色">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                English
                <el-form label-position="right" label-width="90px" style="margin-top:10px;">
                    <el-form-item label="所属集团">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item> 
                    <el-form-item label="名称">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                    <el-form-item label="简称">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                    <el-form-item label="特色">
                        <el-input v-model="params.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <hr>
        <el-form :model="params" label-position="top" label-width="100px" class="hotel-form">
            <el-form-item label="具体地址" class="inline hotel-address">
                <el-input v-model="params.address"></el-input>
            </el-form-item>
            <el-form-item label="星级" class="inline hotel-star">
                <el-select v-model="params.star" placeholder="select">
                    <el-option label="1 star" value="1"></el-option>
                    <el-option label="2 star" value="2"></el-option>
                     <el-option label="3 star" value="3"></el-option>
                     <el-option label="4 star" value="4"></el-option>
                     <el-option label="5 star" value="5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店网址" class="inline">
                <el-input v-model="params.costPerson"></el-input>
            </el-form-item>
            <el-form-item label="预定邮箱">
                <el-input v-model="params.costPerson"></el-input>
            </el-form-item>
            <el-form-item label="预定电话">
                <el-input v-model="params.costPerson"></el-input>
            </el-form-item>
            <div class="hotel-people">
                联系人员
                <div>
                    <el-form-item label="职位" class="inline-people">
                        <el-input v-model="params.costPerson"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" class="inline-people">
                        <el-input v-model="params.costPerson"></el-input>
                    </el-form-item>
                    <el-form-item label="办公电话" class="inline-people">
                        <el-input v-model="params.costPerson"></el-input>
                    </el-form-item>
                    <el-form-item label="个人手机" class="inline-people">
                        <el-input v-model="params.costPerson"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件地址" class="inline-people">
                        <el-input v-model="params.costPerson"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" class="inline-people">
                        <el-input v-model="params.costPerson"></el-input>
                    </el-form-item>
                </div>
            </div>
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
            <el-form-item label="是否有儿童优惠">
                <el-switch class="inline"
                        v-model="params.child"
                        on-text="Yes"
                        off-text="No">
                </el-switch>
                <el-form-item class="inline" v-if="params.child">
                    <el-input v-model="params.doubleOffer" placeholder="优惠比例"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-if="!submitting">提 交</el-button>
                <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    
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
    .inline-people {
        display: inline-block;
        width:150px;
    }

</style>
<script>
    import ContentTop from "../../../../components/ContentTop.vue"
    export default{
        data(){
            return{
                params:{
                    quhao:"0094",
                    child:false,
                    cent:''

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
