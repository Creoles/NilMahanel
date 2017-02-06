<template>
    <div v-if="isAdminPath">
        <header-bar></header-bar>
        <div class="row">
            <div class="header-box col-lg-2 col-md-2 col-4">
                <tool-bar></tool-bar>
            </div>
            <transition mode="out-in" appear>
                <div class="main col-lg-10 col-md-10 col-8">
                    <router-view ></router-view>
                </div>
            </transition>
        </div>
    </div>
    <div v-else>
        <transition mode="out-in" appear>
            <router-view></router-view>
        </transition>
    </div>
</template>
<style lang="scss">
    .header-box {
        padding-left: 0;
    }
    .row{
        margin-left:0;
        margin-right:0;
    }
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
