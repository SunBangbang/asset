<template>
  <el-scrollbar style="height:100%">
    <div class="tech_term_box flex">
      <div class="tech_term_left">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-form :inline="true" size="small">
            <div class="flex">
              <el-form-item>
                <el-input :placeholder="`请输入${tabLabel}`" v-model="filterText" style="padding-right: 15px;" />
              </el-form-item>
              <el-form-item>
                <kt-button icon="fa fa-search" :label="$t('action.search')" :perms="routeCurt+':'+$t('action.search')"
                  type="primary" @click="filterTree" />
              </el-form-item>
            </div>
          </el-form>

          <el-tab-pane label="标准主题" name="1">
            <el-scrollbar style="height: 400px">
              <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick" ref="tree"
                :render-content="renderContent" :filter-node-method="filterNode">
              </el-tree>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="主管部门" name="2">
            <el-scrollbar style="height: 400px">
              <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick" ref="tree1"
                :render-content="renderContent" :filter-node-method="filterNode">
              </el-tree>
            </el-scrollbar>
          </el-tab-pane>

        </el-tabs>
      </div>
      <div class="tech_term_right">
        <div class="flex" style="justify-content: flex-end;border-bottom:1px solid #dee2e6;padding: 7px 0;">
          <div class="collect" @click="collect"><i class="el-icon-star-on" />收藏</div>
          <div class="collect" @click="collectOff"><i class="el-icon-star-off" />取消收藏</div>
        </div>
        <div class="toolbar" style="text-align:left;padding-top:10px;padding-left:15px;">
          <el-form :inline="true" size="small">
            <div class="flex">
              <el-form-item>
                <el-input v-model="params.std_item_chn_nm" placeholder="请输入标准中文名称" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item v-if="tabLabel!=='主管部门'">
                <el-input v-model="params.aprv_org_nm_arr" placeholder="请输入主管部门" style="width: 200px"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="params.collected_if" placeholder="请选择收藏状态" style="width: 200px">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <kt-button icon="fa fa-search" :label="$t('action.search')" :perms="routeCurt+':'+$t('action.search')"
                  type="primary" @click="findTreeData" />
              </el-form-item>
            </div>
          </el-form>
          <!--表格树内容栏-->
          <el-table :data="tableTreeDdata" border stripe size="mini" style="width: 100%;" rowKey="id"
            v-loading="loading" :element-loading-text="$t('action.loading')"
            :header-cell-style="{color: '#0072E3',background:'#F5F6FA'}" highlight-current-row
            @current-change="handleCurrentChange">
            <el-table-column prop="rnum" label="序号" min-width="50" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="std_item_chn_nm" label="标准中文名" min-width="150" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div @click="popUpWindows(scope.row)" style="color: #0072E3;cursor:pointer">
                  {{scope.row.std_item_chn_nm}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="std_item_desc" label="业务含义" min-width="250" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="biz_dttyp_nm" label="数据类型" min-width="80" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="aprv_org_nm_arr" label="主管部门" min-width="130" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="collected_if" label="是否收藏" :formatter="collected" min-width="70" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="rles_vrsn" label="版本号" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="rles_tm_format" label="版本日期" :formatter="dateFormat" min-width="150" :show-overflow-tooltip='true'>
            </el-table-column>
          </el-table>

          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="4"
              :page-sizes="[10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="cnt">
            </el-pagination>
          </div>
          <TechTermDialog :dialogVisible='dialogVisible' :val="val" @dialogVisible="dialogVisible=false">
          </TechTermDialog>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import KtButton from "@/views/Core/KtButton"
  // import { //模拟数据
  //   getStdTheme,
  //   getStdDefDepts,
  //   tableTreeDdata,
  // } from './TargtStdJs.js'
  import TechTermDialog from './TargtStdDialog.vue'
  import {
    format
  } from "@/utils/datetime"
  export default {
    components: {
      KtButton,
      TechTermDialog
    },
    data() {
      return {
        filterText: '',
        dialogVisible: false, //弹框显示
        routeCurt: this.$router.currentRoute.meta.index,
        tabLabel: '标准主题',
        tree: [], // 菜单树List
        activeName: '1', //菜单上tab栏切换
        defaultProps: { //菜单默认接收数据
          children: 'children',
          label: 'std_item_grp_nm'
        },
        val: '',
        options: [{
          value: '',
          label: '全部'
        }, {
          value: 'Y',
          label: '已收藏'
        }, {
          value: 'N',
          label: '未收藏'
        }],
        loading: false,
        tableTreeDdata: [],
        pagelimit: {
          limit: 10,
          page: 1
        },
        params: {
          std_item_chn_nm: '',
          aprv_org_nm_arr: '',
          collected_if: '',
          func: "searchStdTargt",
          limit: 15,
          method: "service",
          page: 1,
          service: "targt",
          tenantId: '',
          captcha: "VUE",
        },
        cnt: 0,
        contReq: {
          collected_if: '',
          aprv_org_nm_arr: "",
          method: "findOne",
          qId: "targt.searchStdTargtCnt",
          std_item_chn_nm: "",
          std_item_grp_id: "",
          tenantId: "",
        },
        handleCurrentVal:{}//点击当行的数据
      }
    },
    created() {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.params.tenantId = user.loginId
      this.contReq.tenantId = user.loginId
      //获取标准主题菜单信息
      this.reqGetStdTheme()
      //获取表格数据
      this.findPage()
    },
    methods: {
      filterTree() {
        if (this.activeName == 1) this.$refs.tree.filter(this.filterText);
        if (this.activeName == 2) this.$refs.tree1.filter(this.filterText);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.std_item_grp_nm.indexOf(value) !== -1;
      },
      //点击tab切换时改变菜单
      handleClick(tab, event) {
        this.filterText = ''
        this.tabLabel = tab.label
        this.params.std_item_chn_nm = ''
        this.params.aprv_org_nm_arr = ''
        this.params.collected_if = ''
        let params = {}
        this.tree = []
        if (tab.name == '1') {
          this.reqGetStdTheme()
        } else {
          this.reqGetStdDefDepts()
        }
        this.findPage()
      },
      //获取标准主题菜单信息
      async reqGetStdTheme() {
        let params = {
          method: "find",
          qId: "trmBus.getStdTheme",
          std_item_grp_typ: "IG",
          tenantId: this.params.tenantId,
          captcha: "VUE",
        }
        let res = await this.$api.util.execAction(params)
        // if (!res.rows) res = getStdTheme
        this.tree = this.toTree(res.rows, 'ROOT')
      },
      //获取主管部门菜单信息
      async reqGetStdDefDepts() {
        let params = {
          dept_nm: "",
          method: "find",
          qId: "dept.getStdDefDepts",
          tenantId: this.params.tenantId,
          captcha: "VUE",
        }
        let res = await this.$api.util.execAction(params)
        // if (!res.rows) res = getStdDefDepts
        res.rows.forEach(item => {
          this.tree.push({
            id: item.dept_id,
            std_item_grp_nm: item.dept_nm,
            dept_id: item.dept_id,
            dept_nm: item.dept_nm,
            upp_dept_id: item.upp_dept_id,
            icon: 'el-icon-notebook-2'
          })
        })
      },
      // 递归菜单树
      toTree(data, std_item_grp_id) {
        let vm = this;
        var tree = [];
        var temp;
        data.forEach(item => {
          if (item.upp_std_item_grp_id == std_item_grp_id) {
            var obj = item;
            obj.id = obj.seq
            obj.icon = 'el-icon-folder-opened'
            temp = this.toTree(data, item.std_item_grp_id);
            if (temp.length > 0) {
              obj.children = temp;
            }
            tree.push(obj);
          }
        })
        return tree
      },
      //树菜单点击事件
      handleNodeClick(e) {
        this.loading = true
        let id = e.std_item_grp_id ? e.std_item_grp_id : e.dept_id
        if (this.activeName == 1) {
          this.params.dept_id = ''
          this.params.std_item_grp_id = id
          this.contReq.dept_id = ''
          this.contReq.std_item_grp_id = id
        } else {
          this.params.std_item_grp_id = ''
          this.params.dept_id = id
          this.contReq.std_item_grp_id = ''
          this.contReq.dept_id = id
        }
        this.findPage()
      },
      //获取表格数据
      async findPage() {
        let params = {
          ...this.params,
          ...this.pagelimit
        }
        let {
          data: res
        } = await this.$api.util.execAction(params)
        // if (!res.rows) res.rows = tableTreeDdata.data.rows
        this.tableTreeDdata = res.rows
        this.contReq.std_item_chn_nm = this.params.std_item_chn_nm
        this.contReq.aprv_org_nm_arr = this.params.aprv_org_nm_arr
        this.contReq.collected_if = this.params.collected_if
        let row = await this.$api.util.execAction(this.contReq)
        this.cnt = row.cnt ? row.cnt : this.tableTreeDdata.length
        this.loading = false
      },
      handleSizeChange(val) {
        this.pagelimit.limit = val
        this.findPage()
      },
      handleCurrentChange(val) {
        this.pagelimit.page = val
        this.findPage()
      },
      //点击显示弹框
      popUpWindows(val) {
        console.log(val.std_item_id)
        this.dialogVisible = true
        this.val = val.std_item_id
      },
      dateFormat(row, column, cellValue, index) {
        return format(row[column.property])
      },
      collected(row, column) {
        return row['collected_if'] == 'Y' ? '是' : '否'
      },
      // 表格模糊查询
      findTreeData() {
        this.findPage()
      },
      //选中当行
      handleCurrentChange(val) {
        this.handleCurrentVal = val
        console.log(this.handleCurrentVal)
      },
      //取消收藏
      async collectOff() {
        if(this.handleCurrentVal.collected_if!=='Y') {
          this.$message({
            type:'warning',
            message: `请选择已收藏的数据`
          });
          return
        }
        let params = {
          func: "deleteStdCollect",
          method: "service",
          service: "stdTermBus",
          std_clss_id: "67743c31-800e-44cf-b10a-5a5c00189177",
          std_item_grp_typ: "TG",
          std_item_id: this.handleCurrentVal.std_item_id,
          std_item_typ: "T",
          tenantId: this.params.tenantId,
          captcha: "VUE",
        }
        let {data} = await this.$api.util.execAction(params)
        if(data.success){
          this.$message({
            type:'success',
            message: `取消收藏标准成功`
          });
          this.findPage()
        }
      },
      //收藏
      async collect() {
        if(!this.handleCurrentVal.std_item_id){
          this.$message({
            type:'warning',
            message: `请选择要收藏的数据`
          });
          return
        }
        if(this.handleCurrentVal.stat == '审批中'){
          this.$message({
            type:'warning',
            message: `该标准正在审批中不能添加收藏`
          });
          return
        }
        let params = {
          method: "findOne",
          qId: "trmBus.checkCollectTermExists",
          std_item_grp_typ: "TG",
          std_item_id: this.handleCurrentVal.std_item_id,
          std_item_typ: "T",
          tenantId: this.params.tenantId,
          captcha: "VUE",
        }
        let {row} = await this.$api.util.execAction(params)
        // this.handleCurrentVal
        if(row.cnt == 1){
          this.$message({
            type:'warning',
            message: `该标准已在收藏夹存在，不能重复添加`
          });
        }else if(row.cnt == 0){
          this.$message({
            type:'success',
            message: `收藏标准成功`
          });
          this.findPage()
        }
      },
      //树添加图标
      renderContent(e, {
        node,
        data
      }) {
        return ( < span class = "fs12" > < i class = {
            data.icon
          }
          style = "color:#09c" > < /i> <span style = "padding-left: 4px;"> {node.label} </span > < /span> )
        },
      },
    }
</script>

<style scoped="scoped">
  .flex {
    display: flex;
  }

  .tech_term_box {
    padding: 0 5px;
    justify-content: space-between;
  }

  .tech_term_left {
    box-sizing: border-box;
    flex: 2;
    min-width: 250px;
    padding-right: 10px;
    border-right: 1px solid #dee2e6;
    min-height: calc(100vh - 130px);
  }

  .tech_term_right {
    padding: 0 10px;
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
  .collect {
    border: 1px solid #888;
    color: #888;
    padding: 4px 8px;
    transition: all .1s;
    font-size: 12px;
    cursor: pointer;
  }

  .collect:hover {
    background-color: #888;
    color: #FFFFFF;
  }
</style>
