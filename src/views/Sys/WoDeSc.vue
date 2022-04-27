<template>
<el-dialog append-to-body width="80%" :visible.sync="pageVisible" :close-on-click-modal="false" :modal-append-to-body='false'>
  <div class="hrBarRight"></div>
  <div class="boxHeader">
    <h5 style="margin: 0px;">我的收藏</h5>
  </div>
  <div>
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-select v-model="filters.std_item_grp_typ" placeholder="标准项类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.std_item_chn_nm" placeholder="中文名称" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.std_item_eng_nm" placeholder="英文名称" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="fa fa-search" type="primary" @click="findPage(null)">
          查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格栏-->
    <el-table :data="pageResult.rows" :highlight-current-row="true"
          v-loading="loading" :element-loading-text="$t('action.loading')" :border="false" :stripe="true"
          :show-overflow-tooltip="true"  :max-height="maxHeight" :height="height" :size="size" :align="align" style="width:100%;" >
      <el-table-column v-for="column in columns" :header-align="headerAlign" :align="align"
        v-if="column.prop=='id'?false:true"
        :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
        :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
        :sortable="column.sortable==null?true:column.sortable">
        <template slot-scope="scope">
          <span v-if="column.prop=='std_item_grp_typ'">{{
            scope.row[column.prop] == 'TG'?'基础标准':(scope.row[column.prop] == 'I'?'指标标准':(scope.row[column.prop] == 'TN'?'技术标准':scope.row[column.prop]))
          }}</span>
          <span v-if="column.prop!='std_item_grp_typ'">{{scope.row[column.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px;">
      <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPageRequest"
        :current-page="pageRequest.page" :page-size="pageRequest.limit" :total="pageResult.totalSize" style="float:right;">
      </el-pagination>
    </div>
  </div>
</el-dialog>
</template>

<script>
  import KtButton from "@/views/Core/KtButton"
  import PopupTreeInput from "@/components/PopupTreeInput"
  import {
    formatDept,guid
  } from "@/utils/validate"

  export default {
    components:{
    		KtButton,
        PopupTreeInput
    },
    data() {
      return {
        options: [{
            value: '',
            label: '全部'
          }, {
            value: 'TG',
            label: '基础标准'
          }, {
            value: 'I',
            label: '指标标准'
          }, {
            value: 'TN',
            label: '技术标准'
        }],
        routeCurt: '',
        maxHeight: 300,
        height: 280,
        size: 'mini',
        align: 'left',
        headerAlign: 'left',
        pageVisible: false,
        loading: false,
        pageRequest: {
          page: 1,
          limit: 10
        },
        pageResult: {},
        columns: [],
        filters: {
          std_item_grp_typ: '',
          std_item_chn_nm: '',
          std_item_eng_nm: ''
        }
      }
    },
    methods: {
      findPage: function() {
        this.loading = true
        this.pageRequest.method = "find"
        this.pageRequest.qId = "trmBus.getStdCollect"
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.pageRequest.tenantId = user.loginId
        this.pageRequest.captcha = "VUE";
        this.pageRequest.del_if = "N"

        this.pageRequest.std_item_grp_typ = this.filters.std_item_grp_typ
        this.pageRequest.std_item_chn_nm = this.filters.std_item_chn_nm
        this.pageRequest.std_item_eng_nm = this.filters.std_item_eng_nm

        this.$api.util.execAction(this.pageRequest).then((res) => {
          this.pageRequest.method = "findOne"
          this.pageRequest.qId = "trmBus.getStdCollectCnt"
          this.$api.util.execAction(this.pageRequest).then((resp) => {
            res.totalSize = resp.row.cnt
            this.pageResult = res
          })
        }).then((res) =>{
          this.loading = false
        }) 
      },
      setPageVisible: function (pageVisible) {
        this.pageVisible = pageVisible
        this.findPage()
      },
      refreshPageRequest: function (pageNum) {
        this.pageRequest.page = pageNum
        this.findPage()
      },
      initColumns: function() {
        this.columns = [
          {
            prop: "rnum",
            label: "序号",
            minWidth: 50
          },
          {
            prop: "std_item_grp_typ",
            label: "标准项类型",
            minWidth: 80
          },
          {
            prop: "std_item_chn_nm",
            label: "标准项中文名称",
            minWidth: 80
          },
          {
            prop: "std_item_eng_nm",
            label: "标准项英文名称",
            minWidth: 80
          },
          {
            prop: "vrsn_num",
            label: "版本号",
            minWidth: 80
          },
          {
            prop: "create_tm",
            label: "创建时间",
            minWidth: 80
          }
        ]
      }
    },
    mounted() {
      this.initColumns();
      this.routeCurt = this.$router.currentRoute.meta.index;
    }
  }
</script>

<style>
  .hrBarRight{
    border-bottom: 1px solid #E1E6EB;
    width: 100%;
  }
  .boxHeader{
    line-height: 36px;
    color: #666;
    text-align: left;
    margin-bottom: 0px !important;
    background-color: #f4f5f9;
    border-left: 2px solid #28a79a;
    border-top: 1px solid #E1E6EB;
    border-right: 1px solid #E1E6EB;
    margin-top: 5px;
    padding-left: 15px;
  }
  .tableRight{
    width: 100%;
    border: 1px solid #E1E6EB;
    border-collapse:collapse;
  }
  .tableRight td {
    border: 1px solid #E1E6EB;
    border-collapse:collapse;
    line-height: 30px;
    font-size: 12px;
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
  }
  .tdLeft{
    font-weight: 600;
    color: #999;
  }
</style>
