<template>
  <div class="personal-panel">
    <div class="personal-desc" :style="{'background':this.$store.state.app.themeColor}">
        <div class="avatar-container">
          <img class="avatar" :src="require('@/assets/user.png')" />
        </div>
        <div class="registe-info">
          <span class="registe-info">
            <!-- <li class="fa fa-clock-o"></li> -->
            {{ user.deptnm }}
          </span>
        </div>
        <div class="name-role">
          <span class="sender">{{ user.loginid }} - {{ user.name }}</span>
        </div>
    </div>
    <!-- <div class="personal-relation">
        <span class="relation-item">followers</span>
        <span class="relation-item">watches</span>
        <span class="relation-item">friends</span>
    </div> -->
    <div class="main-operation">
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-male" @click="showWoDeScDialog"> 我的收藏</el-button>
          <WoDeSc ref="woDeScDialog"></WoDeSc>
        </span>
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-key" @click="showCgpwdDialog"> 修改密码</el-button>
          <!--修改密码界面-->
              <CgPwd ref="cgpwdDialog" @afterRestore="afterCgpwd"></CgPwd>
        </span>
    </div>
    <!-- <div class="other-operation">
        <div class="other-operation-item">
          <li class="fa fa-eraser"></li>
          清除缓存
        </div>
        <div class="other-operation-item">
          <li class="fa fa-user"></li>
          在线人数
        </div>
        <div class="other-operation-item">
          <li class="fa fa-bell"></li>
          访问次数
        </div>
    </div> -->
    <div class="personal-footer" @click="logout">
      <li class="fa fa-sign-out"></li>
      {{$t("common.logout")}}
    </div>
    <!--备份还原界面-->
    <!-- <backup ref="backupDialog" @afterRestore="afterRestore"></backup> -->
  </div>
</template>

<script>
import Cookies from "js-cookie"
import CgPwd from "@/views/Sys/CgPwd"
import WoDeSc from "@/views/Sys/WoDeSc"
/* import Backup from "@/views/Backup/Backup" */
export default {
  name: 'PersonalPanel',
  components:{
    CgPwd,
    WoDeSc
    /* Backup */
  },
  props: {
    user: {
      type: Object,
      default: {
        loginid:"未设置",
        name: "未设置",
        avatar: "@/assets/user.png",
        deptnm: "未设置"
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 退出登录
    logout: function() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
      .then(() => {
        this.$api.util.logout({captcha:'VUE'}).then((res) => {
            this.deleteCookie('token')
            sessionStorage.removeItem("session")
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("menuTree")
            this.$router.push("/login")
          }).catch(function(res) {
        })
      })
      .catch(() => {})
    },
    // 删除cookie
    deleteCookie: function(name) {
        Cookies.remove(name)
    },
    // 打开备份还原界面
    showBackupDialog: function() {
      this.$refs.backupDialog.setBackupVisible(true)
    },
    // 成功还原之后，重新登录
    afterRestore: function() {
        this.$api.util.logout({captcha:'VUE'}).then((res) => {
          this.$refs.backupDialog.setBackupVisible(false)
          this.deleteCookie('token')
          sessionStorage.removeItem("session")
          sessionStorage.removeItem("user")
          sessionStorage.removeItem("menuTree")
          this.$router.push("/login")
          }).catch(function(res) {
        })
    },
    //显示密码修改弹窗界面
    showCgpwdDialog: function() {
      this.$refs.cgpwdDialog.setCgpwdVisible(true)
    },
    showWoDeScDialog:function(){
      this.$refs.woDeScDialog.setPageVisible(true)
    },
    afterCgpwd: function() {

    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.personal-panel {
  font-size: 14px;
  width: 280px;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
}
.personal-desc {
  padding: 15px;
  color: #fff;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 90px;
}
.name-role {
  font-size: 16px;
  padding: 5px;
}
.personal-relation {
  font-size: 16px;
  padding: 12px;
  margin-right: 1px;
  background: rgba(200, 209, 204, 0.3);
}
.relation-item {
  padding: 12px;
}
.relation-item:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
}
.main-operation {
  padding: 8px;
  margin-right: 1px;
  /* background: rgba(175, 182, 179, 0.3); */
  border-color: rgba(201, 206, 206, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.main-operation-item {
  margin: 15px;
}
.other-operation {
  padding: 15px;
  margin-right: 1px;
  text-align: left;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.other-operation-item {
  padding: 12px;
}
.other-operation-item:hover {
  cursor: pointer;
  background: #9e94941e;
  color: rgb(19, 138, 156);
}
.personal-footer {
  margin-right: 1px;
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.personal-footer:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
  background: #b1a6a61e;
}
</style>
