<template>
    <div class="header">
        <div class="row">
            <div class="col-lg-2 col-md-2 col-5 logo">
                <div class="hidden-sm-down">
                    <i class="fa fa-plane"></i>
                    <h1>YouLanka</h1>
                </div>
                <div class="hidden-md-up">
                    <i class="fa fa-align-left"></i>
                    Menu
                </div>
            </div>
            <div class="col-lg-4 offset-lg-6 col-md-6 offset-md-4 col-5 offset-2 col-sm-4 offset-sm-3 top-bar">
                <div class="notification">
                    <i class="fa fa-bell-o"></i>
                    <span class="notification-num">4</span>
                    <div class="notification-ring"></div>
                </div>
                <div class="message">
                    <i class="fa fa-envelope-o"></i>
                    <span class="notification-num">4</span>
                    <div class="notification-ring"></div>
                </div>
                <div class="avatar">
                    <i class="fa fa-user-circle-o"></i>
                </div>

            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .header {
        padding: 1rem;
        background-color: rgba(28,43,54,0.9);
        color: #fff;
        .logo {
            line-height:2rem;
            h1 {
                display: inline-block;
            }
            i {
                font-size: 1.3rem;
                vertical-align: text-top;
            }
        }
        .top-bar {
            text-align: right;
            .badge {
                vertical-align: bottom;
                font-size: 0.1rem;
            }
        }
        .notification {
            position: relative;
            display: inline-block;
            cursor: pointer;

            &:hover {
                .fa-bell-o {
                    color: #dc143c;
                }

            }

        }
        .notification-ring {
            border: 2px solid #dc143c;
            border-radius: 100px;
            height: 40px;
            width: 40px;
            position: absolute;
            top: -18px;
            right: -27px;
            animation: pulsate 3s ease-out;
            animation-iteration-count: infinite;
            opacity: 0.0
        }
        .notification-num {
            display: inline-block;
            min-width: 10px;
            padding: 2px 4px;
            color: #fff;
            vertical-align: baseline;
            white-space: nowrap;
            text-align: center;
            border-radius: 13px;
            line-height: 11px;
            background-color: #dc143c;
            position: absolute;
            top: -5px;
            right: -14px;
            font-size: 11px;
        }
        .message {
            position: relative;
            display: inline-block;
            margin-left: 1.5rem;
            cursor: pointer;
            &:hover {
                .fa-envelope-o {
                    color: #20b2aa;
                }
            }
            .notification-num {
                background-color: #20b2aa;
            }
            .notification-ring {
                border-color: #20b2aa;
            }
        }
        .avatar {
            display: inline-block;
            margin-left: 2rem;
            cursor: pointer;
            .fa-user-circle-o {
                font-size: 2rem;
                vertical-align: sub;
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
