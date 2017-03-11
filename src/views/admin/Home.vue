<template>
    <div class="home">
        <p class="home-logo">
            <img src="~assets/img/home-logo.png" alt="logo">
        </p>
        <h1>YouLanka</h1>
        <p class="info">you travel experts</p>
        <footer class="footer">
            <div class="container">
                <div class="content has-text-centered">
                <p><span class="icon"><i class="fa fa-code"></i></span> with <span class="icon"><i class="fa fa-heart"></i></span> by <a href="https://github.com/rancongjie">YOULANKA</a>.</p> 
                <p>Code licensed under <a href="https://github.com/rancongjie">XXXX</a>.</p>
                </div>
            </div>
        </footer>
    </div>
</template>
<style scoped lang="scss">
    .home {
        padding-top:50px;
        text-align:center;
        .home-logo {
            img {
                width:200px;
                height:200px;
            }
        }
        h1 {
            font-size:30px;
            font-weight:blod;
            padding:20px 0 10px 0;
        }
        .info {
            font-size:20px;
        }
        .footer {
            margin-top:70px;
            .fa-heart {
                color:red;
            }
            .has-text-centered {
                line-height:30px;
                a {
                    color:#313f49;
                }
            }
        }

    }
    
</style>
<script>
    import Copyright from "../components/Copyright.vue"
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            Copyright
        }
    }
</script>
