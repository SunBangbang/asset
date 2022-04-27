<template>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto div-mid justify-content-center" id="login-form">
    		<div class="row justify-content-center" id="background-content">
    			<div class="col-5" id="leftCard" style="padding: 0px;text-align: center">
    				<img id="loginImg" src="../assets/images/p.png">
    				<div id="greetCard" style="margin-top: 100px">
    					<div style="width: 28.125rem;">
    						<div>
    							欢迎来到恩核数据资产管理平台
    						</div>
    					</div>
    				</div>
    				<div style="margin-top: 130px">
    					<div style="color: white;">
    						WELCOME TO ENHE
    					</div>
    					<div style="z-index: 0; color: white;">
    						DATA MANAGEMENT PLATFORM
    					</div>
    				</div>
    			</div>
    			<div class="col-1">
    			</div>
    			<div class="col-6" style="">
              <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="form-horizontal"
              autocomplete="on"
              label-position="left"
              >
    					<div class="" style="margin-top: 26%; margin-left: 45px; width: 310px;">
    						<img id="cardImg" src="../assets/images/logo.png">
    						<div class="">
    							<div class="form-group">
    								<div class="input-group">
    									<div class="input-group-append">
    										<span class="input-group-text" style="background-color: #eef2f5; border:none;"><img src="../assets/images/zhanghao.png"></span>
    									</div>
    									<el-input
                        ref="phone"
                        placeholder="请输入登入账号"
                        name="phone"
                        type="text"
                        v-model="loginForm.phone"
                        tabindex="1"
                        autocomplete="on"
                        class="form-control el-input-inner">
                      </el-input>
                    </div>
    							</div>
    							<div class="form-group">
    								<div class="input-group">
    									<div class="input-group-append">
    										<span class="input-group-text" style="background-color: #eef2f5; border:none;"><img src="../assets/images/mima.png"></span>
    									</div>
                      <el-input
                        ref="password"
                        placeholder="请输入登入密码"
                        type="password"
                        v-model="loginForm.password"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        class="form-control el-input-inner">
                      </el-input>
                    </div>
    							</div>
    							<div class="form-group" style="margin-bottom: 18px;">
                    <el-button type="primary" id="submitBtn" class="btn btn-primary" style="background-color: #2787eb" @click.native.prevent="pwdLogin"><p id="submitText">登 录</p></el-button>
    							</div>
    						</div>
    						<!--<div class="row justify-content-center">
    							<p style="margin: 10px 0px 0px 0px;font-size: 12px;color: #000000; font-family: MicrosoftYaHei";>用户号为7位员工号，初始密码为123456</p>
    							<p style="font-size: 12px;color: #000000; font-family: MicrosoftYaHei">推荐使用谷歌浏览器(60以上版本)
    								<a style="margin: 15px 0px 0px 0px;font-size: 12px;color: red; font-family: MicrosoftYaHei" href="JavaScript:download();">点击下载</a>
    							</p>
    						</div>-->
    					</div>
    				</el-form>
    			</div>
    		</div>
    	</div>
</template>

<script>
import { mapState } from 'vuex'
import Cookies from "js-cookie"
import { validPhone } from '@/utils/validate'
import { validLoginPwd } from '@/utils/validate'
  export default {
    name: 'login',
    data(){
      const validPhoneResult = (rule, value, callback) => {
        if (!validPhone(value)) {
          callback(new Error('手机号格式不正确'))
        } else {
          callback()
        }
      }
       const validatePasswordResult = (rule, value, callback) => {
         if (!validLoginPwd(value)) {
           callback(new Error('密码位数应大于等于6位'))
         } else {
           callback()
         }
      }
      return{
        requestUrl : '',
        activeName:"first",
        loginForm: {
          phone: '',
          password: ''
        },
        codeLoginForm:{
          phone:'',
          typeCode:'3',
          code:''
        },
        loginRules: {
           phone: [{ required: true, trigger: 'blur', validator: validPhoneResult }],
           password: [{ required: true, trigger: 'blur', validator: validatePasswordResult }]
        },
        remeberChecked:false,
        redirect: undefined,
        vcodeDisabled:false,
        btnText:'获取验证码'
      }
    },
  methods: {
    pwdLogin() {
      this.loading = true
      let userInfo = {account:this.loginForm.phone, password:this.loginForm.password, captcha:this.loginForm.captcha}

      Cookies.set('token', 'res.data.token') // 放置token到Cookie
      sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
      this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
      this.$router.push('/')  // 登录成功，跳转到主页
      this.loading = false


      /* this.$api.login.login(userInfo).then((res) => {
          if(res.msg != null) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          } else {
            Cookies.set('token', res.data.token) // 放置token到Cookie
            sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
            this.$router.push('/')  // 登录成功，跳转到主页
          }
          this.loading = false
        }).catch((res) => {
          this.$message({
          message: res.message,
          type: 'error'
          })
        }); */
    },
    // 切换主题
    onThemeChange: function(themeColor) {
      this.$store.commit('setThemeColor', themeColor)
    }
  },
  mounted() {

  },
  computed:{
    ...mapState({
      themeColor: state=>state.app.themeColor
    })
  }
}
</script>

