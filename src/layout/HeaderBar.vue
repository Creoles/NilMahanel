<template>
    <div class="header">
        <div class="row">
            <div class="col-lg-2 col-md-2 col-5 logo">
                <div class="hidden-sm-down"><i class="fa fa-plane"></i>Srilanka</div>
                <div class="hidden-md-up"><i class="fa fa-align-left"></i>Menu</div>
            </div>
            <div class="col-lg-4 offset-lg-6 col-md-6 offset-md-4 col-5 offset-2 col-sm-4 offset-sm-3 top-bar">
                <i class="fa fa-bell"></i><span class="badge badge-danger">4</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .header {
        padding:1.5rem;
        background-color:#1C2B36;
        color:#fff;
        .logo i {
            font-size:1.3rem;
            vertical-align: bottom;
            margin-right: 0.5rem;
        }
        .top-bar {
            text-align: center;
            .badge {
                vertical-align: top;
                font-size: 0.2rem;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }

</script>
