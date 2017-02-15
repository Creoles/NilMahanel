<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<style lang="scss">

</style>
<script>
    import ContentTop from "../../../../components/ContentTop.vue"
    export default{
        data(){
            return{
                params:{
                    quhao:"0094"

                },
                submitting:false
            }
        },

        methods: {

        },
        components:{
            ContentTop
        }
    }
</script>
