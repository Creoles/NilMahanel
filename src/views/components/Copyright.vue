<template>
    <el-row class="copyright">
        <el-col :span="8" :offset="4">© YOULANKA 2015-2016</el-col>
        <el-col :span="12" style="text-align:right">
            <i style="font-weight:800;font-size:1rem" class="fa fa-code"></i>
            With <i style="color:red" class="fa fa-heart"></i> YOULANKA
        </el-col>
    </el-row>

</template>
<style lang="scss">
    .copyright {
        font-size: 0.6rem;
        padding: 20px;
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }


</script>
