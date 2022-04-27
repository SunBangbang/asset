<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <nav-bar></nav-bar>
    <!-- 头部区域 -->
    <head-bar></head-bar>
    <!-- 主内容区域 -->
    <el-scrollbar style="height:100%">
      <div class="tech_term_box flex">
        <div class="tech_term_right">
          <div class="toolbar" style="text-align:left;padding-top:10px;">
            <!--表格树内容栏-->
            <el-table :data="tableTreeDdata" border stripe size="mini" style="width: 100%;" rowKey="id"
              v-loading="loading" :element-loading-text="$t('action.loading')"
              :header-cell-style="{color: '#0072E3',background:'#F5F6FA'}">
              <el-table-column prop="orderCreator" label="创建者" :show-overflow-tooltip='true'>
              </el-table-column>
              <el-table-column prop="name" label="名字" :show-overflow-tooltip='true'>
              </el-table-column>
              <el-table-column prop="sum" label="总数" :show-overflow-tooltip='true'>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip='true'>
              </el-table-column>
              <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                  <el-button type="success" plain size="mini" @click="add">增加</el-button>
                  <el-button type="primary" plain size="mini" @click="edit(scope)">编辑</el-button>
                  <el-button type="danger" plain size="mini" @click="deleteItem(scope)">删除</el-button>
                  </template>
              </el-table-column>
            </el-table>

            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="4"
                :page-sizes="[10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
                :total="cnt">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="创建者">
          <el-input v-model="form.orderCreator"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="总数">
          <el-input v-model="form.sum"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDemo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import HeadBar from "../../HeadBar/HeadBar"
  import NavBar from "../../NavBar/NavBar"
  import {
    format
  } from "@/utils/datetime"
  // import InfAnalyseDialog from './InfAnalyseDialog.vue'
  export default {
    components: {
      HeadBar,
      NavBar
    },
    data() {
      return {
        filterText: '',
        dialogVisible: false, //弹框显示
        val: '',
        loading: false,
        tableTreeDdata: [],
        pagelimit: {
          limit: 10,
          page: 1
        },
        cnt: 0,
        form: {},
        type: 'add'
      }
    },
    async created() {
      let {
        data: res
      } = await this.$api.demo.demoList()
       // 如果session中有数据则从session中取
      this.tableTreeDdata = JSON.parse(sessionStorage.getItem('demoList')) || res
      // 共多少条数据
      this.cnt = this.tableTreeDdata.length
    },
    methods: {
      //获取表格数据
      async findPage() {
        let {
          data: res
        } = await this.$api.demo.demoList()
        this.tableTreeDdata = res
        this.cnt = this.tableTreeDdata.length
        this.loading = false
      },
      // 更换每页多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagelimit.limit = val
        this.findPage()
      },
      // // 点击页码
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagelimit.page = val
        this.findPage()
      },
      // 点击添加按钮
      add(){
        this.form = {}
        this.type = 'add'
        this.dialogVisible = true
      },
      // 点击删除按钮
      deleteItem(scope){
        let id = scope.row['id']
        this.tableTreeDdata.map((item,index) => {
          if(item.id == id){
             // 删除数据
            this.tableTreeDdata.splice(index,1)
            sessionStorage.setItem('demoList', JSON.stringify(this.tableTreeDdata))
          }
        });
      },
        // 点击编辑按钮
      edit(scope){
        this.type = 'edit'
        this.form = scope.row
        this.dialogVisible = true
      },
      // 弹框确认
      addDemo(){
         // 添加时确认
        if(this.type == 'add'){
          this.tableTreeDdata.push({id: this.cnt + 1,...this.form,createTime: format(new Date) })
        } else {
          // 编辑时确认
          let id = this.form['id']
          this.tableTreeDdata.map((item,index) => {
            if(item.id == id){
              // 更改数据内容
              this.tableTreeDdata[index] = this.form
            }
          });
        }
        // 存入session
        sessionStorage.setItem('demoList', JSON.stringify(this.tableTreeDdata))
        this.dialogVisible = false
      }
    },
  };
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    // background: rgba(224, 234, 235, 0.1);
  }

  .flex {
    display: flex;
  }

  .tech_term_box {
    padding: 10px;
    box-sizing: border-box;
    justify-content: space-between;
  }


  .tech_term_right {
    box-sizing: border-box;
    overflow: hidden;
    flex: 8;
  }

  >>>.el-pagination {
    padding: 2px 15px !important;
  }

  .fs12 {
    font-size: 12px;
  }

  .block {
    text-align: right;
    margin-top: 10px;
  }

  .el-scrollbar>>>.el-scrollbar__wrap {
    overflow-x: hidden !important;
    overflow-y: auto;
    padding-right: 10px;
  }
</style>
