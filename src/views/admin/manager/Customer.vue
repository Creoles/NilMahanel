<template>
    <div>
        <content-top></content-top>

    </div>
</template>
<style lang="scss">

</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'other-component':OtherComponent,
            HeaderComponent,
        }
    }
</script>
