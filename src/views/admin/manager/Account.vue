<template>
    <div>
        <content-top> <el-button class="addBtn" type="primary" @click="dialogFormVisible = true">添加账号</el-button></content-top>
        <el-dialog title="添加账号" v-model="dialogFormVisible">
            <el-form :model="addAccount">
                <el-form-item label="用户邮箱" label-width="120px">
                    <el-input v-model="addAccount.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人姓名" label-width="120px">
                    <el-input v-model="addAccount.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务地区" label-width="120px">
                    <el-select v-model="addAccount.region" placeholder="请选择服务区地区">
                        <el-option label="中国" value="china"></el-option>
                        <el-option label="斯里兰卡" value="srilanka"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属角色" label-width="120px">
                    <el-select v-model="addAccount.region" placeholder="请选择账号角色">
                        <el-option label="批发商" value="0"></el-option>
                        <el-option label="酒店" value="1"></el-option>
                        <el-option label="餐饮" value="2"></el-option>
                        <el-option label="购物" value="3"></el-option>
                        <el-option label="翻译" value="4"></el-option>
                        <el-option label="导游" value="5"></el-option>
                        <el-option label="领队" value="6"></el-option>
                        <el-option label="车辆" value="7"></el-option>
                        <el-option label="未分配" value="8"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="账户名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="真实姓名">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="真实姓名">
            </el-table-column>
            <el-table-column
                    prop="role"
                    label="身份">
            </el-table-column>
            <el-table-column
                    label="操作">
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="scss">
    .addBtn {
        float:right;
    }
</style>
<script>
    import ContentTop from "../../components/ContentTop.vue"
    export default{
        data(){
            return{
                dialogFormVisible:false,
                addAccount:{}

            }
        },
        components:{
            ContentTop
        }
    }
</script>
