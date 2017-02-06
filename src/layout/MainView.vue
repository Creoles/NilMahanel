<template>
    <div v-if="isAdminPath">
        <header-bar></header-bar>
        <el-row>
            <tool-bar></tool-bar>
            <el-col :span="20" :offset="4">
                <div class="main">
                    <transition mode="out-in" appear>
                        <router-view></router-view>
                    </transition>
                </div>
            </el-col>
        </el-row>
    </div>
    <div v-else>
        <transition mode="out-in" appear>
            <router-view></router-view>
        </transition>
    </div>
</template>
<style lang="scss">
    .main {
        padding: 1rem;
    }
</style>
<script>
    import HeaderBar from './HeaderBar.vue'
    import ToolBar from './ToolBar.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        computed:{
            isAdminPath(){
                return /admin/.test(this.$route.path)
            }
        },
        components:{
           HeaderBar,
           ToolBar
        }
    }




</script>
