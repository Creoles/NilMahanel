<template>
    <div>
        <div class="clearfix"><h1 class="content-title">{{contentTitle}}</h1>
            <slot></slot>
        </div>
        <hr>
    </div>
</template>
<style lang="scss">
    @import "../../assets/var/var";
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}

    h1 {
        &.content-title {
            font-weight: 400;
            color: $primaryColor;
            font-size: 24px;
            opacity: 0.9;
            padding: 10px 0;
            float:left;
        }
    }

    hr {
        height: 2px;
        border: none;
        border-top: 2px solid #555555;
        margin-bottom: 10px;

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
