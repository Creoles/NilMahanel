<template>
    <div>
        <content-top><el-button class="addBtn" type="primary">添加账号</el-button></content-top>
        <el-collapse accordion>
          <el-collapse-item v-for="item in country" :key="item.id">
            <template slot="title">
              {{item.country}} <el-button type="text">添加城市</el-button>
            </template>
            <el-table :data="item.city" max-height="250">
              <el-table-column label="ID" prop="id"></el-table-column>
              <el-table-column label="地区" prop="name"></el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button type="text" size="small" @click="removeCity(scope.
                  $index,item.city)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
    </div>
</template>
<style lang="scss">
    .addBtn {
        float:right;
    }
</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    export default{
        data(){
            return{
                dialogFormVisible:false,
                country:[
                  {
                    id:1,
                    country:'SriLanka',
                    city:[
                      {id:1,name:'科伦坡'}
                    ]
                  }
                ]
            }
        },
        methods:{
          removeCity(index,row){
            row.splice(index,1);
          }
        },
        components:{
            ContentTop
        }
    }
</script>
