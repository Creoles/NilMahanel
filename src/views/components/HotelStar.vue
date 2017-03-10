<template>
    <el-select class="hotel-star" v-model="hotelStar" placeholder="select" @change="starChange">
        <el-option value="1" label="1 star">
            <template solt="label">
                <el-rate
                    v-model="star.value1"
                    disabled
                    show-text
                    text-template="1 star">
                </el-rate>
            </template>
        </el-option>
        <el-option value="2" label="2 star">
            <template solt="label">
                <el-rate
                    v-model="star.value2"
                    disabled
                    show-text
                    text-template="2 star">
                </el-rate>
            </template>
        </el-option>
        <el-option label="3 star" value="3">
            <template solt="label">
                <el-rate
                    v-model="star.value3"
                    disabled
                    show-text
                    text-template="3 star">
                </el-rate>
            </template>
        </el-option>
        <el-option label="4 star" value="4">
            <template solt="label">
                <el-rate
                    v-model="star.value4"
                    disabled
                    show-text
                    text-template="4 star">
                </el-rate>
            </template>
        </el-option>
        <el-option label="5 star" value="5">
            <template solt="label">
                <el-rate
                    v-model="star.value5"
                    disabled
                    show-text
                    text-template="5 star">
                </el-rate>
            </template>
        </el-option>
    </el-select>
</template>
<style lang="scss">
    .hotel-star {
        .el-icon-star-on {
            color:#000;
        }
    }
</style>
<script>
    export default {
        data(){
            return {
                star:{
                    value1:1,
                    value2:2,
                    value3:3,
                    value4:4,
                    value5:5
                },
                hotelStar:''
            }
        },
        methods:{
            starChange(){
                this.$emit('star-change',this.hotelStar);
            }
        }
    }
</script>