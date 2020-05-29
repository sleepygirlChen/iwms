<template>
  <div class="login">
    <div class="login-box">
      <p class="title">登录</p>
      <div class="form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" placeholder="输入用户名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="mb0">
            <el-input type="password" v-model="ruleForm.password" placeholder="输入密码" autocomplete="off" show-password>
            </el-input>
          </el-form-item>
          <el-form-item label prop="isRemember" class="remember">
            <el-checkbox v-model="ruleForm.isRemember">记住我?</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="width: 250px;" :loading="loading">登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="else">
          <span>
            没有账号?&nbsp;
            <router-link to="/register">注册</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import * as fn from '../utils/tool.js'
  import { ruleForm, rules } from '../utils/validForm'
  import { Message } from 'element-ui'
  import { mapState } from 'vuex'
  export default {
    name: "login",
    data() {
      return {
        ruleForm,
        rules,
        loading: false
      };
    },

    computed: {
      ...mapState(['userInfo'])
    },

    methods: {

      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {

            let { password, username, isRemember } = this.ruleForm;

            this.loading = true;

            Message('登陆中……')
            this.axios.post("/login", { password, username, isRemember })
              .then(res => {
                // consolelog('login res ==> ', res);

                if (res.data.statusCode === 200) {
                  this.loading = false;
                  Message({
                    type: 'success',
                    message: '登录成功，跳转至首页……'
                  })
                  this.$store.commit('changeState', { userInfo: res.data.body, isLogin: 1 });
                  localStorage.setItem('isLogin', 1)
                  localStorage.setItem('userInfo', fn.encodeInfo(res.data.body))
                  // consolelog(this.userInfo, '-------------------logined userinfo')
                  let timer = setTimeout(() => {
                    this.$router.push({ name: "environment" });
                    Message.closeAll();
                    clearTimeout(timer);
                  }, 1000)

                  return;
                }

                if (res.data.statusCode === 1021) {
                  Message({
                    type: 'warning',
                    message: res.data.msg
                  })
                  this.loading = false;
                }

                if (res.data.statusCode === 1022) {
                  Message({
                    type: 'warning',
                    message: res.data.msg
                  })
                  this.loading = false;
                }

              }).catch((err) => {
                Message({
                  type: 'warning',
                  message: '网络错误, 连接失败……'
                })
                this.loading = false;
                // // consolelog(err);
              });

          } else {
            // // consolelog("error submit!!");
            return false;
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .login {
    width: calc(~"100% - 40px");
    height: calc(~"100% - 40px");
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../assets/bg.jpg');

    .login-box {
      width: 380px;
    }

    .title {
      font-size: 24px;
      text-align: center;
      color: #fff;
      margin: 0;
      padding: 10px 0;
    }

    .form {
      width: calc(100% - 20px);
      height: calc(100% - 72px);
      padding: 20px 10px;
    }

    .else {
      font-size: 10px;
      text-align: right;
      color: #fff;

      a {
        color: #fff;
      }
    }

    .mb0 {
      margin-bottom: 0;
    }

    .remember {
      text-align: right;
    }
  }
</style>