<template>
  <div class="page-container">
    <!-- 顶部搜索区 -->
    <div class="toolbar" style="text-align: left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入计划编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入计划名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入申请人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="请输入申请机构"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请选择提升计划启动日期" style="width: 200px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.name" type="datetime" placeholder="申请开始时间" style="width: 200px">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.name" type="datetime" placeholder="申请结束时间" style="width: 200px">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请选择审批状态" style="width: 200px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dept:view" type="primary"
            @click="findTreeData(null)" />
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dept:add" type="primary"
            @click="handleAdd" />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div class="table_title">提升作业计划列表
      </div>
      <!--表格树内容栏-->
      <el-table :data="tableTreeDdata" border stripe size="mini" style="width: 100%;" height="55vh" rowKey="id"
        v-loading="loading" element-loading-text="$t('action.loading')"
        :header-cell-style="{color: '#000',background:'#F5F6FA'}">
        <el-table-column prop="id" header-align="center" align="center" label="序号">
        </el-table-column>
        <el-table-column prop="project_number" header-align="center" align="center" label="计划编号">
        </el-table-column>
        <el-table-column prop="project_name" header-align="center" align="center" label="计划名称">
        </el-table-column>
        <el-table-column prop="apply_date" header-align="center" align="center" label="申请时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="examine_date" header-align="center" align="center" label="审批时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="Role_to_be_approved" header-align="center" align="center" label="待审批角色">
        </el-table-column>
        <el-table-column prop="applicant_organisation" header-align="center" align="center" label="申请机构">
        </el-table-column>
        <el-table-column prop="applicant" header-align="center" align="center" label="申请人">
        </el-table-column>
        <el-table-column prop="problem_impact_degree" header-align="center" align="center" label="问题影响程度">
        </el-table-column>
        <el-table-column prop="Start_date_of_upgrade_plan" header-align="center" align="center" label="提升计划启动日期">
        </el-table-column>
        <el-table-column prop="approval_status" header-align="center" align="center" label="审批状态"
          :formatter="approvalStatus">
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="200" :label="$t('action.operation')">
          <template slot-scope="scope">
            <kt-button icon="fa fa-edit" :label="$t('action.edit')" perms="sys:dept:edit"
              @click="handleEdit(scope.row)" />
            <kt-button icon="fa fa-trash" :label="$t('action.delete')" perms="sys:dept:delete" type="danger"
              @click="handleDelete(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="!dataForm.id ? '新增提升计划' : '修改提升计划'" width="45%" :visible.sync="dialogVisible"
      :close-on-click-modal="false">
      <div style="padding: 0 30px;">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()"
          label-width="170px" :size="size" style="text-align:left;">
          <el-form-item label="计划名称" prop="project_name">
            <el-input v-model="dataForm.project_name" placeholder="请输入计划名称"></el-input>
          </el-form-item>
          <div style="display: flex;justify-content: space-between;">
            <el-form-item label="申请机构" prop="applicant_organisation">
              <el-input v-model="dataForm.applicant_organisation" placeholder="申请机构" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="申请人" prop="applicant">
              <el-input v-model="dataForm.applicant" placeholder="申请人" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div style="display: flex;justify-content: space-between;">
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model="dataForm.phone" placeholder="联系方式"></el-input>
            </el-form-item>
            <el-form-item label="申请时间" prop="apply_date">
              <el-input v-model="dataForm.apply_date" placeholder="申请时间" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="数据质量问题出现系统" prop="problems_of_system">
            <el-input v-model="dataForm.problems_of_system" placeholder="数据质量问题出现系统"></el-input>
          </el-form-item>
          <el-form-item label="数据质量问题描述(现象及影响)" prop="problem_description">
            <el-input type="textarea" v-model="dataForm.problem_description" placeholder="数据质量问题描述"></el-input>
          </el-form-item>
          <el-form-item label="数据质量问题提升需求(范围/条件/完成时间)" prop="Boost_demand">
            <el-input type="textarea" v-model="dataForm.Boost_demand" placeholder="数据质量问题提升需求"></el-input>
          </el-form-item>
          <el-form-item label="问题影响程度" prop="problem_impact_degree">
            <el-select v-model="dataForm.problem_impact_degree" placeholder="问题影响程度" style="width: 100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提升计划启动日期" prop="Start_date_of_upgrade_plan">
            <el-select v-model="dataForm.Start_date_of_upgrade_plan" placeholder="请选择提升计划启动日期" style="width: 100%">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :size="size" @click="dialogVisible = false">返回</el-button>
          <el-button :size="size" type="primary" @click="submitForm()">申请</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 底部页码 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 15, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
        :total="tableTreeDdata.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import KtButton from "@/views/Core/KtButton"
  import {
    format
  } from "@/utils/datetime"
  export default {
    components: {
      KtButton,
    },
    data() {
      return {
        currentPage4: 4,
        size: 'small',
        filters: {
          project_number: '',
          project_name: '',
          applicant:'',
          applicant_organisation:'',
          name:''
        },
        loading: false,
        dialogVisible: false,
        tableTreeDdata: [],
        dataForm: {
          id: 0,
          phone: '',
          project_number: '',
          project_name: '',
          apply_date: '',
          examine_date: '',
          Role_to_be_approved: '',
          applicant_organisation: '',
          applicant: '',
          problem_impact_degree: '',
          Start_date_of_upgrade_plan: '',
          approval_status: '0',
          problems_of_system: '',
          problem_description: '',
          Boost_demand: '',
        },
        dataRule: {
          phone:  [{
            required: true,
            message: '联系方式不能为空',
            trigger: 'blur'
          }],
          project_number: [{
            required: true,
            message: '计划编号不能为空',
            trigger: 'blur'
          }],
          project_name:  [{
            required: true,
            message: '计划名称不能为空',
            trigger: 'blur'
          }],
          apply_date:  [{
            required: true,
            message: '申请时间不能为空',
            trigger: 'blur'
          }],
          examine_date:  [{
            required: true,
            message: '审批时间不能为空',
            trigger: 'blur'
          }],
          Role_to_be_approved:  [{
            required: true,
            message: '待审批角色不能为空',
            trigger: 'blur'
          }],
          applicant_organisation:  [{
            required: true,
            message: '申请机构不能为空',
            trigger: 'blur'
          }],
          applicant:  [{
            required: true,
            message: '申请人不能为空',
            trigger: 'blur'
          }],
          problem_impact_degree:  [{
            required: true,
            message: '问题影响程度不能为空',
            trigger: 'blur'
          }],
          Start_date_of_upgrade_plan: [{
            required: true,
            message: '请选择提升计划启动日期不能为空',
            trigger: 'blur'
          }],
          approval_status:  [{
            required: true,
            message: '审批状态不能为空',
            trigger: 'blur'
          }],
          problems_of_system:  [{
            required: true,
            message: '数据质量问题出现系统不能为空',
            trigger: 'blur'
          }],
          problem_description: [{
            required: true,
            message: '数据质量问题描述不能为空',
            trigger: 'blur'
          }],
          Boost_demand:  [{
            required: true,
            message: '数据质量问题提升需求不能为空',
            trigger: 'blur'
          }],
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    created() {
      this.findTreeData()
    },
    watch: {
      dialogVisible(newValue) {
        if (newValue) {
          this.$nextTick(() => {
            this.$refs.dataForm.clearValidate();
          })
        }
      }
    },
    methods: {
      // 获取数据
      async findTreeData() {
        this.loading = true
        let res = await this.$api.demo.PlanList()
        console.log(res)
        this.tableTreeDdata = res.data
        this.loading = false
      },
      //弹窗的确认按钮
      submitForm() {
        console.log(this.dataForm)
        if (this.dataForm.id) { //id存在为修改
          this.tableTreeDdata.forEach((item, index) => {
            if (item.id === this.dataForm.id) {
              this.$set(this.tableTreeDdata, index, this.dataForm)
            }
          })
        } else { //反之为新增
          this.dataForm.id = this.tableTreeDdata[this.tableTreeDdata.length - 1].id + 1
          this.tableTreeDdata.push(this.dataForm)
        }
        this.dialogVisible = false
      },
      // 显示新增界面
      handleAdd() {
        this.dialogVisible = true
        this.dataForm = {
          id: 0,
          phone: '',
          project_number: '',
          project_name: '',
          apply_date: format(new Date()),
          examine_date: '',
          Role_to_be_approved: '',
          applicant_organisation: '南京银行',
          applicant: '超级管理员',
          problem_impact_degree: '',
          Start_date_of_upgrade_plan: '',
          approval_status: '0',
          problems_of_system: '',
          problem_description: '',
          Boost_demand: '',
        }
      },
      // 显示修改界面
      handleEdit(e) {
        let {
          id,
          phone,
          project_number,
          project_name,
          apply_date,
          examine_date,
          Role_to_be_approved,
          applicant_organisation,
          applicant,
          problem_impact_degree,
          Start_date_of_upgrade_plan,
          approval_status,
          problems_of_system,
          problem_description,
          Boost_demand,
        } = e
        this.dataForm = {
          id,
          phone,
          project_number,
          project_name,
          apply_date,
          examine_date,
          Role_to_be_approved,
          applicant_organisation,
          applicant,
          problem_impact_degree,
          Start_date_of_upgrade_plan,
          approval_status,
          problems_of_system,
          problem_description,
          Boost_demand,
        }
        this.dialogVisible = true
      },
      //删除
      handleDelete(e) {
        this.tableTreeDdata.forEach((item, index) => {
          if (item.id == e.id) {
            this.$delete(this.tableTreeDdata, index)
          }
        })
      },
      // 时间格式化
      dateFormat(row, column, cellValue, index) {
        return format(row[column.property])
      },
      //金额保留两位小数
      sumFormat(e) {
        return (e.sum * 1).toFixed(2) + '￥'
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      approvalStatus(e) {
        return e.approval_status == 0 ? '未审核' : '已审核'
      }
    },
  }
</script>

<style scoped="scoped">
  .table_title {
    padding: 15px;
    text-align: left;
    background-color: #F4F5F9;
    border-left: 4px solid #28A79A;
    font-size: 14px;
  }
  .block{
    margin-top: 10px;
  }
</style>
