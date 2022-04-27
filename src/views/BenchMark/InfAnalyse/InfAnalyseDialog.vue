<template>
  <el-dialog width="95%" :visible.sync="dialogVisible" :close-on-click-modal="false" :before-close="closeDialog">
    <el-scrollbar style="height:100%">
      <div class="table_box">
        <div class="table_title">标准基本信息</div>
        <div style="padding: 20px;">
          <el-form :inline="true" label-width="170px" size="small">
            <div class="flex justify-content">
              <el-form-item label="标准分类">
                <el-input v-model="standardBasicInformation.std_item_grp_nm_path" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="标准编号">
                <el-input v-model="standardBasicInformation.aprv_org_nm_arr" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="标准主管部门">
                <el-input v-model="standardBasicInformation.aprv_org_nm_arr" :disabled="true"></el-input>
              </el-form-item>
            </div>
            <div class="flex justify-content">
              <el-form-item label="标准中文名">
                <el-input v-model="standardBasicInformation.std_item_chn_nm" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="标准英文名">
                <el-input v-model="standardBasicInformation.std_item_eng_nm" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="标准别名">
                <el-input v-model="standardBasicInformation.std_item_eng_abbr" :disabled="true"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="业务含义">
                <el-input v-model="standardBasicInformation.biz_mean" :disabled="true" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="标准业务规则">
                <el-input v-model="standardBasicInformation.std_bus_rul" :disabled="true" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="制定依据">
                <el-input v-model="standardBasicInformation.std_item_chn_nm" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="相关标准">
                <el-input v-model="standardBasicInformation.rltd_std" :disabled="true"></el-input>
              </el-form-item>
            </div>
            <div class="flex justify-content">
              <el-form-item label="取值范围">
                <el-input v-model="standardBasicInformation.range_value" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="度量单位">
                <el-input v-model="standardBasicInformation.mesr_unit" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="敏感度">
                <el-input v-model="standardBasicInformation.senty" :disabled="true"></el-input>
              </el-form-item>
            </div>
            <div class="flex justify-content">
              <el-form-item label="数据类型">
                <el-input v-model="standardBasicInformation.biz_dttyp_nm" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="数据长度">
                <el-input v-model="standardBasicInformation.dt_len" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="数据精度">
                <el-input v-model="standardBasicInformation.prcsn" :disabled="true"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="table_box" v-if="codeValList.length > 0">
        <div class="table_title">码值列表</div>
        <el-table :data="codeValList" border stripe size="mini" style="width: 100%;" height="20vh" rowKey="id"
          v-loading="codeValListLoading" :element-loading-text="$t('action.loading')"
          :header-cell-style="{color: '#333',background:'#F5F6FA'}">
          <el-table-column prop="rnum" label="序号" min-width="80">
          </el-table-column>
          <el-table-column prop="std_cd_val" label="	代码值">
          </el-table-column>
          <el-table-column prop="std_cd_val_mean" label="	代码含义">
          </el-table-column>
          <el-table-column prop="rles_vrsn" label="	备注">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="4"
            :page-sizes="[10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
            :total="codeValListCnt">
          </el-pagination>
        </div>
      </div>
      <div class="flex">
        <div class="table_box">
          <div class="table_title">标准引用详情</div>
          <el-table :data="ReferDetails" border stripe size="mini" style="width: 100%;" height="30vh" rowKey="id"
            v-loading="DetailsLoading" :element-loading-text="$t('action.loading')"
            :header-cell-style="{color: '#333',background:'#F5F6FA'}">
            <el-table-column prop="rnum" label="序号" min-width="80">
            </el-table-column>
            <el-table-column prop="sys_nm" label="	系统名称">
            </el-table-column>
            <el-table-column prop="tab_nm" label="	表中文名">
            </el-table-column>
            <el-table-column prop="col_nm" label="	字段中文名">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="4"
              :page-sizes="[10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
              :total="ReferDetailsCnt">
            </el-pagination>
          </div>
        </div>
        <div class="table_box" v-if="dialogVisible">
          <div class="table_title">标准引用占比</div>
          <EchartsPie :echartsData="echartsData"></EchartsPie>
        </div>
      </div>
      <div class="table_box">
        <div class="table_title">变更历史</div>
        <el-table :data="changeHistoryData" border stripe size="mini" style="width: 100%;" height="30vh" rowKey="id"
          v-loading="HistoryLoading" :element-loading-text="$t('action.loading')"
          :header-cell-style="{color: '#333',background:'#F5F6FA'}">
          <el-table-column prop="std_item_grp1" label="标准主题">
          </el-table-column>
          <el-table-column prop="std_item_grp2" label="标准大类">
          </el-table-column>
          <el-table-column prop="std_item_grp3" label="标准子类">
          </el-table-column>
          <el-table-column prop="std_item_grp4" label="标准细类">
          </el-table-column>
          <el-table-column prop="std_item_chn_nm" label="标准中文名">
          </el-table-column>
          <el-table-column prop="std_item_eng_nm" label="标准英文名">
          </el-table-column>
          <el-table-column prop="biz_dttyp_nm" label="数据类型">
          </el-table-column>
          <el-table-column prop="dt_len" label="长度(精度)">
          </el-table-column>
          <el-table-column prop="biz_mean" label="业务含义" min-width="300">
          </el-table-column>
          <el-table-column prop="rles_tm_format" label="版本日期" :formatter="dateFormat" width="150">
          </el-table-column>
          <el-table-column prop="rles_vrsn" label="版本号">
          </el-table-column>
          <el-table-column prop="vrsn" label="发布版本号">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="4"
            :page-sizes="[10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
            :total="HistoryCnt">
          </el-pagination>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
  // import { //模拟数据
  //   standardBasicInformation,
  //   codeValList,
  //   changeHistory,
  //   ReferDetails,
  //   echartsData
  // } from './InfAnalyseJs.js'
  import {
    format
  } from "@/utils/datetime"
  import EchartsPie from './EchartsPie.vue'
  export default {
    components:{
      EchartsPie,
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      val: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        codeValListLoading: false,
        DetailsLoading: false,
        HistoryLoading: false,
        changeHistoryData: [], //弹框变更历史
        codeValList: [], //弹框码值列表
        ReferDetails: [], //弹窗标准引用详情
        standardBasicInformation: {}, //标准基本信息
        HistoryCnt: 0,
        echartsData:[],//扇形图数据
        ReferDetailsCnt: 0,
        codeValListCnt: 0,
        pageRequest: {
          tenantId: '',
        },
        pagelimit: {
          limit: 10,
          page: 1
        },
        pagelimit1: {
          limit: 10,
          page: 1
        },
        pagelimit2: {
          limit: 10,
          page: 1
        }
      }
    },
    watch: {
      dialogVisible(newVal) {
        if (newVal) {
          let user = JSON.parse(sessionStorage.getItem('user'))
          this.pageRequest.tenantId = user.loginId
          this.standardBasicInformationReq() // 标准基本信息
          this.changeHistoryReq() //请求更变历史
          this.ReferDetailsReq() // 标准引用详情
          this.codeValListReq() //请求代码值
          this.echartsReq()
        } else {
          this.changeHistoryData = [] //弹框变更历史
          this.codeValList = [] //弹框码值列表
          this.ReferDetails = [] //弹窗标准引用详情
          this.standardBasicInformation = {} //标准基本信息
           this.echartsData = []
        }
      }
    },
    methods: {
      closeDialog() {
        this.$emit('dialogVisible')
      },
      //扇形图赋值
      async echartsReq(){
        let params = {
          func: "stdRound",
          method: "service",
          service: "stdTermBus",
          std_item_id: this.val,
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        let {data: res} = await this.$api.util.execAction(params)
        // if (!res.data) res = echartsData.data
        this.echartsData = res
      },
      //标准基本信息
      async standardBasicInformationReq() {
        let params = {
          disabld_tm: "99999999999999",
          func: "getTermInfo",
          method: "service",
          service: "stdTermBus",
          std_item_id: this.val,
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        let {
          data: res
        } = await this.$api.util.execAction(params)
        // if (!res.info) res.info = standardBasicInformation.data.info
        this.standardBasicInformation = res.info
      },
      //请求代码值
      async codeValListReq(pagelimit) {
        this.codeValListLoading = true
        let params = {
          disabld_tm: "99999999999999",
          func: "getRelCode",
          limit: 10,
          method: "service",
          page: 1,
          service: "stdTermBus",
          std_item_id: this.val,
          std_item_rel_typ: "3003",
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        params = {
          ...params,
          ...this.pagelimit
        }
        let {
          data: res
        } = await this.$api.util.execAction(params)
        // if (!res.codeValList) res.codeValList = codeValList.data.codeValList
        this.codeValList = res.codeValList
        this.codeValListCnt = res.cnt ? res.cnt : res.codeValList.length
        this.codeValListLoading = false
      },
      //标准引用详情
      async ReferDetailsReq() {
        this.DetailsLoading = true
        let params = {
          func: "stdQuote",
          limit: 10,
          method: "service",
          page: 1,
          service: "stdTermBus",
          std_item_id: this.val,
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        console.log(1)
        params = {
          ...params,
          ...this.pagelimit1
        }
        let res = await this.$api.util.execAction(params)
        // if (!res.data.length) res.data = ReferDetails.data
        this.ReferDetails = res.data
        let paramsC = {
          method: "findOne",
          qId: "trmBus.countStdQuote",
          std_item_id: this.val,
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        let row = await this.$api.util.execAction(paramsC)
        this.ReferDetailsCnt = row.cnt ? row.cnt : res.data.length
        this.DetailsLoading = false
      },
      //弹框变更历史
      async changeHistoryReq() {
        this.HistoryLoading = true
        let params = {
          func: "getTermHis",
          limit: 10,
          method: "service",
          page: 1,
          service: "stdTermBus",
          std_item_id: this.val,
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        params = {
          ...params,
          ...this.pagelimit2
        }
        let {
          data: res
        } = await this.$api.util.execAction(params)
        // if (!res.rsList) res.rsList = changeHistory.data.rsList
        this.changeHistoryData = res.rsList
        let paramsC = {
          method: "findOne",
          qId: "trmBus.getTermHisCnt",
          std_item_id: this.val,
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        let row = await this.$api.util.execAction(params)
        this.HistoryCnt = row.cnt ? row.cnt : res.rsList.length
        this.HistoryLoading = false
      },
      //码值列表分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagelimit.limit = val
        this.codeValListReq()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagelimit.page = val
        this.codeValListReq()
      },
      //标准引用详情分页
      handleSizeChange1(val) {
        console.log(`每页 ${val} 条`);
        this.pagelimit1.limit = val
        this.ReferDetailsReq()
      },
      handleCurrentChange1(val) {
        console.log(`当前页: ${val}`);
        this.pagelimit1.page = val
        this.ReferDetailsReq()
      },
      //变更历史分页
      handleSizeChange2(val) {
        console.log(`每页 ${val} 条`);
        this.pagelimit2.limit = val
        this.changeHistoryReq()
      },
      handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
        this.pagelimit2.page = val
        this.changeHistoryReq()
      },
      dateFormat(row, column, cellValue, index) {
        return format(row[column.property])
      },
    }
  }
</script>

<style scoped="scoped">
  >>>.el-dialog {
    margin: 30px auto !important;
  }

  >>>.el-dialog__body {
    margin-top: 10px !important;
    height: 80vh;
    overflow: auto;
    padding: 0 !important;
  }

  .el-dialog__body .el-form--inline>>>.el-form-item__content {
    flex: 1 !important;
  }

  .el-dialog__body .el-form--inline>>>.el-form-item {
    display: flex !important;
    flex: 1 !important;
  }

  >>>.el-form-item--mini.el-form-item,
  >>>.el-form-item--small.el-form-item {
    margin-bottom: 10px !important;
  }

  .justify-content {
    justify-content: space-between;
  }

  .el-input.is-disabled>>>.el-input__inner,
  .el-textarea.is-disabled>>>.el-textarea__inner {
    color: #606266;
  }

  .flex {
    display: flex;
  }

  .table_box {
    flex: 1;
    border: 1px solid #dee2e6;
    margin: 15px;
  }

  .table_title {
    padding: 15px;
    text-align: left;
    background-color: #F4F5F9;
    border-left: 3px solid #28A79A;
    font-size: 14px;
  }

  .el-scrollbar>>>.el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
