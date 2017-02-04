<template>
    <div class="header">
        <div class="row">
            <div class="col-lg-2 col-md-2 col-5 logo">
                <div class="hidden-sm-down"><i class="fa fa-plane"></i>YouLanka</div>
                <div class="hidden-md-up"><i class="fa fa-align-left"></i>Menu</div>
            </div>
            <div class="col-lg-4 offset-lg-6 col-md-6 offset-md-4 col-5 offset-2 col-sm-4 offset-sm-3 top-bar">
                <div class="notification">
                    <i class="fa fa-bell"></i>
                    <span class="badge badge-danger">4</span>
                    <div class="notification-ring"></div>
                </div>

                <i class="fa fa-envelope"></i><span class="badge badge-danger">4</span>

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
                vertical-align: bottom;
                font-size: 0.1rem;
            }
        }
        .notification {
            position: relative;
            display: inline-block;
            .notification-ring {
                border: 1px solid red;
                border-radius: 100px;
                height: 40px;
                width: 40px;
                position: absolute;
                top: -18px;
                right: -27px;
                animation: pulsate 4s ease-out;
                animation-iteration-count: infinite;
                opacity: 0.0
            }
        }


    }
    @-webkit-keyframes pulsate {
        30% {
            -webkit-transform: scale(0.1, 0.1);
            opacity: 0.0;
        }
        35% {
            opacity: 1.0;
        }
        40% {
            -webkit-transform: scale(1.2, 1.2);
            opacity: 0.0;
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
