<template>
    <div>
        <content-top>
            <el-button class="add-btn el-icon-plus" type="primary"  @click="addShop">
                添加景点
            </el-button>
        </content-top>
        <el-table
                :data="shopList"
                style="width: 100%">
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
                    prop="category"
                    label="类型">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格与成本">
                <template scope="props">
                    <div  v-if="props.gridData">
                        <el-popover
                                ref="popover"
                                placement="bottom"
                                width="400"
                                trigger="click">
                            <el-table :data="props.gridData">
                                <el-table-column width="150" property="date" label="日期"></el-table-column>
                                <el-table-column width="100" property="name" label="姓名"></el-table-column>
                                <el-table-column width="300" property="address" label="地址"></el-table-column>
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
  import ContentType from 'src/views/components/ContentType.vue'
  export default {
    data(){

    },
    components:{
      ContentType
    }
  }
</script>