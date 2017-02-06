<template>
    <li>
        <div class="menu-item" @click='toggle'>
            <i v-if='isList' class="fa " :class="[open?'fa-folder-open':'fa-folder']"></i>
            <i v-if='!isList' class="fa fa-file-text"></i> {{model.data.menuName}}
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
                open: false,
                isFolder: true
            }
        },
        computed: {
            isList: function() {
                return this.model.childTreeNode && this.model.childTreeNode.length
            }
        },
        methods: {
            toggle: function() {
                if(this.isFolder) {
                    this.open = !this.open
                }
            }
        }
    }
</script>
