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
              <el-input v-model="standardBasicInformation.std_item_desc" :disabled="true" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="指标业务口径">
              <el-input v-model="standardBasicInformation.targt_bus_calir" :disabled="true" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="指标统计规则">
              <el-input v-model="standardBasicInformation.curcy_targt_rul" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="flex justify-content">
            <el-form-item label="指标类型">
              <el-input v-model="standardBasicInformation.targt_typ" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="是否包含维度">
              <el-input v-model="standardBasicInformation.cd_val_hv_flg" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="是否报送监管">
              <el-input v-model="standardBasicInformation.repot_supvisn_yn" :disabled="true"></el-input>
            </el-form-item>
            </div>
          <div class="flex justify-content">
            <el-form-item label="指标统计频度">
              <el-input v-model="standardBasicInformation.targt_staticl_frequcy" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="度量单位">
              <el-input v-model="standardBasicInformation.mesr_unit" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="取值范围">
              <el-input v-model="standardBasicInformation.targt_fw" :disabled="true"></el-input>
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
    <div class="table_box">
      <div class="table_title">变更历史</div>
      <el-table :data="changeHistoryData" border stripe size="mini" style="width: 100%;" height="30vh" rowKey="id"
        v-loading="HistoryLoading" :element-loading-text="$t('action.loading')"
        :header-cell-style="{color: '#333',background:'#F5F6FA'}">
        <el-table-column prop="std_item_grp2" label="标准大类">
        </el-table-column>
        <el-table-column prop="std_item_grp2" label="标准子类">
        </el-table-column>
        <el-table-column prop="std_item_grp3" label="指标细类">
        </el-table-column>
        <el-table-column prop="std_item_chn_nm" label="标准中文名">
        </el-table-column>
        <el-table-column prop="std_item_eng_nm" label="标准英文名">
        </el-table-column>
        <el-table-column prop="std_item_desc" label="业务含义" min-width="300">
        </el-table-column>
        <el-table-column prop="rles_tm_format" label="版本日期" :formatter="dateFormat" min-width="150">
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
  //   changeHistory,
  //   standardBasicInformation
  // } from './TargtStdJs.js'
  import {
    format
  } from "@/utils/datetime"
  export default {
    props:{
      dialogVisible:{
        type:Boolean,
        default:false
      },
      val:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        DetailsLoading: false,
        HistoryLoading: false,
        changeHistoryData: [], //弹框变更历史
        standardBasicInformation: {}, //标准基本信息
        HistoryCnt:0,
        pageRequest: {
          tenantId:'',
        },
        pagelimit:{
          limit:10,
          page:1
        },
        pagelimit1:{
          limit:10,
          page:1
        },
        pagelimit2:{
          limit:10,
          page:1
        }
      }
    },
    watch:{
      dialogVisible(newVal){
        if(newVal){
          let user = JSON.parse(sessionStorage.getItem('user'))
          this.pageRequest.tenantId = user.loginId
          this.standardBasicInformationReq()// 标准基本信息
          this.changeHistoryReq()//请求更变历史
        }else{
          this.changeHistoryData= []//弹框变更历史
          this.standardBasicInformation= {} //标准基本信息
        }
      }
    },
    methods:{
      closeDialog(){
        this.$emit('dialogVisible')
      },
      //标准基本信息
      async standardBasicInformationReq(){
        let params = {
          disabld_tm: "99999999999999",
          func: "getTargtInfo",
          method: "service",
          service: "targt",
          std_item_id: this.val,
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        let {data: res} = await this.$api.util.execAction(params)
        // if (!res.info) res.info = standardBasicInformation.data.info
        res.info.cd_val_hv_flg = res.info.cd_val_hv_flg  == 'Y' ? '是' : '否'
        res.info.repot_supvisn_yn = res.info.repot_supvisn_yn  == 'Y' ? '是' : '否'
        this.standardBasicInformation = res.info
      },
      //弹框变更历史
      async changeHistoryReq(){
        this.HistoryLoading = true
        let params = {
          func: "getTargtHis",
          limit: 10,
          method: "service",
          page: 1,
          service: "targt",
          std_item_id: this.val,
          tenantId: this.pageRequest.tenantId,
          captcha: "VUE",
        }
        params = {...params,...this.pagelimit2}
        let {data: res} = await this.$api.util.execAction(params)
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
        this.HistoryCnt = row.cnt?row.cnt:res.rsList.length
        this.HistoryLoading = false
      },
      //变更历史分页
      handleSizeChange2(val) {
        this.pagelimit2.limit = val
        this.changeHistoryReq()
      },
      handleCurrentChange2(val) {
        this.pagelimit2.page = val
        this.changeHistoryReq()
      },
      dateFormat(row, column, cellValue, index) {
        return format(row[column.property])
      },
      collected(row, column) {
        return row['collected_if'] == 'Y' ? '是' : '否'
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
    >>>.el-form-item--mini.el-form-item, >>>.el-form-item--small.el-form-item{
      margin-bottom: 10px!important;
    }
    .justify-content {
      justify-content: space-between;
    }
    .el-input.is-disabled >>>.el-input__inner,
    .el-textarea.is-disabled >>>.el-textarea__inner{
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
    .el-scrollbar >>>.el-scrollbar__wrap {
      overflow-x: hidden;
    }
</style>
