<template>
  <el-scrollbar style="height:100%">
    <div class="tech_term_box flex">
      <div class="tech_term_right">
        <div class="toolbar" style="text-align:left;padding-top:10px;">
          <el-form :inline="true" :model="params" size="small">
            <el-form-item>
              <el-input v-model="params.std_item_chn_nm" placeholder="请输入计划编号" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="params.std_item_eng_nm" placeholder="请输入计划名称" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="params.expression" placeholder="请选择提升计划启动日期" style="width: 200px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="params.rel_col_cnt" placeholder="请输入计划名称" style="width: 200px"></el-input>
            </el-form-item>
            <div>
              <el-form-item>
                <el-date-picker v-model="params.mpp_finish_start_tm" type="date" placeholder="申请开始时间"
                  style="width: 200px" value-format="timestamp">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-date-picker v-model="params.mpp_finish_end_tm" type="date" placeholder="申请结束时间"
                  style="width: 200px" value-format="timestamp">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <kt-button icon="fa fa-search" :label="$t('action.search')" :perms="routeCurt+':'+$t('action.search')"
                  type="primary" @click="findPage" />
              </el-form-item>
            </div>
          </el-form>
          <!--表格树内容栏-->
          <el-table :data="tableTreeDdata" border stripe size="mini" style="width: 100%;" rowKey="id"
            v-loading="loading" :element-loading-text="$t('action.loading')"
            :header-cell-style="{color: '#0072E3',background:'#F5F6FA'}">
            <el-table-column prop="rnum" label="序号" min-width="40" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="std_item_grp1" label="标准主题" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="std_item_grp2" label="标准大类" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="std_item_grp2" label="标准子类" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="std_item_grp3" label="标准细类" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="std_item_eng_nm" label="标准英文名称" width="200" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="std_item_chn_nm" label="标准中文名称" width="150" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div @click="popUpWindows(scope.row)" style="color: #0072E3;cursor:pointer">
                  {{scope.row.std_item_chn_nm}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="rel_col_cnt" label="被引用次数" width="150" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="rel_sys_cnt" label="标准引用系统数" width="150" :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column prop="aprv_org_nm_arr" label="标准影响力展示图" width="150">
              <template slot-scope="scope">
                <el-button type="success" plain size="mini" disabled>查看</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="4"
              :page-sizes="[10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="cnt">
            </el-pagination>
          </div>
          <InfAnalyseDialog :dialogVisible='dialogVisible' :val="val" @dialogVisible="dialogVisible=false">
          </InfAnalyseDialog>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import KtButton from "@/views/Core/KtButton"
  // import {
  //   tableTreeDdata
  // } from "./InfAnalyseJs.js"
  import InfAnalyseDialog from './InfAnalyseDialog.vue'
  import {
    format
  } from "@/utils/datetime"
  export default {
    components: {
      KtButton,
      InfAnalyseDialog
    },
    data() {
      return {
        filterText: '',
        dialogVisible: false, //弹框显示
        routeCurt: this.$router.currentRoute.meta.index,
        val: '',
        options: [{
          value: 'equals',
          label: '引用次数等于'
        }, {
          value: 'gt',
          label: '引用次数大于'
        }, {
          value: 'lt',
          label: '引用次数小于'
        }],
        loading: false,
        tableTreeDdata: [],
        pagelimit: {
          limit: 10,
          page: 1
        },
        params: {
          expression: "equals",
          func: "getStdInfAnalyse",
          limit: 15,
          method: "service",
          mpp_finish_end_tm: "",
          mpp_finish_start_tm: "",
          page: 1,
          rel_col_cnt: "",
          service: "infAnalyse",
          std_item_chn_nm: "",
          std_item_eng_nm: "",
          tenantId: '',
          captcha: "VUE",
        },
        cnt: 0,
        contReq: {
          expression: "gt",
          mpp_finish_end_tm: "",
          mpp_finish_start_tm: "",
          method: "findOne",
          qId: "infAnalyse.getStdInfAnalyseCnt",
          std_item_chn_nm: "",
          std_item_eng_nm: "",
          rel_col_cnt: "",
          tenantId: "",
          captcha: "VUE",
        }
      }
    },
    created() {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.params.tenantId = user.loginId
      this.contReq.tenantId = user.loginId
      this.findPage()
    },
    methods: {
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
        this.contReq.std_item_eng_nm = this.params.std_item_eng_nm
        this.contReq.expression = this.params.expression
        this.contReq.rel_col_cnt = this.params.rel_col_cnt
        this.contReq.mpp_finish_start_tm = this.params.mpp_finish_start_tm
        this.contReq.mpp_finish_end_tm = this.params.mpp_finish_end_tm
        console.log(params, this.contReq)
        let row = await this.$api.util.execAction(this.contReq)
        this.cnt = row.cnt ? row.cnt : this.tableTreeDdata.length
        this.loading = false
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagelimit.limit = val
        this.findPage()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
    },
  }
</script>

<style scoped="scoped">
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
