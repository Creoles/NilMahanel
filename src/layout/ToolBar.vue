<template>
        <el-col :span="4" class="toolbar">
            <ul>
                <items  :model='model' v-for='model in menuConfig' :key="model.id"></items>
            </ul>
        </el-col>
</template>
<style lang="scss" scoped>
    @import "../assets/var/var.scss";
    .toolbar {
        position: fixed;
        bottom: 0;
        top: 67px;
        background-color: $secondaryColor;
        overflow-y: scroll;
        z-index: 9999;
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
