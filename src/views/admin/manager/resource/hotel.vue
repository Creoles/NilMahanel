<template>
    <div>
        <el-form :model="params" label-position="top" label-width="100px" class="hotel-form">
            <el-form-item label="酒店名称">
                <el-input v-model="params.name"></el-input>
            </el-form-item>
            <el-form-item label="酒店区域" class="inline">
                <el-select v-model="params.region" class="hotel-region" placeholder="select">
                    <el-option label="1" value="shanghai"></el-option>
                    <el-option label="2" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="具体地址" class="inline hotel-address">
                <el-input v-model="params.address"></el-input>
            </el-form-item>
            <el-form-item label="星级" class="inline hotel-star" >
                <el-select v-model="params.star" placeholder="select">
                    <el-option label="一星级" value="1"></el-option>
                    <el-option label="二星级" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房间总数" class="inline hotel-total">
                <el-input v-model="params.total"></el-input>
            </el-form-item>
            <div class="room">
                <el-form-item label="单人间数量" class="inline hotel-single">
                <el-input v-model="params.single"></el-input>
            </el-form-item>
                <el-form-item label="单人间成本(USD)" class="inline hotel-single">
                    <el-input v-model="params.singleCost"></el-input>
                </el-form-item>
                <el-form-item label="单人间报价(USD)" class="inline hotel-single">
                    <el-input v-model="params.singleOffer"></el-input>
                </el-form-item>
                <el-form-item label="双人间数量" class="inline hotel-double">
                    <el-input v-model="params.double"></el-input>
                </el-form-item>
                <el-form-item label="单人间成本(USD)" class="inline hotel-double">
                    <el-input v-model="params.doubleCost"></el-input>
                </el-form-item>
                <el-form-item label="单人间报价(USD)" class="inline hotel-triple">
                    <el-input v-model="params.doubleOffer"></el-input>
                </el-form-item>
                <el-form-item label="三人间数量" class="inline hotel-double">
                    <el-input v-model="params.double"></el-input>
                </el-form-item>
                <el-form-item label="单人间成本(USD)" class="inline hotel-triple">
                    <el-input v-model="params.doubleCost"></el-input>
                </el-form-item>
                <el-form-item label="单人间报价(USD)" class="inline hotel-triple">
                    <el-input v-model="params.doubleOffer"></el-input>
                </el-form-item>
            </div>

        </el-form>
    </div>
</template>
<style lang="scss">
    .hotel-form {
        width: 500px;
    }
    .hotel-region {
        width: 100px;
    }
    .hotel-address {
        width: 394px;
    }
    .hotel-star {
        width: 100px;
    }
    .hotel-total {
        width: 200px;
    }
    .hotel-single {
        width: 150px;
    }
    .hotel-double {
        width: 150px;
    }
    .hotel-triple {
        width: 150px;
    }
    .room {
        border: 3px solid #fff;
        padding: 5px;
    }
    .inline {
        display: inline-block;
    }
</style>
<script>
    export default{
        data(){
            return{
                params:{

                }
            }
        },
        components:{

        }
    }
</script>
