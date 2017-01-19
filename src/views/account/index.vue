<template>
    <div class="container">
        <section id="formHolder">

            <div class="row">

                <!-- Brand Box -->
                <div class="col-sm-6 brand">
                    <a href="#" class="logo"> language <span>.</span></a>

                    <div class="heading">
                        <h2>XXXXXOTA</h2>
                        <p>Your Right Choice</p>
                    </div>

                    <div class="success-msg">
                        <p>Great! You are one of our members now</p>
                        <a href="#" class="profile">Your Profile</a>
                    </div>
                </div>


                <!-- Form Box -->
                <div class="col-sm-6 form">

                    <!-- Login Form -->
                    <div class="login form-peice switched">

                        <form class="login-form" action="#" method="post" novalidate>
                            <div class="form-group">
                                <label>{{langConfig['login'].email}}</label>
                                <input type="email" required autocomplete="nope">
                            </div>

                            <div class="form-group">
                                <label for="loginPassword">{{langConfig['login'].password}}</label>
                                <input type="password" name="loginPassword" id="loginPassword" required
                                       autocomplete="nope">
                            </div>

                            <div class="CTA">
                                <input type="submit" :bind="langConfig['login'].button">
                                <a href="#" class="switch">{{langConfig['login'].toSign}}</a>
                            </div>
                        </form>

                    </div><!-- End Login Form -->


                    <!-- Signup Form -->
                    <div class="signup form-peice">
                        <form class="signup-form" action="#" method="post">

                            <div class="form-group">
                                <label for="name">{{langConfig['sign'].username}}</label>
                                <input type="text" name="username" id="name" class="name">
                                <span class="error"></span>
                            </div>

                            <div class="form-group">
                                <label for="email">{{langConfig['sign'].email}}</label>
                                <input type="email" name="email" id="email" :class="{'email':true,'hasError': errors.has('email') }" v-validate data-vv-rules="required|email">
                                <span class="error" v-show="errors.has('email')">{{errors.first('email')}}</span>
                            </div>

                            <div class="form-group">
                                <label for="phone">{{langConfig['sign'].phone}}
                                </label>
                                <input type="text" name="phone" id="phone">
                            </div>

                            <div class="form-group">
                                <label for="password">{{langConfig['sign'].password}}</label>
                                <input type="password" name="password" id="password" class="pass">
                                <span class="error"></span>
                            </div>

                            <div class="form-group">
                                <label for="passwordCon">{{langConfig['sign'].confirm}}</label>
                                <input type="password" name="passwordCon" id="passwordCon" class="passConfirm">
                                <span class="error"></span>
                            </div>

                            <div class="CTA">
                                <input type="submit" :bind="langConfig['sign'].button" id="submit">
                                <a href="#" class="switch">{{langConfig['sign'].toLogin}}</a>
                            </div>
                        </form>

                    </div><!-- End Signup Form -->
                </div>
            </div>

        </section>

    </div>
</template>
<style lang="scss" scoped>
    @import "index";
</style>
<script>
    import UserLang from '../../assets/lang/account.json'
    export default {
        data(){
            return {

            }
        },
        computed: {
            lang() {
                return this.$route.path.split('?')[1] || 'zh-CN'
            },
            langConfig(){
                return UserLang.filter(config => config.lang === this.lang)[0]
            }
        },
        methods:{
            switchLang(targetLang){
                if(this.lang === targetLang) return;

                localStorage.setItem('LANGUAGE',targetLang);
                this.$router.push(this.$route.path.replace(this.lang, targetLang));
            }
        },
        mounted(){

            var usernameError = true,
                    emailError = true,
                    passwordError = true,
                    passConfirm = true;

            // Detect browser for css purpose
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                $('.form form label').addClass('fontSwitch');
            }

            // Label effect
            $('input').focus(function () {

                $(this).siblings('label').addClass('active');
            });

            // Form validation
            $('input').blur(function () {

                // User Name
                if ($(this).hasClass('name')) {
                    if ($(this).val().length === 0) {
                        $(this).siblings('span.error').text('Please type your full name').fadeIn().parent('.form-group').addClass('hasError');
                        usernameError = true;
                    } else if ($(this).val().length > 1 && $(this).val().length <= 6) {
                        $(this).siblings('span.error').text('Please type at least 6 characters').fadeIn().parent('.form-group').addClass('hasError');
                        usernameError = true;
                    } else {
                        $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                        usernameError = false;
                    }
                }
                // Email


                // PassWord
                if ($(this).hasClass('pass')) {
                    if ($(this).val().length < 8) {
                        $(this).siblings('span.error').text('Please type at least 8 charcters').fadeIn().parent('.form-group').addClass('hasError');
                        passwordError = true;
                    } else {
                        $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                        passwordError = false;
                    }
                }

                // PassWord confirmation
                if ($('.pass').val() !== $('.passConfirm').val()) {
                    $('.passConfirm').siblings('.error').text('Passwords don\'t match').fadeIn().parent('.form-group').addClass('hasError');
                    passConfirm = false;
                } else {
                    $('.passConfirm').siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                    passConfirm = false;
                }

                // label effect
                if ($(this).val().length > 0) {
                    $(this).siblings('label').addClass('active');
                } else {
                    $(this).siblings('label').removeClass('active');
                }
            });


            // form switch
            $('a.switch').click(function (e) {
                $(this).toggleClass('active');
                e.preventDefault();

                if ($('a.switch').hasClass('active')) {
                    $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
                } else {
                    $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
                }
            });


            // Form submit
            $('form.signup-form').submit(function (event) {
                event.preventDefault();

                if (usernameError == true || emailError == true || passwordError == true || passConfirm == true) {
                    $('.name, .email, .pass, .passConfirm').blur();
                } else {
                    $('.signup, .login').addClass('switched');

                    setTimeout(function () {
                        $('.signup, .login').hide();
                    }, 700);
                    setTimeout(function () {
                        $('.brand').addClass('active');
                    }, 300);
                    setTimeout(function () {
                        $('.heading').addClass('active');
                    }, 600);
                    setTimeout(function () {
                        $('.success-msg p').addClass('active');
                    }, 900);
                    setTimeout(function () {
                        $('.success-msg a').addClass('active');
                    }, 1050);
                    setTimeout(function () {
                        $('.form').hide();
                    }, 700);
                }
            });

            // Reload page
            $('a.profile').on('click', function () {
                location.reload(true);
            });


        }
    }


</script>