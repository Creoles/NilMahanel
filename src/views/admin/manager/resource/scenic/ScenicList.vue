<template>
    <div>
        <content-top>
            <el-button class="add-btn el-icon-plus" type="primary"  @click="addScenic">
                添加景点
            </el-button>
        </content-top>
        <el-table
                :data="scenicList"
                style="width: 100%">
            <el-table-column
                    prop="country"
                    label="国家"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="city"
                    label="城市"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="cost"
                    label="报价与成本">
                <template scope="props">
                    <div v-if="props.row.cost">
                        <el-popover
                                ref="popover"
                                placement="bottom"
                                width="400"
                                trigger="hover">
                            <el-table :data="props.row.cost">
                                <el-table-column width="100" property="adultOffer" label="成人报价"></el-table-column>
                                <el-table-column width="100" property="adultCost" label="成人成本"></el-table-column>
                                <el-table-column width="100" property="childOffer" label="儿童报价"></el-table-column>
                                <el-table-column width="100" property="childCost" label="儿童成本"></el-table-column>
                            </el-table>
                        </el-popover>
                        <i v-popover:popover class="el-icon-view"></i>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                    prop="people"
                    label="联系人">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话">
            </el-table-column>
            <el-table-column
                    label="操作">
            </el-table-column>
        </el-table>
    </div>
</template>
<style>

</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    export default{
        data(){
            return{
                scenicList:[
                    {
                        country:'Srilanka',
                        cost:[
                            {
                                adultOffer:1,
                                adultCost:2,
                                childOffer:1,
                                childCost:2
                            }
                        ]
                    }
                ]
            }
        },
            methods:{
            addScenic(){
                this.$router.push({name:"ADD SCENIC"})
            }
        },
        components:{
            ContentTop
        }
    }
</script>