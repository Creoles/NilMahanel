<template>
    <div v-if="isAdminPath">
        <header-bar></header-bar>
        <el-row>
            <tool-bar></tool-bar>
            <el-col :span="20" :offset="4">
                <div class="main">
                    <transition mode="out-in" 
                                enter-active-class="fadeIn"
                                leave-active-class="fadeOut"
                                appear>
                        <router-view class="animated"></router-view>
                    </transition>
                </div>
            </el-col>
        </el-row>
    </div>
    <div v-else>
        <transition mode="out-in" 
                    enter-active-class="fadeIn"
                    leave-active-class="fadeOut"
                    appear>
            <router-view class="animated"></router-view>
        </transition>
    </div>
</template>
<style lang="scss">
    .main {
        padding: 1rem;
        min-height: 100%;
        margin-top: 67px;
    }
    //全局
    .animated {
        animation-duration: .377s;
    }
</style>
<script>
    import HeaderBar from './HeaderBar.vue'
    import ToolBar from './ToolBar.vue'
    export default {
        data() {
            return {
                msg: 'hello vue'
            }
        },
        computed: {
            isAdminPath() {
                return /admin/.test(this.$route.path)
            }
        },
        components: {
            HeaderBar,
            ToolBar
        }
    }
</script>