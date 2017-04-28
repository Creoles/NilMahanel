<template>

  <li>
    <router-link tag="div" :to="{path:model.data.menuPath}" v-if="model.data.menuPath">
      <div class="menu-item" @click='toggle'>
        <i class="menu-icon fa" :class="[model.data.icon]"></i>
        {{model.data.menuName}}
        <i v-if='isList' class="down-icon fa fa-chevron-down"></i>
      </div>
      <ul class="child-item" v-show="currentOpen" v-if='isList'>
        <items v-for='cel in model.childTreeNode' :model='cel' :key="cel.id"></items>
      </ul>
    </router-link>
    <div class="menu-item" @click='toggle' v-else>
      <i class="menu-icon fa" :class="[model.data.icon]"></i>
      {{model.data.menuName}}
      <i v-if='isList' class="down-icon fa fa-chevron-down"></i>
    </div>
    <ul class="child-item" v-show="open" v-if='isList'>
      <items v-for='cel in model.childTreeNode' :model='cel' :key="cel.id"></items>
    </ul>
  </li>


</template>
<style lang="scss">
  @import "../assets/var/var";

  .router-link-active {
    background-color: $primaryColor;
  }

  .menu-item {
    padding: 1rem 1rem;
    cursor: pointer;
    &:hover {
      background-color: $primaryColor;
    }
    .menu-icon {
      margin-right: 10px;
    }
    .down-icon {
      margin-left: 10px;
    }

  }

  .child-item {
    padding-left: 1rem;
    font-size: 0.6rem
  }
</style>
<script>
  export default {
    name: 'items',
    props: ['model'],
    components: {},
    data() {
      return {
        open: false
      }
    },
    created(){
      this.currentOpen();
    },
    computed: {
      isList: function () {
        return this.model.childTreeNode && this.model.childTreeNode.length
      }

    },
    methods: {
      toggle: function () {
        if (this.isList) {
          this.open = !this.open
        }
      },
      currentOpen: function () {
        if (this.isList) {
          let path = this.$route.path;
          let b = this.model.childTreeNode.some(function (item) {
            return item.data.menuPath == path;
          });
          if (b) {
            this.open = true;
          }
        }

      }
    }
  }

</script>
