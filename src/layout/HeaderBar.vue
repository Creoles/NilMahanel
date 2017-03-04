<template>
    <div class="header">
        <el-row>
            <el-col :span="6" class="logo">
                <div class="hidden-sm-down">
                    <i class="fa fa-plane"></i>
                    <h1>YouLanka</h1>
                </div>
            </el-col>
            <el-col :span="18" class="top-bar">
                <div class="language">
                    <div class="current-lang">
                        <span class="lang" @click="changeLang('zh-CN')" :class="lang ==='zh-CN'?'lang-active':''">中文</span>
                        <span>/</span>
                        <span class="lang" @click="changeLang('en-US')" :class="lang ==='en-US'?'lang-active':''">EN</span>
                    </div>
                </div>
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
                <div class="avatar hidden-sm-down">
                    <i class="fa fa-user-circle-o"></i>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
    .header {
        padding: 1rem;
        position: fixed;
        left: 0;
        right: 0;
        z-index: 9999;
        background-color: rgba(28, 43, 54, 0.9);
        color: #fff;
        box-shadow:0 1px 2px #333;
        .logo {
            line-height: 2rem;
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
            line-height: 2rem;
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
        .language {
            display: inline-block;
            position: relative;
            margin-right: 1rem;
            .current-lang {
                display: inline-block;
                color: #c6c6c6;

                .lang {
                    font-size: 0.8rem;
                    cursor: pointer;
                }
                .lang-active {
                    font-size: 1rem;
                    color: #fff;
                }
            }
            .lang-list {
                width: 100px;
                position: absolute;
                top: 47px;
                left: -40px;
                z-index: 9999;
                border-radius: 5%;
                background-color: #2C3E50;
                li {
                    padding: 0.4rem;
                    cursor: pointer;
                    &:hover {
                        background-color: #1C2B36;
                    }
                }
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
    import { mapGetters, mapActions } from 'vuex'
    export default{
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters({
               lang:"getLang"
            })
        },
        created(){
            daovoice('init', {
                app_id: "6947d5af"
            });
            daovoice('update');
            RongIMClient.init("8w7jv4qb8yr2y");
            this.setStatusListener();
            this.setMessageListener();
            this.connectServer();
        },
        methods:{
            changeLang(lang){
                if (lang === 'zh-CN'){
                     this.$locale.change('zh-cn')
                }else {
                     this.$locale.change('en')
                }
                this.$store.dispatch('changeLang',lang)
            },
            setStatusListener(){
                RongIMClient.setConnectionStatusListener({
                onChanged: function (status) {
                    switch (status) {
                        //链接成功
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            console.log('链接成功');
                            break;
                        //正在链接
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log('正在链接');
                            break;
                        //重新链接
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log('断开连接');
                            break;
                        //其他设备登录
                        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log('其他设备登录');
                            break;
                        //网络不可用
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                        }
                }});
            },
            setMessageListener(){
                // 消息监听器
                let me = this;
                RongIMClient.setOnReceiveMessageListener({
                    // 接收到的消息
                    onReceived: function (message) {
                        // 判断消息类型
                        switch(message.messageType){
                            case RongIMClient.MessageType.TextMessage:
                                // 发送的消息内容将会被打印
                                console.log(message.content.content);
                                me.$notify.info({
                                  title: '提示',
                                  message: message.content.content,
                                  duration: 0,
                                  offset: 75
                                });
                                break;
                            case RongIMClient.MessageType.VoiceMessage:
                                // 对声音进行预加载                
                                // message.content.content 格式为 AMR 格式的 base64 码
                                RongIMLib.RongIMVoice.preLoaded(message.content.content);
                                break;
                            case RongIMClient.MessageType.ImageMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.DiscussionNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.LocationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.RichContentMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.DiscussionNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.InformationNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.ContactNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.ProfileNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.CommandNotificationMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.CommandMessage:
                                // do something...
                                break;
                            case RongIMClient.MessageType.UnknownMessage:
                                // do something...
                                break;
                            default:
                                // 自定义消息
                                // do something...
                        }
                    }
                });
            },
            connectServer(){
              var token = "35iYv8r9uY5xPk/sWqFWrx++rswRdsk7Z5Q0ViFDYr+HatvLiWlb/rI1OoOzMXNaFg+BShb0QHAneZp81/GNsg==";
              RongIMClient.connect(token, {
                onSuccess: function(userId) {
                  console.log("Login successfully." + userId);
                },
                onTokenIncorrect: function() {
                  console.log('token无效');
                },
                onError:function(errorCode){
                      var info = '';
                      switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                          info = '超时';
                          break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                          info = '未知错误';
                          break;
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                          info = '不可接受的协议版本';
                          break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                          info = 'appkey不正确';
                          break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                          info = '服务器不可用';
                          break;
                      }
                      console.log(errorCode);
                    }
              });
            }

        },
        components:{

        }
    }



</script>
