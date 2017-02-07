<template>
        <el-col :span="4" class="toolbar">
            <ul>
                <items  :model='model' v-for='model in menuConfig'></items>
            </ul>
        </el-col>
</template>
<style lang="scss" scoped>
    @import "../assets/var/var.scss";
    .toolbar {
        position: fixed;
        height: 100%;
        background-color: $secondaryColor;
        ul {
            font-size: 0.8rem;
            margin-right: 0;
            color: #fff;
        }

    }

</style>
<script>
    import ToolBar from "./ToolBar.vue"
    import MenuList from "../assets/lang/menu.json"
    import { mapGetters, mapActions } from 'vuex'
    import Items from "./menuList.vue"
    export default{
        data(){
            return{

            }
        },
        computed: {
            ...mapGetters({
               lang:"getLang"
            }),
            menuConfig(){
                return MenuList.filter(config => config.lang === this.lang)[0]['menu']
            }
        },
        methods:{

        },
        components:{
            Items
        }

    }


</script>
