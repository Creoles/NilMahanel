<template>
    <div>
        <content-top></content-top>
        <el-table
                :data="customerList"
                style="width: 100%">
            <el-table-column type="expand">
                <template scope="scope">
                    <el-table
                            :data="scope.row.data"
                            style="width: 80%">
                        <el-table-column
                                prop="groupId"
                                label="团号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="num"
                                label="人数"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="shop"
                                label="购物">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                    label="名称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="城市"
                    prop="city">
            </el-table-column>
            <el-table-column
                    label="联系方式"
                    prop="phone">
            </el-table-column>
            <el-table-column
                    label="授信(USD)"
                    prop="shouxin">
            </el-table-column>
            <el-table-column
                    label="预警"
                    prop="yujing">
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="scss">

</style>
<script>
    import ContentTop from "../../components/contentTop.vue"
    export default{
        data(){
            return{
                customerList:[
                    {
                        name:"shanghai zhongxin sadsadasdasdssds",
                        city:"shanghai",
                        phone:"+86-18523199991",
                        shouxin:50,
                        yujing:-10,
                        data:[
                            {
                                groupId:"xxxxxx",
                                num:12,
                                shop:1000
                            }
                        ]
                    },
                    {
                        name:"shanghai zhongxin sadsadasdasdssds",
                        city:"shanghai",
                        phone:"+86-18523199991",
                        shouxin:50,
                        yujing:60,
                        data:[
                            {
                                groupId:"xxxxxx",
                                num:12,
                                shop:1000
                            }
                        ]
                    }

                ]
            }
        },
        components:{
            ContentTop
        }
    }
</script>
