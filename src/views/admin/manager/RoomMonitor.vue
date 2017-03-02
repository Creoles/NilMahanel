<template>
    <div>
        <content-top></content-top>
        <div class="month-block">
            请选择月份:
            <el-date-picker
                    v-model="month"
                    type="month">
            </el-date-picker>
        </div>
        <el-table
                :data="roomList"
                style="width: 100%">
            <el-table-column
                    label="酒店名称"
                    prop="hotelName">
            </el-table-column>
            <el-table-column
                    label="位置"
                    prop="location">
            </el-table-column>
            <el-table-column
                    label="切房总数"
                    prop="cutNum">
            </el-table-column>
            <el-table-column
                    prop="used"
                    label="已使用">
                <template scope="props">
                    <el-popover
                            ref="popover1"
                            placement="bottom"
                            width="440"
                            trigger="hover">
                        <el-table :data="props.row.used" :row-class-name="tableRowClassName">
                            <el-table-column width="200" property="name" label="名称"></el-table-column>
                            <el-table-column width="80" property="cutNum" label="切房量"></el-table-column>
                            <el-table-column width="80" property="used" label="已使用"></el-table-column>
                            <el-table-column width="80" property="surplus" label="剩余"></el-table-column>
                        </el-table>
                    </el-popover>
                    <i v-popover:popover1 style="cursor:pointer">
                        <el-progress type="circle" :show-text="true" :width="60" :percentage="props.row.used|room(props.row.cutNum)"></el-progress>
                    </i>
                </template>
            </el-table-column>
            <el-table-column
                label="剩余房量"
                prop="surplus">
        </el-table-column>
            <el-table-column
                    label="本月倒计时(天)"
                    prop="time">
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="scss">
    .month-block {
        text-align: right;
        margin-bottom: 20px;
    }
</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    export default{
        data(){
            return{
                month:'',
                roomList:[
                    {
                        hotelName:"Ran hotel",
                        location:"ChongQing Yubei",
                        cutNum:"1000",
                        used:[
                            {name:"zhangzhenyu",cutNum:500,used:300,surplus:200},
                            {name:"hulin",cutNum:500,used:300,surplus:200}
                        ],
                        surplus:"400",
                        time:10

                    }
                ]

            }
        },
        methods:{
          tableRowClassName(row, index) {
            if (index === 1) {
              return 'info-row';
            } else if (index === 3) {
              return 'positive-row';
            }
            return '';
          }
        },
        components:{
            ContentTop
        }
    }
</script>
