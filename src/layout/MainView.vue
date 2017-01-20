<template>
    <div v-if="isAdminPath">
        <header-bar></header-bar>
        <tool-bar class="col-lg-2 col-md-2">asdas</tool-bar>
        <transition mode="out-in" appear>
            <router-view class="col-lg-10 col-md-10"></router-view>
        </transition>
    </div>
    <div v-else>
        <transition mode="out-in" appear>
            <router-view></router-view>
        </transition>
    </div>
</template>
<style lang="scss">


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