<style scoped lang="less">
  .cover-container{    width:100%;    height:100%;    background-color: #eff5ff;
    background-size:cover;  }
  .div-mid {
      align-items: center;
      display: flex;
  }
  .ml-auto, .mx-auto {
      margin-left: auto!important;
  }
  .mr-auto, .mx-auto {
      margin-right: auto!important;
  }
 /* .p-3 {
      padding: 1rem!important;
  } */
  .h-100 {
      height: 100%!important;
  }
  .w-100 {
      width: 100%!important;
  }
  .justify-content-center {
      -ms-flex-pack: center!important;
      justify-content: center!important;
  }
  .d-flex {
      display: -ms-flexbox!important;
      display: flex!important;
  }
  #background-content {
      background-color: #ffffff;
      width: 1020px;
      height: 521px;
      box-shadow: 0px 7px 2rem rgb(0 0 0 / 20%);
  }
  .justify-content-center {
      -ms-flex-pack: center!important;
      justify-content: center!important;
  }
  .row {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
  }
  #leftCard {
      background-color: #2787eb;
      width: 450px;
  }
  .col-5 {
      -ms-flex: 0 0 41.666667%;
      flex: 0 0 41.666667%;
      max-width: 41.666667%;
  }
  img {
      vertical-align: middle;
      border-style: none;
  }
  div {
      display: block;
  }
  form {
      display: block;
      margin-top: 0em;
  }
  button, input {
      overflow: visible;
  }
  style attribute {
      padding: 0px;
      text-align: center;
  }
  #greetCard {
      font-family: 'Microsoft Yahei';
      font-size: 20px;
      color: #ffffff;
      letter-spacing: 2px;
      white-space: nowrap;
      overflow: hidden;
      animation: typing 2.5s steps(40, end), blink-caret .75s step-end infinite;
  }
  .col-1 {
      -ms-flex: 0 0 8.333333%;
      flex: 0 0 8.333333%;
      max-width: 8.333333%;
  }
  .col-6 {
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      max-width: 50%;
  }
  #cardImg {
      width: 310px;
      height: 54px;
      margin-bottom: 15%;
  }
  .form-group {
      margin-bottom: 22px;
  }
  .input-group {
      width: 308px;
      position: relative;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -ms-flex-align: stretch;
      align-items: stretch;
  }
  .input-group-append {
      margin-left: -1px;
      display: flex;
  }
  .input-group-text {
      width: 44px;
      height: 44px;
      padding: 0px 16px 0px 14px;
      border-top-left-radius: 20px !important;
      border-bottom-left-radius: 20px !important;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 0;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      text-align: center;
      white-space: nowrap;
      background-color: #e9ecef;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
  }
  .input-group>.custom-file, .input-group>.custom-select, .input-group>.form-control {
      position: relative;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      width: 1%;
      margin-bottom: 0;
  }
  .form-control /deep/ .el-input__inner{
      /* width: 44px; */
      height: 44px;
      border-top-right-radius: 20px !important;
      border-bottom-right-radius: 20px !important;
      //border-radius: 0px !important;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      background-clip: padding-box;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      display: block;
  }
  .el-input-inner /deep/ .el-input__inner {
    background-color: rgb(238, 242, 245);
    border: 0;
    margin-left: -0.25rem;
  }
  #submitBtn {
      width: 308px;
      height: 44px;
      border-top-right-radius: 20px !important;
      border-bottom-right-radius: 20px !important;
      border-top-left-radius: 20px !important;
      border-bottom-left-radius: 20px !important;
      background-color: #5297f5;
      border: none;
  }
  .btn:not(:disabled):not(.disabled) {
      cursor: pointer;
  }
  .btn {
      height: 30px;
      border-radius: 0px !important;
  }
  .btn-primary {
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
  }
  .btn {
      display: inline-block;
      font-weight: 400;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  [type=reset], [type=submit], button, html [type=button] {
      -webkit-appearance: button;
  }
  button, select {
      text-transform: none;
  }
  button, input {
      overflow: visible;
  }
  button, input, optgroup, select, textarea {
      margin: 0;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
  }
  #submitText {
      font-size: 16px;
      margin: 0px;
      color: #ffffff;
      font-family: MicrosoftYaHei;
  }
  p {
      margin-top: 0;
      margin-bottom: 1rem;
  }
  p {
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
  }
  #loginImg {
      width: 117px;
      height: 101px;
      margin-top: 69px;
  }
  .col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto {
      position: relative;
      width: 100%;
      min-height: 1px;
      /* padding-right: 15px;
      padding-left: 15px; */
  }

</style>
