<template>
    <div>
        <div class="overlay">
        </div>
        <div class="leftcontent">
            <span class="ltitle">Access More</span>
            <br>
            <span class="lcontent">
            With Citus, you can unleash your desktop, and let the powers of desktop widgets come to life! Even though Citus is free, we still need to store user-specific information, like which widgets you have installed, and where they are positioned. By logging in, we can save that information to your account, and allow you to have a better experience overall.<br><br>Just login on the right to access your dashboard where you can add, edit, and remove widgets!
        </span>
        </div>
        <div class="sidebar">
            <span class="rtitle">{{langConfig['login'].login}}</span>
            <br>
            <br>
            <form>
                <input class="textinput" type="text" name="username" autofocus="autofocus" placeholder="Username">
                <br>
                <br>
                <input class="textinput" type="password" name="password" placeholder="Password">
                <br>
                <br>
                <button class="submit">
                    <img src="http://www.yachtsale.se/wp-content/themes/Yachtsales/images/arrow-right.png"
                         height="24px"/>
                </button>
            </form>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "sign";
</style>
<script>
    import UserLang from '../../assets/lang/account.json';
    import { mapGetters, mapActions } from 'vuex';
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        computed:{
            ...mapGetters({
               lang:"getLang"
            }),
            langConfig(){
                return UserLang.filter(config => config.lang === this.lang)[0]
            }
        },
        methods:{

        },
        components:{

        }
    }




</script>
