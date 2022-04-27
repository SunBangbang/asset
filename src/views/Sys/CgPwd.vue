<template>
    <!-- 修改密码界面 -->
    <el-dialog title="登录用户密码修改" width="30%" :visible.sync="cgpwdVisible" :close-on-click-modal="false" :modal-append-to-body='false'>
        <el-form :model="dataForm" label-width="100px" :rules="dataFormRules" ref="dataForm" :size="size"
            label-position="right">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input v-model="dataForm.oldpassword" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
                <el-input v-model="dataForm.newpassword" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="newpasswordend">
                <el-input v-model="dataForm.newpasswordend" type="password" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: 5px;">
            <el-button :size="size" @click.native="cgpwdVisible = false; $refs['dataForm'].resetFields();">{{$t('action.cancel')}}</el-button>
            <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie"
// import md5 from 'js-md5';
export default {
  data() {
    var validatePass = async (rule, value, callback) => {
    	if (value === '') {
        callback(new Error('请输入旧密码'));
    	} else {

        let user = JSON.parse(sessionStorage.getItem('user'));
        if(user){
          let params = {};
          params.method= "findOne"
          params.qId= "mypage.getOldPwd"
          params.tenantId = user.loginId;
          params.usr_id = user.usrId;

          await this.$api.util.execAction(params).then((res) => {
            if(res.success) {
              let oldPwd = res.row.lgin_pwd;
              // let oldpassword = md5(this.dataForm.oldpassword);
              if(oldPwd!=oldpassword){
                callback(new Error('旧密码错误'));
              }else{
               callback();
              }
            }else {
              callback(new Error('旧密码验证错误'));
            }
          })
        }else{
          this.deleteCookie('token')
          sessionStorage.removeItem("session")
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("menuTree")
          this.$router.push("/login")
        }

    	}
    };
    var validatePass1 = (rule, value, callback) => {
    	if (value === '') {
        callback(new Error('请输入新密码'));
    	} else if (value == this.dataForm.oldpassword) {
    	  callback(new Error('不能与旧密码一样'));
    	} else {
    	  callback();
    	}
    };
    var validatePass2 = (rule, value, callback) => {
    	if (value === '') {
        callback(new Error('请再次输入密码'));
    	} else if (value !== this.dataForm.newpassword) {
    	  callback(new Error('两次输入密码不一致'));
    	} else {
    	  callback();
    	}
    };
    return {
      size: 'small',
      cgpwdVisible: false, // 编辑界面是否显示
      editLoading: false,   //载入图标
      //初始化数据
      dataForm: {
                oldpassword: '',
                newpassword: '',
                newpasswordend: ''
      },
      //设置属性
      dataFormRules: {
        oldpassword: [
            { required: true, validator:validatePass, trigger: 'blur' }
        ],
        newpassword: [
            { required: true, validator:validatePass1, trigger: 'blur' }
        ],
        newpasswordend: [
            { required: true, validator:validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 删除cookie
    deleteCookie: function(name) {
        Cookies.remove(name)
    },
  　// 设置可见性
    setCgpwdVisible: function (cgpwdVisible) {
      this.cgpwdVisible = cgpwdVisible
    },
     // 提交请求
        　submitForm: function () {
          //this.$refs.XXX 获取ref绑定的节点
          this.$refs.dataForm.validate((valid) => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {}).then(() => {
                let user = JSON.parse(sessionStorage.getItem('user'));
                if(user){
                  let params = {};//Object.assign({}, this.dataForm)

                  params.method = "update";
                  params.qId = "mypage.updatePwd";
                  params.tenantId = user.loginId;
                  params.usr_id = user.usrId;
                  params.lgin_pwd = md5(this.dataForm.newpasswordend);
                  params.captcha = "VUE";

                  this.$api.util.execAction(params).then((res) => {
                    this.editLoading = true
                    if(res.success) {
                      this.$message({ message: '密码修改成功,请重新登录', type: 'success' })
                      this.cgpwdVisible = false       //隐藏该窗口

                      this.deleteCookie('token')
                      sessionStorage.removeItem("session")
                      sessionStorage.removeItem("user");
                      sessionStorage.removeItem("menuTree")
                      this.$router.push("/login")
                    } else {
                      this.$message({message: '操作失败, ' + res.error_message, type: 'error'})
                    }
                    this.editLoading = false
                    this.$refs['dataForm'].resetFields()    //重置表单
                  })
                }else{
                  this.deleteCookie('token')
                  sessionStorage.removeItem("session")
                  sessionStorage.removeItem("user");
                  sessionStorage.removeItem("menuTree")
                  this.$router.push("/login")
                }
              }).catch(() => {
                this.cgpwdVisible = false
                this.editLoading = false
                this.$refs['dataForm'].resetFields()    //重置表单
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              })
            }
          })
         }
      },
    //mounted： 在这发起后端请求，拿回数据，配合路由钩子做一些事情  （dom渲染完成 组件挂载完成 ）
      mounted() {

        }
    }
    </script>

    <style scoped>

    </style>
