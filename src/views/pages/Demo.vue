<template>
  <div class="page-container">
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
      	<el-form-item>
      		<el-input v-model="filters.name" placeholder="名称"></el-input>
      	</el-form-item>
      	<el-form-item>
      		<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dept:view" type="primary" @click="findTreeData(null)"/>
      	</el-form-item>
      	<el-form-item>
      		<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dept:add" type="primary" @click="handleAdd"/>
      	</el-form-item>
      </el-form>
    </div>
    <!--表格树内容栏-->
      <el-table :data="tableTreeDdata" stripe size="mini" style="width: 100%;"
        rowKey="id" v-loading="loading" element-loading-text="$t('action.loading')">
        <el-table-column
          prop="id" header-align="center" align="center" width="80" label="ID">
        </el-table-column>
        <el-table-column
          prop="name" header-align="center" align="center" width="200" label="订单名称">
        </el-table-column>
        <el-table-column
          prop="sum" header-align="center" align="center" width="200" label="订单金额" :formatter="sumFormat">
        </el-table-column>
        <el-table-column
          prop="orderCreator" header-align="center" align="center" width="200" label="订单创建人">
        </el-table-column>
        <el-table-column
          prop="createTime" header-align="center" align="center" label="创建时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          fixed="right" header-align="center" align="center" width="185" :label="$t('action.operation')">
          <template slot-scope="scope">
            <kt-button icon="fa fa-edit" :label="$t('action.edit')" perms="sys:dept:edit" @click="handleEdit(scope.row)"/>
            <kt-button icon="fa fa-trash" :label="$t('action.delete')" perms="sys:dept:delete" type="danger" @click="handleDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()"
        label-width="100px" :size="size" style="text-align:left;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="sum">
          <el-input v-model="dataForm.sum" placeholder="金额"></el-input>
        </el-form-item>
        <el-form-item label="订单创建人" prop="orderCreator">
          <el-input v-model="dataForm.orderCreator" placeholder="订单创建人"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size"  @click="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size"  type="primary" @click="submitForm()">{{$t('action.comfirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import KtButton from "@/views/Core/KtButton"
  import { format } from "@/utils/datetime"
  export default {
  	components:{
      KtButton,
  	},
  	data() {
  		return {
  			size: 'small',
  			filters: {
  				name: ''
        },
        loading: false,
        dialogVisible: false,
        tableTreeDdata:[],
        dataForm: {
          id: 0,
          name: '',
          sum: 0,
          orderCreator:''
        },
        dataRule: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          sum: [
            { required: true, message: '金额不能为空', trigger: 'blur' }
          ],
          orderCreator:[
            { required: true, message: '订单创建人不能为空', trigger: 'blur' }
          ]
        },
  		}
  	},
    created() {
      this.findTreeData()
    },
  	methods: {
      // 获取数据
      async findTreeData () {
        this.loading = true
      	let res = await this.$api.demo.demoList()
          console.log(res)
          this.tableTreeDdata = res.data
          this.loading = false
      },
      //弹窗的确认按钮
      submitForm(){
        console.log(this.dataForm)
        if(this.dataForm.id){//id存在为修改
          this.tableTreeDdata.forEach((item,index)=>{
            if(item.id === this.dataForm.id){
              this.$set(this.tableTreeDdata,index,this.dataForm)
            }
          })
        }else{//反之为新增
          this.dataForm.id = this.tableTreeDdata[this.tableTreeDdata.length-1].id + 1
          this.tableTreeDdata.push(this.dataForm)
        }
        this.dialogVisible = false
      },
      // 显示新增界面
      handleAdd () {
      	this.dialogVisible = true
      	this.dataForm = {
          id:0,
          name: '',
          sum: 0,
          orderCreator:'',
          createTime:new Date()
        }
      },
      // 显示修改界面
      handleEdit(e){
        let {id,name,sum,orderCreator,createTime} = e
        this.dataForm = {
          id,
          name,
          sum,
          orderCreator,
          createTime,
        }
        this.dialogVisible = true
      },
      //删除
      handleDelete(e){
        this.tableTreeDdata.forEach((item,index)=>{
          if(item.id == e.id){
            this.$delete(this.tableTreeDdata,index)
          }
        })
      },
  		// 时间格式化
      dateFormat (row, column, cellValue, index){
        return format(row[column.property])
      },
      //金额保留两位小数
      sumFormat(e,a){
        return (e.sum*1).toFixed(2) + '￥'
      }
  	},
  }
</script>

<style>
</style>
