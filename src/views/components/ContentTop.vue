<template>
    <div>
        <h1 class="content-title">{{contentTitle}}</h1>
    </div>
</template>
<style lang="scss">
    @import "../../assets/var/var";
    h1 {
        &.content-title {
            font-weight: 400;
            color: $primaryColor;
            font-size: 24px;
            opacity: 0.9;
            padding: 10px 0;
        }
    }

</style>
<script>
    export default{
        data(){
            return{
                contentTitle:this.$route.name
            }
        },
        components:{

        }
    }


</script>
