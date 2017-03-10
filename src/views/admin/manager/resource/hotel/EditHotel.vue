<template>
    <div class="edit-hotel">
        <content-top></content-top>
        <!--<el-steps :space="300" center="true" :active="1" align-center="true">
            <el-step title="基础信息"></el-step>
            <el-step title="费率"></el-step>
            <el-step title="介绍&图片"></el-step>
        </el-steps>-->
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
            <el-form-item label="星级" class="inline hotel-star">
                <hotel-star v-on:star-change="onStarChange($event)"></hotel-star>
            </el-form-item>
            <el-form-item label="具体地址" class="hotel-address">
                <el-input v-model="params.address"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="酒店网址" class="hotel-site">
                <el-input v-model="params.costPerson"></el-input>
            </el-form-item>
            <el-form-item label="预定邮箱" class="inline">
                <el-input v-model="params.costPerson"></el-input>
            </el-form-item>
            <el-form-item label="预定电话" class="inline">
                <el-input v-model="params.costPerson"></el-input>
            </el-form-item>
            <hr>
            <div class="hotel-people">
                <h5>联系人员<el-button class="add-people" type="primary" size="mini" @click="addPeople">添加记录</el-button></h5>
                <div v-for="item in params.people">
                    <el-form-item label="职位" class="inline-people">
                        <el-input v-model="item.zhiwei"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" class="inline-people">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="办公电话" class="inline-people">
                        <el-input v-model="item.phone1"></el-input>
                    </el-form-item>
                    <el-form-item label="个人手机" class="inline-people">
                        <el-input v-model="item.phone2"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件地址" class="inline-people">
                        <el-input v-model="item.email"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" class="inline-people">
                        <el-input v-model="item.beizhu"></el-input>
                    </el-form-item>
                    <el-form-item class="inline">
                        <el-button type="warning" @click="removePeople($index)">删除</el-button>
                    </el-form-item>
                </div>
            </div>
            <hr>
            <div class="hotel-bank">
                <h5>银行信息<el-button class="add-bank" type="primary" size="mini" @click="addBank">添加记录</el-button></h5>
                <div v-for="bank in params.bank">
                    <el-form-item label="币种" class="inline-bank">
                        <el-select v-model="bank.type" placeholder="select">
                            <el-option label="USD/美元" value="1"></el-option>
                            <el-option label="LKR/斯里兰卡卢布" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="银行名称" class="inline-bank">
                        <el-input v-model="bank.bankName"></el-input>
                    </el-form-item>
                    <el-form-item label="开户支行" class="inline-bank">
                        <el-input v-model="bank.zhihang"></el-input>
                    </el-form-item>
                    <el-form-item label="收款人名称" class="inline-bank">
                        <el-input v-model="bank.name"></el-input>
                    </el-form-item>
                    <el-form-item label="收款人账号" class="inline-bank">
                        <el-input v-model="bank.account"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" class="inline-bank">
                        <el-input v-model="bank.beizhu"></el-input>
                    </el-form-item>
                    <el-form-item class="inline">
                        <el-button type="warning" @click="removeBank($index)">删除</el-button>
                    </el-form-item>
                </div>
            </div>
            <el-form-item>
                <el-button type="primary" v-if="!submitting">提 交</el-button>
                <el-button type="primary" v-if="submitting" :loading="submitting">正在提交...</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="scss">
    .edit-hotel {
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
        .hotel-people,.hotel-bank {
            h5 {
                margin-bottom:8px;
                .add-people,.add-bank{
                    margin-left:5px;
                }
            }
            
        }

        .inline {
            display: inline-block;
        }
        .inline-people {
            display: inline-block;
            width:150px;
        }
        .inline-bank {
            display:inline-block;
            width:150px;
        }
        .hotel-address {
            display:inline-block;
            width:400px;
        }
        .hotel-site  {
            display:inline-block;
            width:300px;
        }
    }

</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    import HotelStar from 'src/views/components/HotelStar.vue'
    export default{
        data(){
            return{
                star:{
                    value1:1,
                    value2:2,
                    value3:3,
                    value4:4,
                    value5:5
                },
                params:{
                    quhao:"0094",
                    star:'',
                    people:[
                        {zhiwei:'',name:'',phone1:'',phone2:'',email:'',beizhu:''}
                    ],
                    bank:[
                        {type:'',bankName:'',zhihang:'',name:'',account:'',beizhu:''}
                    ]
                },
                submitting:false
            }
        },
        methods: {
            onStarChange(msg){
                this.params.star = msg;
            },
            addPeople(){
                this.params.people.push({zhiwei:'',name:'',phone1:'',phone2:'',email:'',beizhu:''})
            },
            removePeople(index){
                this.params.people.splice(index,1);
            },
            addBank(){
                this.params.bank.push({type:'',bankName:'',zhihang:'',name:'',account:'',beizhu:''});
            },
            removeBank(index){
                this.params.bank.splice(index,1)
            }
        },
        components:{
            ContentTop,
            HotelStar
        }
    }
</script>
