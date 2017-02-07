<template>
    <div class="wrap">
        <main-view></main-view>
        <copyright class="copyright-box" v-if="isAdminPath"></copyright>
    </div>
</template>
<style lang="scss">
    html {
        height: 100%;
        body {
            height: 100%;
            background-color: #f5f5f5;
            overflow: auto;
            font-family: "Lucida Grande", Lucida Sans Unicode, Hiragino Sans GB, WenQuanYi MicroHei, Verdana, Aril, sans-serif !important;
        }
        .wrap {
            position: relative;
            height: 100%;
            .copyright-box {
                position: absolute;
                bottom: 0;
                width: 100%;
            }

        }
    }


</style>
<script>
  import MainView from "./layout/MainView.vue"
  import ToolBar from "./layout/ToolBar.vue"
  import Copyright from "./views/components/Copyright.vue"
  export default {
    name: 'app',
    components:{
      MainView,
      ToolBar,
      Copyright
    },
    created(){
       var lang = localStorage.getItem("LANG");
       if(lang == undefined){
          this.$store.dispatch('initLang')
       }else {
          this.$store.dispatch('changeLang',lang)
       }

    },
    computed:{
        isAdminPath(){
            return /admin/.test(this.$route.path)
        }
    }

  }




</script>
