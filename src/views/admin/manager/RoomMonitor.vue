<template>
    <div>
        <content-top></content-top>
        <el-date-picker
                v-model="month"
                type="month"
                placeholder="选择月">
        </el-date-picker>
    </div>
</template>
<style>

</style>
<script>
    import ContentTop from "../../components/ContentTop.vue"
    export default{
        data(){
            return{
                month:''
            }
        },
        components:{
            ContentTop
        }
    }
</script>
