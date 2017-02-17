<template>
    <div>
        <content-top></content-top>
        <el-button type="text" @click="dialogFormVisible = true">添加账号</el-button>

        <el-dialog title="添加账号" v-model="dialogFormVisible">
            <el-form :model="addAccount">
                <el-form-item label="用户名" label-width="120px">
                    <el-input v-model="addAccount.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" label-width="120px">
                    <el-select v-model="addAccount.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
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
<style>

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
