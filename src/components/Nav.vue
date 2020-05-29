<template>
  <div class="nav">
    <el-popover placement="left-start" trigger="hover" content="Intelligent Warehouse Management System">
      <span class="title" slot="reference" @click="indexPage">智能仓储管理系统</span>
    </el-popover>
    <div class="user-box" v-if="isLogin">
      <el-dropdown @command="handleCommand">
        <div class="img-box" @click="personalSetting">
          <div class="img">
            <img class="auto-img" :src="userInfo.avatar || imgUrl" alt />
          </div>
          <span style="color: #fff;" class="username">{{userInfo.username || '系统默认'}}</span>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='changePwd'>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="exit" @click="loginout">退出</span>
    </div>
    <div class="user-box" v-else>
      <el-button plain type="primary" class="sign-in">
        <router-link to="/login" tag="span">登录</router-link>
      </el-button>

      <el-button plain type="primary" class="sign-up">
        <router-link to="/register" tag="span">注册</router-link>
      </el-button>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="原密码" prop="opassword">
          <el-input type="password" v-model="form.opassword" placeholder="请输入旧密码" autocomplete="off" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="npassword">
          <el-input type="password" v-model="form.npassword" placeholder="请输入新密码" autocomplete="off" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changepassword" :disabled="!(form.npassword && form.opassword)">确 定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { mapState } from "vuex";
  import * as fn from '../utils/tool.js'
  import { Message } from 'element-ui'

  export default {
    name: "nav",
    data() {
      var validatePass = (rule, value, callback) => {

        if (value === "") {
          callback(new Error("不能为空，请输入密码"));
        } else if (!rule.rule.test(value)) {
          callback(new Error("密码组成：英文字母开头+数字,6~8位"));
        } else {
          callback();
        }
      };

      return {
        dialogFormVisible: false,
        form: {
          username: '',
          npassword: '',
          opassword: ''
        },
        rules: {
          username: [{
            required: true,
            message: '用户名不能为空'
          }],
          opassword: [{
            required: true,
            trigger: 'blur',
            validator: validatePass,
            rule: /^[a-zA-Z][a-zA-Z\d]{4,15}$/
          }],
          npassword: [{
            required: true,
            validator: validatePass,
            trigger: "blur",
            rule: /^[a-zA-Z][a-zA-Z\d]{4,15}$/
          }],
        },
        imgUrl: require('../assets/c1cdd76ef1fe42b38c2873b7925e09c4.gif')
      }
    },

    computed: {
      ...mapState(['isLogin', 'userInfo']),
    },


    methods: {
      indexPage() {
        this.$router.push({ name: 'index' })
      },

      loginout() {
        this.$store.commit("changeState", { isLogin: 0, userInfo: {} });
        localStorage.setItem('isLogin', 0)
        localStorage.setItem('userInfo', fn.encodeInfo({}))
        this.$router.push({ name: "login" });
      },

      personalSetting() {
        this.$router.push({ path: `/personal` });
      },

      handleCommand(command) {
        if (command === 'changePwd') {
          this.dialogFormVisible = true
          this.form.username = this.userInfo.username
        }
      },

      changepassword() {

        // // consolelog(this.form)
        // this.dialogFormVisible = false
        this.axios.post('/modify/password', this.form)
          .then(res => {
            // // consolelog(res, '---------------------changepassword--res')
            if (res.data.statusCode === 200) {
              Message({
                type: 'success',
                message: '密码修改成功'
              })
              this.dialogFormVisible = false
            }

            if (res.data.statusCode === 500) {
              Message({
                type: 'warning',
                message: res.data.msg
              })
            }

          })

      }

    }
  };
</script>

<style lang="less" scoped>
  .nav {
    height: 80px;
    padding: 0 25px;
    display: flex;
    align-items: center;
    background-color: #545c64;
    color: #fff;

    .title {
      font-weight: bold;
      font-size: 26px;
      cursor: pointer;
    }

    .user-box {
      display: flex;
      align-items: center;
      margin-left: auto;

      .img-box {
        display: flex;
        align-items: center;
        margin-right: 30px;
        cursor: pointer;

        .img {
          width: 50px;
          border-radius: 50%;
          box-shadow: 0 0 5px 1px #ddd;
          overflow: hidden;
          margin-right: 15px;
        }
      }

      .exit {
        cursor: pointer;
        color: rgb(190, 184, 185);
      }
    }
  }
</style>