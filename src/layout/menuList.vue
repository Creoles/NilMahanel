<template>
    <li>
        <div class="menu-item" @click='toggle'>
            <i class="menu-icon fa" :class="[model.data.icon]"></i>
            {{model.data.menuName}}
            <i v-if='isList' class="down-icon fa fa-chevron-down"></i>
        </div>
        <ul class="child-item" v-show="open" v-if='isList'>
            <items v-for='cel in model.childTreeNode' :model='cel'></items>
        </ul>
    </li>
</template>
<style lang="scss">
    @import "../assets/var/var";
    .menu-item {
        padding: 1rem 1rem;
        cursor:pointer;
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
        padding-left:1rem;
        font-size:0.6rem
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
        computed: {
            isList: function() {
                return this.model.childTreeNode && this.model.childTreeNode.length
            }
        },
        methods: {
            toggle: function() {
                if(this.isList) {
                    this.open = !this.open
                }
            }
        }
    }
</script>
