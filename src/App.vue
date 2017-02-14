<template>
    <main-view></main-view>
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
       if (lang === 'zh-CN'){
          this.$locale.change('zh-cn')
       }else {
          this.$locale.change('en')
       }

    },
    computed:{
        isAdminPath(){
            return /admin/.test(this.$route.path)
        }
    }

  }




</script>
