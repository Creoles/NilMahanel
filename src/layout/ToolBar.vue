<template>
    <div class="toolbar">
        <ul>
            <li>Aaaaaa</li>
            <li>Bvbbbbb</li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
    @import "../assets/var/var.scss";
    .toolbar {
        position: fixed;
        height: 100%;
        background-color: $secondaryColor;
    }

</style>
<script>
    import ToolBar from "./ToolBar.vue"
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
