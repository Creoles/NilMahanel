<template>
    <div>
        <content-top><el-button class="addCountry" @click="addCountry" type="primary">添加国家</el-button></content-top>
        <el-collapse accordion>
          <el-collapse-item v-for="item in country" :key="item.id">
            <template slot="title">
              {{item.country}} <el-button type="text" @click="addCity($event)">添加城市</el-button>
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
    .addCountry {
        float:right;
    }
</style>
<script>
    import ContentTop from "src/views/components/ContentTop.vue"
    export default{
        data(){
            return{
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
          addCountry(){
            this.$prompt('请输入国家名', '添加国家(中文/English)', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputErrorMessage: '格式不正确'
            }).then(({ value }) => {
              this.$http();
            })
          },
          addCity(event){
            event.stopPropagation();
            this.$prompt('请输入地区名','添加城市(中文/English)',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputErrorMessage: '格式不正确'
            }).then(({ value }) => {
              this.$http();
            })
          },
          removeCity(index,row){
            this.$confirm('此操作将删除该地区, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              row.splice(index,1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          }
        },
        components:{
            ContentTop
        }
    }
</script>
