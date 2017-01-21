<template>
    <div>
        <main-view></main-view>
    </div>
</template>
<style>
  .none-padding{padding:0!important;}
  body {
    overflow:auto;
    font-family:"Lucida Grande",Lucida Sans Unicode,Hiragino Sans GB,WenQuanYi MicroHei,Verdana,Aril,sans-serif!important;
  }
</style>
<script>
  import MainView from "./layout/MainView.vue"
  import ToolBar from "./layout/ToolBar.vue"
  export default {
    name: 'app',
    components:{
      MainView,
      ToolBar
    },
    created(){
       this.$store.dispatch('initLang')
    }

  }

</script>
